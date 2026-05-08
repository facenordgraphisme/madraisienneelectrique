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

async function check() {
  const posts = await client.fetch(`*[_type == "post"][0...1]`)
  if (posts.length === 0) {
    console.log('No posts found');
    return;
  }
  console.log('Post structure:', JSON.stringify(posts[0], null, 2));
}

check()
