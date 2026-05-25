/**
 * stagger-dates.mjs
 * Distributes the 32 bulk-published posts (2026-05-06) over ~90 days (2026-02-03 → 2026-05-05).
 * Ordering rule: longer content = older date (pillar/cornerstone content published first).
 */

import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'svwgtz77',
  dataset: 'production',
  apiVersion: '2025-05-06',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Natural publishing cadence (gaps in days between consecutive posts)
const GAPS = [2, 3, 2, 4, 2, 3, 3, 2, 4, 2, 3, 2, 3, 4, 2, 2, 3, 2, 4, 3, 2, 3, 2, 4, 2, 3, 2, 3, 2, 4, 2]

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString()
}

async function run() {
  const posts = await client.fetch(
    `*[_type == "post" && publishedAt >= "2026-05-06" && publishedAt < "2026-05-07"]
      | order(length(content) desc)
      {_id, "slug": slug.current, "contentLen": length(content)}`
  )

  console.log(`Found ${posts.length} posts to stagger\n`)

  let currentDate = '2026-02-03T10:00:00.000Z'
  let ok = 0
  let fail = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const gap = GAPS[i] ?? 3
    try {
      await client.patch(post._id).set({ publishedAt: currentDate }).commit()
      console.log(`  ✓ [${i + 1}/32] ${currentDate.split('T')[0]}  ${post.slug.substring(0, 55)}`)
      ok++
    } catch (e) {
      console.error(`  ✗ ${post.slug}: ${e.message}`)
      fail++
    }
    currentDate = addDays(currentDate, gap)
  }

  console.log(`\n── ${ok} dates mises à jour, ${fail} échecs`)
}

run().catch(e => { console.error(e); process.exit(1) })
