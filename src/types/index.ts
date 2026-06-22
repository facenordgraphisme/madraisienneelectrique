import { SanityImageAssetDocument } from '@sanity/client'

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
}

export interface SanityAuthor {
  name: string
  bio?: string
  image?: string
  role?: string
  socialLink?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  content?: string
  body?: any[]
  seoTitle?: string
  metaDescription?: string
  keyTakeaways?: string[]
  faq?: { question: string; answer: string }[]
  featuredImage?: {
    asset?: SanityImageAssetDocument
    alt?: string
    hotspot?: { x: number; y: number }
  }
  featuredImageUrl?: string
  featuredImageAlt?: string
  category?: SanityCategory
  author?: SanityAuthor
}
