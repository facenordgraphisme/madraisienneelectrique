import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategories } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://ma-draisienne-electrique.fr'

  const [slugs, categories] = await Promise.all([
    getAllPostSlugs(),
    getAllCategories(),
  ])

  const postUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/categorie/${cat.slug}`,
    lastModified: new Date(),
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
    ...postUrls,
    ...categoryUrls,
  ]
}
