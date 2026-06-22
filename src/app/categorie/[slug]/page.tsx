import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllCategories, getPostsByCategory } from '@/sanity/queries'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}

  return {
    title: `${category.title} — Draisiennes Électriques`,
    description: category.description || `Retrouvez tous nos articles dans la catégorie ${category.title}.`,
    alternates: { canonical: `https://www.ma-draisienne-electrique.fr/categorie/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getPostsByCategory(slug),
  ])

  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to bottom, var(--color-surface) 0%, transparent 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-16) 0 var(--space-12)',
        marginBottom: 'var(--space-12)',
      }}>
        <div className="container">
          <span className="badge badge--accent" style={{ marginBottom: 'var(--space-4)', display: 'inline-block' }}>
            Catégorie
          </span>
          <h1 style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
            {category.title}
          </h1>
          {category.description && (
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
              {category.description}
            </p>
          )}
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)', marginTop: 'var(--space-4)' }}>
            {posts.length} article{posts.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="container" style={{ paddingBottom: 'var(--space-20)' }}>
        {posts.length > 0 ? (
          <div className="grid-3">
            {posts.map((post, i) => (
              <ArticleCard key={post._id} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--space-16) 0' }}>
            Aucun article dans cette catégorie pour l'instant.
          </p>
        )}
      </div>
    </div>
  )
}
