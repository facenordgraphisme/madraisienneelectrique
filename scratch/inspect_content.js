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
  const posts = await client.fetch(`*[_type == "post" && defined(content)][0...50]`)
  
  for (const post of posts) {
    const imgMatches = post.content.match(/<img[\s\S]*?>/gi);
    if (imgMatches && imgMatches.length > 0) {
      console.log('--- FOUND POST WITH IMAGES:', post.slug.current, '---');
      console.log('Images found:', imgMatches.length);
      imgMatches.forEach(m => {
          console.log('Image tag:', m);
      });
      console.log('--- CONTENT SAMPLE ---');
      console.log(post.content.substring(0, 500));
      return;
    }
  }
  console.log('No images found in any of the first 50 posts.');
}

inspect()
