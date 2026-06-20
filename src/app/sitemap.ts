import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategories } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://www.ma-draisienne-electrique.fr'

  const [posts, categories] = await Promise.all([
    getAllPostSlugs(),
    getAllCategories(),
  ])

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date('2025-05-01'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categorie/${cat.slug}`,
    lastModified: new Date('2025-05-01'),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
    ...categoryUrls,
  ]
}
