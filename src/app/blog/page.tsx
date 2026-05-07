import { getAllPosts, getAllCategories } from '@/sanity/queries'
import Hero from '@/components/Hero'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Ma Draisienne Électrique',
  description: 'Découvrez tous nos articles, guides d\'achat et tests sur les draisiennes électriques pour adultes et enfants.',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  return (
    <main>
      {/* Small Hero for Blog */}
      <section className="bg-dark" style={{ padding: 'var(--space-24) 0 var(--space-16)', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge--accent" style={{ marginBottom: 'var(--space-4)' }}>Notre Magazine</span>
          <h1 className="text-white" style={{ fontSize: 'var(--font-size-5xl)', textTransform: 'uppercase' }}>
            Tous nos <span style={{ color: 'var(--color-accent)' }}>articles</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: 'var(--space-4) auto 0', fontSize: 'var(--font-size-lg)' }}>
            Découvrez nos 32 guides d'experts pour tout comprendre sur l'univers de la draisienne électrique.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="container" style={{ padding: 'var(--space-4) var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/blog" className="badge badge--accent">Tout</Link>
            {categories.map((cat) => (
              <Link key={cat._id} href={`/categorie/${cat.slug}`} className="btn btn--ghost" style={{ padding: '0.4rem 1rem', fontSize: '10px' }}>
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
