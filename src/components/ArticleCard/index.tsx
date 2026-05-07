import Link from 'next/link'
import Image from 'next/image'
import { SanityPost } from '@/types'
import { urlFor } from '@/sanity/image'
import styles from './ArticleCard.module.css'

interface ArticleCardProps {
  post: SanityPost
  priority?: boolean
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getImageProps(post: SanityPost) {
  if (post.featuredImage?.asset) {
    return {
      src: urlFor(post.featuredImage).width(640).height(360).fit('crop').auto('format').url(),
      alt: post.featuredImage.alt || post.title,
    }
  }
  if (post.featuredImageUrl) {
    return {
      src: post.featuredImageUrl,
      alt: post.featuredImageAlt || post.title,
    }
  }
  return {
    src: `https://placehold.co/640x360/0F0F1A/00E5A0?text=${encodeURIComponent(post.title.slice(0, 30))}`,
    alt: post.title,
  }
}

export default function ArticleCard({ post, priority = false }: ArticleCardProps) {
  const img = getImageProps(post)
  const description = post.excerpt || post.seoDescription || ''

  return (
    <article className={styles.card}>
      <Link href={`/${post.slug}`} className={styles.imageWrap}>
        <Image
          src={img.src}
          alt={img.alt}
          width={640}
          height={360}
          className={styles.image}
          priority={priority}
          unoptimized={img.src.startsWith('http') && !img.src.includes('cdn.sanity.io')}
        />
        {post.category && (
          <span className={`badge badge--accent ${styles.categoryBadge}`}>
            {post.category.title}
          </span>
        )}
      </Link>

      <div className={styles.body}>
        {post.publishedAt && (
          <time className={styles.date} dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        )}

        <h2 className={styles.title}>
          <Link href={`/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h2>

        {description && (
          <p className={styles.excerpt}>
            {description.length > 130 ? description.slice(0, 130) + '…' : description}
          </p>
        )}

        <Link href={`/${post.slug}`} className={styles.readMore}>
          Lire l'article
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  )
}
