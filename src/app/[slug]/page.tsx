import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import ArticleCard from '@/components/ArticleCard'
import sanitizeHtml from 'sanitize-html'
import { PortableText } from '@portabletext/react'
import styles from './ArticlePage.module.css'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className={styles.portableImage}>
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Image article'}
          loading="lazy"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </div>
    ),
    button: ({ value }: any) => (
      <a
        href={value.url}
        className={`${styles.portableButton} ${value.style === 'secondary' ? styles.btnSecondary : styles.btnPrimary} content-btn`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {value.text}
        <span className={styles.btnArrow}>→</span>
      </a>
    ),
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const siteUrl = 'https://www.ma-draisienne-electrique.fr'
  const canonicalUrl = `${siteUrl}/${slug}`

  const BRAND_SUFFIX = ' | Ma Draisienne Électrique'
  const baseTitle = post.seoTitle || post.title
  const candidate = `${baseTitle}${BRAND_SUFFIX}`
  const finalTitle = candidate.length <= 62 ? candidate : baseTitle

  // Audit Priority: Fallback for missing meta description
  const metaDesc = post.metaDescription || post.excerpt || ''
  const cleanMetaDesc = metaDesc.length > 160 ? metaDesc.slice(0, 157) + '...' : metaDesc

  let imageUrl: string | undefined
  if (post.featuredImage?.asset) {
    imageUrl = urlFor(post.featuredImage).width(1200).height(630).fit('crop').url()
  } else if (post.featuredImageUrl) {
    imageUrl = post.featuredImageUrl
  }

  return {
    title: { absolute: finalTitle },
    description: cleanMetaDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: finalTitle,
      description: cleanMetaDesc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: cleanMetaDesc,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

function transformAffiliateLinks(html: string): string {
  // Detect links that should be buttons based on text or destination
  const buttonKeywords = [
    'voir le prix', 'acheter', 'commander', 'découvrir', 'profiter de l\'offre',
    'en savoir plus', 'voir sur amazon', 'voir le produit', 'découvrez l\'offre'
  ];

  // This regex finds <a> tags and checks their content/href
  // Improved to handle multi-line content and different quote types
  return html.replace(/<a\s+([^>]*href=["']([^"']+)["'][^>]*)>([\s\S]*?)<\/a>/gi, (match, attribs, href, text) => {
    const lowerText = text.toLowerCase().trim();
    const isAmazon = href.includes('amazon') || href.includes('amzn.to');
    const hasKeyword = buttonKeywords.some(kw => lowerText.includes(kw));

    // If it's a button-like link, ensure it has the content-btn class
    if ((isAmazon || hasKeyword) && !attribs.includes('content-btn')) {
      // If it already has a class, append to it, otherwise add class="content-btn"
      if (attribs.includes('class=')) {
        // Handle both double and single quotes for class attribute
        return `<a ${attribs.replace(/class=(["'])/i, 'class=$1content-btn ')}>${text}</a>`;
      } else {
        return `<a class="content-btn" ${attribs}>${text}</a>`;
      }
    }
    return match;
  });
}

function fixWordPressUrls(html: string): string {
  // Fix image URLs: wp-content stays relative, loaded from public/
  let fixed = html.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/wp-content\/uploads\//gi,
    '/wp-content/uploads/'
  );
  // Fix internal links: convert absolute domain URLs to root-relative paths
  // Strips trailing slash so Next.js canonical URLs match (no trailing slash)
  fixed = fixed.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/((?!wp-content)[^"'\s>]*?)\/?(?=["'\s>])/gi,
    '/$1'
  );
  return fixed;
}

// --- Audit Improvements: Components ---

function KeyTakeaways({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.takeawaysBox}>
      <div className={styles.takeawaysHeader}>
        <span className={styles.takeawaysIcon}>📌</span>
        <h3>Ce qu&apos;il faut retenir</h3>
      </div>
      <ul className={styles.takeawaysList}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AuthorBox({ author }: { author?: any }) {
  if (!author) return null;
  return (
    <div className={styles.authorCard}>
      {author.image && (
        <div className={styles.authorAvatar}>
          <img src={author.image} alt={author.name} />
        </div>
      )}
      <div className={styles.authorInfo}>
        <span className={styles.authorLabel}>Écrit par</span>
        <h4 className={styles.authorName}>{author.name}</h4>
        {author.role && <p className={styles.authorRole}>{author.role}</p>}
        {author.bio && <p className={styles.authorBio}>{author.bio}</p>}
      </div>
    </div>
  );
}

function FAQSection({ items }: { items?: { question: string, answer: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>Questions fréquentes (FAQ)</h2>
      <div className={styles.faqList}>
        {items.map((item, i) => (
          <div key={i} className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>{item.question}</h3>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Audit Improvements: Linguistic Filter ---

function filterForbiddenWords(html: string): string {
  // Audit Priority 5: Remove AI-generated filler words
  return html
    .replace(/\bindispensable\b/gi, 'essentiel')
    .replace(/\bincontournable\b/gi, 'recommandé')
    .replace(/\brévolutionnaire\b/gi, 'innovant')
    .replace(/\ben conclusion\b/gi, 'En résumé')
    .replace(/n'hésitez pas à/gi, 'pensez à');
}

function cleanWordPressHtml(html: string): string {
  // Apply linguistic filters first
  const filteredHtml = filterForbiddenWords(html);
  const preparedHtml = transformAffiliateLinks(fixWordPressUrls(filteredHtml));

  return sanitizeHtml(preparedHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'hr', 'sup', 'sub', 'abbr',
      'svg', 'line', 'rect', 'text', 'circle', 'path', 'polyline', 'polygon', 'g', 'title',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      'img': ['src', 'alt', 'width', 'height', 'loading', 'class', 'data-src', 'data-lazy-src', 'srcset', 'sizes'],
      'a': ['href', 'target', 'rel', 'id', 'class'],
      'th': ['id', 'colspan', 'rowspan'],
      'td': ['id', 'colspan', 'rowspan'],
      'svg': ['viewbox', 'width', 'height', 'role', 'aria-label', 'style', 'xmlns', 'class', 'preserveaspectratio'],
      'line': ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', 'stroke-dasharray', 'opacity'],
      'rect': ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'opacity'],
      'text': ['x', 'y', 'dx', 'dy', 'text-anchor', 'fill', 'font-size', 'font-weight', 'opacity'],
      'path': ['d', 'fill', 'stroke', 'stroke-width', 'opacity'],
      'circle': ['cx', 'cy', 'r', 'fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'opacity', 'transform'],
      'polyline': ['points', 'fill', 'stroke', 'stroke-width', 'opacity'],
      'polygon': ['points', 'fill', 'stroke', 'stroke-width', 'opacity'],
      'g': ['transform', 'opacity', 'class'],
      '*': ['id', 'class', 'style'],
    },
    allowedStyles: false as any,
    transformTags: {
      // Make external links open in new tab with noopener
      'a': (tagName: string, attribs: Record<string, string>) => {
        const href = attribs.href || ''
        const isExternal = href.startsWith('http') && !href.includes('ma-draisienne-electrique.fr')

        // Detect button-like links (fallback to class only since sanitize-html doesn't provide text here)
        const isButton = (attribs.class && (
          attribs.class.includes('button') ||
          attribs.class.includes('btn') ||
          attribs.class.includes('wp-block-button')
        ))

        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
            class: `${attribs.class || ''} ${isButton ? 'content-btn' : ''}`.trim(),
          },
        }
      },
      // Fix WP images - handle lazy loading, strip srcset, keep classes
      'img': (tagName: string, attribs: Record<string, string>) => {
        // WordPress lazy-loading often puts the real URL in data-src or data-lazy-src
        let src = attribs.src || '';
        const dataSrc = attribs['data-src'] || attribs['data-lazy-src'] || attribs['data-actual-src'];

        // If src is a data URI (placeholder) and we have a data-src, use the real one
        if ((src.startsWith('data:image') || src.includes('placeholder')) && dataSrc) {
          src = dataSrc;
        }

        // Clean double quotes from migration artifacts
        const cleanSrc = src.replace(/^"|"$/g, '').replace(/&quot;/g, '');
        const cleanAlt = (attribs.alt || '').replace(/^"|"$/g, '').replace(/&quot;/g, '');

        return {
          tagName,
          attribs: {
            ...attribs,
            src: cleanSrc,
            alt: cleanAlt,
            loading: 'lazy',
            // Preserve original classes and add a fluid class
            class: `${attribs.class || ''} article-img`.trim(),
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

  // JSON-LD structured data (Audit Priority 2)
  const jsonLd: any = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: imageUrl,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Anne-Sophie',
        url: post.author?.socialLink || 'https://www.ma-draisienne-electrique.fr',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ma Draisienne Électrique',
        url: 'https://www.ma-draisienne-electrique.fr',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.ma-draisienne-electrique.fr/${slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://www.ma-draisienne-electrique.fr' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://www.ma-draisienne-electrique.fr/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': post.category?.title, 'item': `https://www.ma-draisienne-electrique.fr/categorie/${post.category?.slug}` },
        { '@type': 'ListItem', 'position': 4, 'name': post.title, 'item': `https://www.ma-draisienne-electrique.fr/${slug}` }
      ]
    }
  ]

  if (post.faq && post.faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': post.faq.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    })
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
            {/* Audit Improvement: Key Takeaways (TL;DR) */}
            <KeyTakeaways items={post.keyTakeaways} />

            {cleanContent ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>Contenu en cours de chargement…</p>
            )}

            {/* Audit Improvement: FAQ Section */}
            <FAQSection items={post.faq} />

            {/* Audit Improvement: Author Box (E-E-A-T) */}
            <AuthorBox author={post.author} />
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
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
                  Lien affilié — commission sans surcoût pour vous
                </p>
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
