import { SanityImageAssetDocument } from '@sanity/client'

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  content?: string
  seoTitle?: string
  seoDescription?: string
  featuredImage?: {
    asset?: SanityImageAssetDocument
    alt?: string
    hotspot?: { x: number; y: number }
  }
  featuredImageUrl?: string
  featuredImageAlt?: string
  category?: SanityCategory
}
