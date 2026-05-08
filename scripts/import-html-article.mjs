#!/usr/bin/env node
/**
 * Script d'importation d'article HTML -> Sanity
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// ——— Config ———
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'svwgtz77'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-06'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('❌ SANITY_API_TOKEN manquant dans .env.local')
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

async function uploadImage(imageUrl, altText = '') {
  try {
    console.log(`  📸 Upload image: ${imageUrl.substring(0, 60)}...`)
    const buffer = await downloadImage(imageUrl)
    const ext = imageUrl.split('?')[0].split('.').pop().toLowerCase()
    const contentType = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] || 'image/jpeg'
    const filename = imageUrl.split('/').pop().split('?')[0]

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

// ——— Extraction ———

const HTML_FILE = path.join(__dirname, '..', 'src', 'articleblog', 'loi-draisienne-electrique-2026.html')

async function importArticle() {
  if (!existsSync(HTML_FILE)) {
    console.error(`❌ Fichier HTML introuvable: ${HTML_FILE}`)
    process.exit(1)
  }

  const html = readFileSync(HTML_FILE, 'utf-8')

  console.log('🚀 Extraction des données...')

  // Titre
  const titleMatch = html.match(/<title>([^<]+)<\/title>/)
  const title = titleMatch ? titleMatch[1].trim() : 'Sans titre'

  // SEO Description
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/)
  const seoDescription = descMatch ? descMatch[1].trim() : ''

  // Slug
  const canonicalMatch = html.match(/<link rel="canonical" href="https?:\/\/[^\/]+\/([^"]+)"/)
  const slug = canonicalMatch ? canonicalMatch[1].trim() : 'loi-draisienne-electrique-2026'

  // Image à la une
  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
  const featuredImageUrl = ogImageMatch ? ogImageMatch[1].trim() : ''

  // Contenu (Main wrapper)
  const mainMatch = html.match(/<main class="wrapper">([\s\S]+)<\/main>/)
  let content = mainMatch ? mainMatch[1].trim() : ''

  // Nettoyage du contenu pour Sanity (on enlève le hero, le titre et les méta qui sont gérés par le layout)
  content = content.replace(/<img[^>]+class="hero-img"[^>]*\/>/s, '')
  content = content.replace(/<div class="article-meta">[\s\S]*?<\/div>/s, '')
  content = content.replace(/<h1>[\s\S]*?<\/h1>/s, '')
  content = content.trim()

  console.log(`📝 Titre: ${title}`)
  console.log(`🔗 Slug: ${slug}`)

  try {
    // Image
    let featuredImage = null
    if (featuredImageUrl) {
      featuredImage = await uploadImage(featuredImageUrl, title)
    }

    // Category (Législation)
    const categoryId = 'category-legislation'

    const doc = {
      _id: `post-${slug}`,
      _type: 'post',
      title,
      slug: { _type: 'slug', current: slug },
      content,
      seoTitle: title,
      seoDescription,
      publishedAt: new Date().toISOString(),
      category: { _type: 'reference', _ref: categoryId },
      featuredImage,
      excerpt: seoDescription,
    }

    await client.createOrReplace(doc)
    console.log(`\n✅ Article importé avec succès: /${slug}`)
  } catch (err) {
    console.error(`\n❌ Erreur lors de l'import: ${err.message}`)
  }
}

importArticle()
