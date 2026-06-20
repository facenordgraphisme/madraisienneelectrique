import { client } from './client'
import { SanityPost, SanityCategory } from '@/types'

// ——— Posts ———

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      seoTitle,
      seoDescription,
      featuredImage,
      featuredImageUrl,
      featuredImageAlt,
      "category": category->{_id, title, "slug": slug.current}
    }`,
    {},
    { cache: 'no-store' }
  )
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const results = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      content,
      body,
      seoTitle,
      metaDescription,
      keyTakeaways,
      faq,
      featuredImage,
      featuredImageUrl,
      featuredImageAlt,
      "author": author->{ name, bio, "image": image.asset->url, role, socialLink },
      "category": category->{_id, title, "slug": slug.current}
    }`,
    { slug },
    { cache: 'no-store' }
  )
  return results || null
}

export async function getLatestPosts(limit: number = 6): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      seoDescription,
      featuredImage,
      featuredImageUrl,
      featuredImageAlt,
      "category": category->{_id, title, "slug": slug.current}
    }`,
    { limit },
    { cache: 'no-store' }
  )
}

export async function getRelatedPosts(categoryId: string, excludeSlug: string, limit: number = 3): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post" && category._ref == $categoryId && slug.current != $excludeSlug] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      featuredImage,
      featuredImageUrl,
      featuredImageAlt,
      "category": category->{_id, title, "slug": slug.current}
    }`,
    { categoryId, excludeSlug, limit },
    { cache: 'no-store' }
  )
}

export async function getAllPostSlugs(): Promise<{ slug: string; publishedAt: string }[]> {
  return client.fetch(
    `*[_type == "post"] {"slug": slug.current, publishedAt}`,
    {},
    { cache: 'no-store' }
  )
}

// ——— Categories ———

export async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`,
    {},
    { cache: 'no-store' }
  )
}

export async function getPostsByCategory(categorySlug: string): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      seoDescription,
      featuredImage,
      featuredImageUrl,
      featuredImageAlt,
      "category": category->{_id, title, "slug": slug.current}
    }`,
    { categorySlug },
    { cache: 'no-store' }
  )
}
