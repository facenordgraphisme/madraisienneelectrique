#!/usr/bin/env node
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'svwgtz77'
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-06'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('❌ SANITY_API_TOKEN manquant')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
})

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }
    protocol.get(encodeURI(url), options, (response) => {
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
    console.log(`📸 Upload image: ${imageUrl.substring(0, 60)}...`)
    const buffer = await downloadImage(imageUrl)
    const ext = imageUrl.split('?')[0].split('.').pop().toLowerCase()
    const contentType = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] || 'image/jpeg'
    const filename = imageUrl.split('/').pop().split('?')[0] || 'image.jpg'

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
    console.warn(`⚠️  Échec upload image (${imageUrl}): ${err.message}`)
    return null
  }
}

const HTML_FILE = path.join(__dirname, '..', 'src', 'articleblog', 'draisienne-electrique-adulte-guide-complet.html')

async function importArticle() {
  if (!existsSync(HTML_FILE)) {
    console.error(`❌ Fichier introuvable: ${HTML_FILE}`)
    process.exit(1)
  }

  const html = readFileSync(HTML_FILE, 'utf-8')
  console.log('🚀 Extraction des données...')

  const titleMatch = html.match(/<title>([^<]+)<\/title>/)
  const title = titleMatch ? titleMatch[1].trim() : 'Draisienne Électrique Adulte : Le Guide Complet 2025'

  const descMatch = html.match(/<meta name="description" content="([^"]+)"/)
  const seoDescription = descMatch ? descMatch[1].trim() : ''

  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
  const featuredImageUrl = ogImageMatch ? ogImageMatch[1].trim() : ''

  const canonicalMatch = html.match(/<link rel="canonical" href="https?:\/\/[^\/]+\/([^"]+)"/)
  const slug = canonicalMatch ? canonicalMatch[1].trim() : 'draisienne-electrique-adulte-guide-complet'

  let content = ''
  const articleMatch = html.match(/<article[^>]*>([\s\S]+)<\/article>/)
  if (articleMatch) {
    content = articleMatch[1]
  } else {
    const bodyMatch = html.match(/<body>([\s\S]+)<\/body>/)
    content = bodyMatch ? bodyMatch[1] : html
  }

  // Nettoyage
  content = content.replace(/<header>[\s\S]*?<\/header>/i, '')
  content = content.replace(/<img[^>]+class="hero"[^>]*\/>/i, '')
  content = content.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/i, '')
  content = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
  content = content.trim()

  const takeaways = []
  const takeawaysMatch = html.match(/<div class="key-takeaways">[\s\S]*?<ul>([\s\S]*?)<\/ul>/i)
  if (takeawaysMatch) {
    const liMatches = takeawaysMatch[1].matchAll(/<li>(.*?)<\/li>/gi)
    for (const match of liMatches) {
      takeaways.push(match[1].replace(/<[^>]+>/g, '').trim())
    }
  }

  let faq = []
  const faqJsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)
  if (faqJsonMatch) {
    for (const scriptTag of faqJsonMatch) {
      const jsonContent = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '')
      try {
        const data = JSON.parse(jsonContent)
        if (data['@type'] === 'FAQPage' && data.mainEntity) {
          faq = data.mainEntity.map(item => ({
            question: item.name,
            answer: item.acceptedAnswer.text
          }))
          break
        }
      } catch (e) {}
    }
  }

  console.log(`📝 Titre: ${title}`)
  console.log(`🔗 Slug: ${slug}`)
  console.log(`📌 Takeaways: ${takeaways.length}`)
  console.log(`❓ FAQ: ${faq.length}`)

  try {
    let featuredImage = null
    if (featuredImageUrl) {
      featuredImage = await uploadImage(featuredImageUrl, title)
    }

    const categoryId = 'category-guides' 
    const authorId = 'd91a4228-1691-4053-8650-32d0300fadb8' // Fx

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
      author: { _type: 'reference', _ref: authorId },
      featuredImage,
      excerpt: seoDescription,
      keyTakeaways: takeaways,
      faq: faq
    }

    await client.createOrReplace(doc)
    console.log(`\n✅ Article importé: /${slug}`)
  } catch (err) {
    console.error(`\n❌ Erreur: ${err.message}`)
  }
}

importArticle()
