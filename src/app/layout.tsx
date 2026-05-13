import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://ma-draisienne-electrique.fr'),
  title: {
    default: 'Ma Draisienne Électrique — Guides, Comparatifs & Conseils 2025',
    template: '%s | Ma Draisienne Électrique',
  },
  description: 'Guide de référence sur les draisiennes électriques en France : comparatifs, avis, législation et conseils pratiques pour faire le bon choix en 2025.',
  openGraph: {
    siteName: 'Ma Draisienne Électrique',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ma-draisienne-electrique.fr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
