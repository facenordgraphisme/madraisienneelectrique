import type { Metadata } from 'next'
import { getLatestPosts, getAllCategories } from '@/sanity/queries'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Ma Draisienne Électrique — Guides, Comparatifs & Conseils 2025',
  description: 'Guide de référence sur les draisiennes électriques en France : comparatifs, avis, législation et conseils pratiques pour faire le bon choix en 2025.',
  alternates: { canonical: 'https://www.ma-draisienne-electrique.fr' },
}

export default async function HomePage() {
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(9),
    getAllCategories(),
  ])

  return <HomeClient latestPosts={latestPosts} categories={categories} />
}
