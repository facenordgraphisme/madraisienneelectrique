import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable — Ma Draisienne Électrique',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-16) var(--space-6)',
    }}>
      <span style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🛴</span>
      <h1 style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
        404
      </h1>
      <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', maxWidth: '480px' }}>
        Cette page n&apos;existe plus ou a été déplacée. Revenez à l&apos;accueil pour retrouver nos guides.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn btn--primary">Retour à l&apos;accueil</Link>
        <Link href="/blog" className="btn btn--ghost">Voir tous les articles</Link>
      </div>
    </div>
  )
}
