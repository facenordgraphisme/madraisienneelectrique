import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import ArticleCard from '@/components/ArticleCard'
import sanitizeHtml from 'sanitize-html'
import styles from './ArticlePage.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const siteUrl = 'https://ma-draisienne-electrique.fr'
  const canonicalUrl = `${siteUrl}/${slug}`

  let imageUrl: string | undefined
  if (post.featuredImage?.asset) {
    imageUrl = urlFor(post.featuredImage).width(1200).height(630).fit('crop').url()
  } else if (post.featuredImageUrl) {
    imageUrl = post.featuredImageUrl
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
  }
}

function cleanWordPressHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'hr', 'sup', 'sub', 'abbr',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'img': ['src', 'alt', 'width', 'height', 'loading'],
      'a': ['href', 'target', 'rel', 'id', 'class'],
      'th': ['id', 'colspan', 'rowspan'],
      'td': ['id', 'colspan', 'rowspan'],
      '*': ['id', 'class'],
    },
    transformTags: {
      // Make external links open in new tab with noopener
      'a': (tagName: string, attribs: Record<string, string>, text: string) => {
        const href = attribs.href || ''
        const isExternal = href.startsWith('http') && !href.includes('ma-draisienne-electrique.fr')
        
        // Detect button-like links
        const buttonTexts = ['voir le prix', 'acheter', 'découvrir', 'commander', 'profiter', 'en savoir plus']
        const isButton = buttonTexts.some(bt => text?.toLowerCase()?.includes(bt)) || (attribs.class && attribs.class.includes('button'))
        
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
            class: `${attribs.class || ''} ${isButton ? 'content-btn' : ''}`.trim(),
          },
        }
      },
      // Fix WP srcset images — strip srcset/sizes, keep src
      'img': (tagName: string, attribs: Record<string, string>) => {
        // Clean double quotes in attributes (WordPress CSV artifact)
        const cleanSrc = (attribs.src || '').replace(/^"|"$/g, '').replace(/&quot;/g, '')
        return {
          tagName,
          attribs: {
            src: cleanSrc,
            alt: (attribs.alt || '').replace(/^"|"$/g, ''),
            loading: 'lazy',
          },
        }
      },
    },
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const related = post.category?._id
    ? await getRelatedPosts(post.category._id, slug, 3)
    : []

  let imageUrl: string | undefined
  let imageAlt = post.title
  if (post.featuredImage?.asset) {
    imageUrl = urlFor(post.featuredImage).width(1200).height(600).fit('crop').auto('format').url()
    imageAlt = post.featuredImage.alt || post.title
  } else if (post.featuredImageUrl) {
    imageUrl = post.featuredImageUrl
    imageAlt = post.featuredImageAlt || post.title
  }

  const cleanContent = post.content ? cleanWordPressHtml(post.content) : ''

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Ma Draisienne Électrique',
      url: 'https://ma-draisienne-electrique.fr',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ma-draisienne-electrique.fr/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.article}>
        {/* ——— Hero ——— */}
        <div className={styles.hero}>
          {imageUrl && (
            <div className={styles.heroImage}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                className={styles.heroImg}
                unoptimized={!imageUrl.includes('cdn.sanity.io')}
              />
              <div className={styles.heroOverlay} />
            </div>
          )}
          <div className={`container ${styles.heroContent}`}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/">Accueil</Link>
              <span>›</span>
              {post.category && (
                <>
                  <Link href={`/categorie/${post.category.slug}`}>{post.category.title}</Link>
                  <span>›</span>
                </>
              )}
              <span>{post.title}</span>
            </nav>

            {post.category && (
              <span className="badge badge--accent">{post.category.title}</span>
            )}

            <h1 className={styles.title}>{post.title}</h1>

            {post.publishedAt && (
              <time className={styles.date} dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </time>
            )}
          </div>
        </div>

        {/* ——— Body ——— */}
        <div className={`container ${styles.layout}`}>
          <div className={styles.contentCol}>
            {cleanContent ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>Contenu en cours de chargement…</p>
            )}
          </div>

          {/* ——— Sidebar ——— */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              {/* Affiliate CTA */}
              <div className={styles.affiliateBox}>
                <p className={styles.affiliateTitle}>🏆 Coup de cœur 2025</p>
                <p className={styles.affiliateText}>La <strong>DYU A5</strong> : suspensions, autonomie et design élégant à moins de 550€.</p>
                <a
                  href="https://amzn.to/488uf16"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Voir le prix Amazon
                </a>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className={styles.related}>
                  <h3 className={styles.relatedTitle}>À lire aussi</h3>
                  <div className={styles.relatedList}>
                    {related.map((rel) => (
                      <Link key={rel._id} href={`/${rel.slug}`} className={styles.relatedItem}>
                        <span className={styles.relatedItemTitle}>{rel.title}</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'var(--color-accent)' }}>
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>

      {/* ——— Related articles ——— */}
      {related.length > 0 && (
        <section style={{ padding: 'var(--space-16) 0', borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-8)' }}>
              Articles similaires
            </h2>
            <div className="grid-3">
              {related.map((rel) => (
                <ArticleCard key={rel._id} post={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
