import Link from 'next/link'
import styles from './Footer.module.css'

const FOOTER_LINKS = [
  {
    title: 'Magazine',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/categorie/comparatifs', label: 'Comparatifs' },
      { href: '/categorie/conseils-pratiques', label: 'Conseils pratiques' },
      { href: '/categorie/legislation', label: 'Législation' },
    ],
  },
  {
    title: 'Top Articles',
    links: [
      { href: '/meilleures-draisiennes-electriques-pour-adultes-en-2025', label: 'Meilleures draisiennes 2025' },
      { href: '/draisienne-electrique-vs-trottinette-electrique-que-choisir', label: 'Draisienne vs Trottinette' },
      { href: '/legislation-draisienne-electrique-en-france-2025', label: 'Législation 2025' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/sitemap.xml', label: 'Plan du site' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span style={{ color: 'var(--color-accent)' }}>⚡</span>
            <span>MA <strong>DRAISIENNE</strong></span>
          </Link>
          <p className={styles.tagline}>
            Le guide d'expert indépendant sur les draisiennes électriques en France.
            Découvrez nos tests, comparatifs et guides complets pour faire le meilleur choix.
          </p>
          <p className={styles.affiliate}>
            ⚠️ En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.
          </p>
        </div>

        {/* Links */}
        <div className={styles.linksGrid}>
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title} className={styles.linkGroup}>
              <h3 className={styles.linkGroupTitle}>{title}</h3>
              <ul className={styles.linkList}>
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={styles.link}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} MA DRAISIENNE. Développé avec passion pour la mobilité urbaine.</p>
        </div>
      </div>
    </footer>
  )
}
