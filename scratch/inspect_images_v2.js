import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-05-06',
  useCdn: false,
})

async function inspect() {
  const slug = 'meilleures-draisiennes-electriques-pour-adultes-en-2025'
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
  
  if (!post) {
    console.error('Post not found')
    return
  }
  
  const imgMatches = post.content?.match(/<img[\s\S]*?>/gi);
  console.log('Images found:', imgMatches?.length || 0);
  if (imgMatches) {
    imgMatches.forEach(m => {
        console.log('Image tag:', m);
    });
  } else {
    console.log('CONTENT SAMPLE:', post.content?.substring(0, 500));
  }
}

inspect()
