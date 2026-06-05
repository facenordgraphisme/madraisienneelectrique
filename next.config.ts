/** @type {import('next').NextConfig} */

// Redirects permanents 301 — anciens slugs WordPress et URLs cassées détectées par Ahrefs.
const REDIRECTS = [
  // ── Ancien slug loi renommé ─────────────────────────────────────────────
  {
    source: '/legislation-draisienne-electrique-en-france-2025',
    destination: '/loi-draisienne-electrique-2026',
    permanent: true,
  },

  // ── Broken redirects (destination 404) ──────────────────────────────────
  {
    source: '/legislation-francaise-draisienne-electrique-2025',
    destination: '/loi-draisienne-electrique-2026',
    permanent: true,
  },
  {
    source: '/assurance-draisienne-electrique-obligatoire',
    destination: '/comparatif-des-meilleures-assurances-pour-draisienne-electrique-2025',
    permanent: true,
  },

  // ── Pages 404 — liens internes cassés dans les articles ─────────────────
  {
    source: '/legislation-draisienne-electrique-france-2025',
    destination: '/loi-draisienne-electrique-2026',
    permanent: true,
  },
  {
    source: '/guide-achat-draisienne-electrique',
    destination: '/guide-dachat-draisienne-electrique-adulte-2025',
    permanent: true,
  },
  {
    source: '/meilleures-draisienne-electrique-adulte-2025',
    destination: '/meilleures-draisiennes-electriques-pour-adultes-en-2025',
    permanent: true,
  },
  {
    source: '/draisienne-electrique-vs-trottinette',
    destination: '/draisienne-electrique-vs-trottinette-electrique-que-choisir',
    permanent: true,
  },
  {
    source: '/draisienne-electrique-vs-velo-electrique',
    destination: '/draisienne-electrique-ou-velo-electrique-que-choisir',
    permanent: true,
  },
  {
    source: '/autonomie-draisienne-electrique',
    destination: '/8-astuces-pour-ameliorer-autonomie-de-votre-draisienne-electrique',
    permanent: true,
  },
  {
    source: '/ou-circuler-draisienne-electrique',
    destination: '/draisienne-electrique-en-zone-rurale',
    permanent: true,
  },
  {
    source: '/batterie-draisienne-electrique-guide',
    destination: '/batterie-lithium-ou-batterie-plomb-que-choisir-pour-votre-draisienne',
    permanent: true,
  },
  {
    source: '/batterie-draisienne-electrique-remplacer',
    destination: '/batterie-lithium-ou-batterie-plomb-que-choisir-pour-votre-draisienne',
    permanent: true,
  },
  {
    source: '/draisienne-electrique-moins-400-euros',
    destination: '/les-meilleures-draisiennes-electriques-pour-adultes-a-moins-de-500-e',
    permanent: true,
  },
  {
    source: '/entretien-draisienne-electrique-guide',
    destination: '/nettoyer-sa-draisienne-electrique-sans-labimer-mode-demploi',
    permanent: true,
  },
  {
    source: '/guides/meilleures-draisienne-electrique-2025',
    destination: '/meilleures-draisiennes-electriques-pour-adultes-en-2025',
    permanent: true,
  },
  {
    source: '/test-draisienne-electrique-urbanglide-linx-160',
    destination: '/test-complet-urbanglide-linx-160',
    permanent: true,
  },
  {
    source: '/test-draisienne-electrique-urbanglide-ebike-160',
    destination: '/test-complet-urbanglide-linx-160',
    permanent: true,
  },
  {
    source: '/assurance-draisienne-electrique',
    destination: '/comparatif-des-meilleures-assurances-pour-draisienne-electrique-2025',
    permanent: true,
  },
  // Pages orphelines → guide complet adulte (page la plus générale)
  {
    source: '/draisienne-electrique-transport-commun',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/histoire-draisienne-electrique',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/rentabilite-draisienne-electrique-calcul',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/meilleur-casque-draisienne-electrique',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/draisienne-electrique-domicile-travail',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/draisienne-electrique-appartement',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
  {
    source: '/securite-draisienne-electrique-equipement',
    destination: '/draisienne-electrique-adulte-guide-complet',
    permanent: true,
  },
]

const nextConfig = {
  async redirects() {
    return REDIRECTS
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.ma-draisienne-electrique.fr',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

export default nextConfig
