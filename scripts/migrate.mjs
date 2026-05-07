#!/usr/bin/env node
/**
 * Script de migration : Articles-Export-2026-April-30-1046.csv → Sanity
 *
 * Fonctionnalités :
 * - Parse le CSV WordPress
 * - Upload les images vers Sanity CDN
 * - Crée ou met à jour les documents post + category
 * - Idempotent (createOrReplace)
 * - Conserve les slugs WordPress exacts
 *
 * Usage :
 *   SANITY_API_TOKEN=<token> node scripts/migrate.mjs
 *
 * Le token doit avoir les permissions Editor sur le dataset.
 */

import { createClient } from '@sanity/client'
import { parse } from 'csv-parse'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ——— Config ———
const PROJECT_ID = 'svwgtz77'
const DATASET = 'production'
const API_VERSION = '2025-05-06'
const CSV_PATH = path.join(__dirname, '..', 'Articles-Export-2026-April-30-1046.csv')

const TOKEN = process.env.SANITY_API_TOKEN
if (!TOKEN) {
  console.error('❌ SANITY_API_TOKEN manquant. Ajoutez-le dans .env.local ou passez-le en variable.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

// ——— Helpers ———

/** Slugifie un texte */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Télécharge une image distante et la retourne comme Buffer */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return resolve(downloadImage(response.headers.location))
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode} pour ${url}`))
      }
      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

/** Obtient le content-type d'une URL */
function getContentType(url) {
  const ext = url.split('?')[0].split('.').pop().toLowerCase()
  const map = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' }
  return map[ext] || 'image/jpeg'
}

/** Upload une image vers Sanity et retourne l'asset _id */
async function uploadImage(imageUrl, altText = '') {
  try {
    // Nettoie l'URL (CSV contient parfois des quotes doubles)
    const cleanUrl = imageUrl.replace(/^"|"$/g, '').replace(/\\/g, '').split('|')[0].trim()
    if (!cleanUrl || !cleanUrl.startsWith('http')) return null

    console.log(`  📸 Upload image: ${cleanUrl.substring(0, 60)}...`)
    const buffer = await downloadImage(cleanUrl)
    const contentType = getContentType(cleanUrl)
    const filename = cleanUrl.split('/').pop().split('?')[0]

    const asset = await client.assets.upload('image', buffer, {
      contentType,
      filename,
    })

    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: altText,
    }
  } catch (err) {
    console.warn(`  ⚠️  Échec upload image (${imageUrl.substring(0, 50)}): ${err.message}`)
    return null
  }
}

/** Crée ou récupère une catégorie Sanity, retourne son _id */
const categoryCache = {}
async function getOrCreateCategory(title) {
  if (!title) return null
  const normalized = title.trim()
  if (categoryCache[normalized]) return categoryCache[normalized]

  const catSlug = slugify(normalized)
  const docId = `category-${catSlug}`

  await client.createOrReplace({
    _id: docId,
    _type: 'category',
    title: normalized,
    slug: { _type: 'slug', current: catSlug },
  })

  categoryCache[normalized] = docId
  return docId
}

/** Parse le CSV */
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const records = []
    createReadStream(filePath)
      .pipe(parse({
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true,
        trim: true,
      }))
      .on('data', (row) => records.push(row))
      .on('end', () => resolve(records))
      .on('error', reject)
  })
}

/** Extrait le premier champ Image URL (peut contenir plusieurs URLs séparées par |) */
function extractFirstImageUrl(imageUrlField) {
  if (!imageUrlField) return null
  return imageUrlField.split('|')[0].replace(/^"|"$/g, '').trim()
}

// ——— Main ———
async function migrate() {
  if (!existsSync(CSV_PATH)) {
    console.error(`❌ Fichier CSV introuvable: ${CSV_PATH}`)
    process.exit(1)
  }

  console.log('🚀 Début de la migration...\n')
  console.log(`📂 CSV: ${CSV_PATH}`)
  console.log(`🏗️  Projet Sanity: ${PROJECT_ID} / ${DATASET}\n`)

  const rows = await parseCSV(CSV_PATH)
  console.log(`✅ ${rows.length} articles trouvés dans le CSV\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const title = row['Title']?.trim()
    const slug = row['Slug']?.trim()
    const content = row['Content']?.trim()
    const categoryTitle = row['Catégories']?.trim()
    const imageUrl = extractFirstImageUrl(row['Image URL'] || row['Image Featured'])
    const imageAlt = (row['Image Alt Text'] || title || '').replace(/^"|"$/g, '').split('|')[0].trim()
    const seoDesc = row['_seopress_titles_desc']?.trim()
    const wpId = parseInt(row['id'])

    if (!title || !slug) {
      console.warn(`⚠️  Ligne ${i + 2}: slug ou title manquant, ignorée`)
      continue
    }

    console.log(`[${i + 1}/${rows.length}] "${title}"`)

    try {
      // 1. Catégorie
      const categoryId = await getOrCreateCategory(categoryTitle)

      // 2. Image
      let featuredImage = null
      if (imageUrl) {
        featuredImage = await uploadImage(imageUrl, imageAlt)
      }

      // 3. Document post
      const docId = `post-wp-${wpId || slug.substring(0, 40)}`

      const doc = {
        _id: docId,
        _type: 'post',
        title,
        slug: { _type: 'slug', current: slug },
        content,
        seoDescription: seoDesc || undefined,
        publishedAt: new Date().toISOString(),
        wordpressId: wpId || undefined,
        ...(categoryId ? { category: { _type: 'reference', _ref: categoryId } } : {}),
        ...(featuredImage ? { featuredImage } : (imageUrl ? { featuredImageUrl: imageUrl.split('|')[0], featuredImageAlt: imageAlt } : {})),
      }

      await client.createOrReplace(doc)
      console.log(`  ✅ Importé: /${slug}\n`)
      successCount++
    } catch (err) {
      console.error(`  ❌ Erreur pour "${title}": ${err.message}\n`)
      errorCount++
    }
  }

  console.log('\n══════════════════════════════════')
  console.log(`✅ Migration terminée !`)
  console.log(`   • ${successCount} articles importés`)
  console.log(`   • ${errorCount} erreurs`)
  console.log('══════════════════════════════════\n')
}

migrate().catch((err) => {
  console.error('❌ Erreur fatale:', err)
  process.exit(1)
})
