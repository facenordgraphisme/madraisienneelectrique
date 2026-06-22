'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ArticleCard from '@/components/ArticleCard'
import { SanityPost, SanityCategory } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HomeClientProps {
  latestPosts: SanityPost[]
  categories: SanityCategory[]
}

const CATEGORY_ICONS: Record<string, string> = {
  'Comparatifs': '⚖️',
  'Conseils pratiques': '💡',
  'Législation': '⚖️',
  'Guides d\'achat': '🛒',
  'Avis': '⭐',
  'Actualités': '📰',
}

export default function HomeClient({ latestPosts, categories }: HomeClientProps) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const catsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Articles cards reveal
      const cards = cardsRef.current?.children
      if (cards && cards.length > 0) {
        const cardsArray = Array.from(cards)
        gsap.set(cardsArray, { opacity: 0, y: 30 })
        
        gsap.to(cardsArray, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Categories reveal
      if (catsRef.current?.children) {
        gsap.from(Array.from(catsRef.current.children), {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: catsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Force refresh to ensure ScrollTrigger knows the layout
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }, scopeRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={scopeRef}>
      <Hero />

      {/* ——— Latest Articles ——— */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-10)', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                Derniers articles
              </p>
              <h2 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, lineHeight: 1.1 }}>
                Nos guides experts
              </h2>
            </div>
            <Link href="/categorie/comparatifs" className="btn btn--ghost">
              Voir tous les articles →
            </Link>
          </div>

          <div ref={cardsRef} className="grid-3" style={{ minHeight: '400px' }}>
            {latestPosts.map((post, i) => (
              <ArticleCard key={post._id} post={post} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— Categories ——— */}
      {categories.length > 0 && (
        <section style={{ padding: 'var(--space-12) 0', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container">
            <p style={{ textAlign: 'center', fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
              Explorer par thème
            </p>
            <div ref={catsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/categorie/${cat.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-3) var(--space-5)',
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    transition: 'all var(--transition-fast)',
                    textDecoration: 'none',
                  }}
                  className="cat-link"
                >
                  <span>{CATEGORY_ICONS[cat.title] || '📄'}</span>
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ——— CTA Banner ——— */}
      <section style={{ padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-2) 100%)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
            }} />
            <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>
              Notre sélection
            </p>
            <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
              Quelle draisienne choisir en 2025 ?
            </h2>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto var(--space-8)', lineHeight: 1.6 }}>
              Découvrez notre comparatif des meilleures draisiennes électriques adultes du moment.
            </p>
            <Link href="/meilleures-draisiennes-electriques-pour-adultes-en-2025" className="btn btn--primary">
              Voir le comparatif →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
