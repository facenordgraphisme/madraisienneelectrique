import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'svwgtz77',
  dataset: 'production',
  apiVersion: '2025-05-06',
  useCdn: false,
})

async function check() {
  const posts = await client.fetch(`*[_type == "post"] { title, "slug": slug.current }`)
  console.log(`Posts found: ${posts.length}`)
  posts.forEach(p => console.log(` - ${p.slug}: ${p.title}`))

  const cats = await client.fetch(`*[_type == "category"] { title, "slug": slug.current }`)
  console.log(`Categories found: ${cats.length}`)
  cats.forEach(c => console.log(` - ${c.slug}: ${c.title}`))
}

check()
