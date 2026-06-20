# Plan d'Action SEO — Récupération de Trafic
**Site :** ma-draisienne-electrique.fr  
**Priorité :** Récupérer le trafic perdu après migration WordPress → Next.js

---

## ⚡ URGENT (48h) — 3 actions, impact maximal

### Action 1 — Corriger www vs non-www [BLOQUANT]

**Option A — Via Vercel (recommandé, 5 min) :**
1. Aller sur [vercel.com](https://vercel.com) > votre projet
2. Settings > Domains
3. Ajouter `ma-draisienne-electrique.fr` comme domaine
4. Cocher "Redirect to www" (301 permanent)

**Option B — Via next.config.ts :**
```typescript
// Ajouter EN PREMIER dans le tableau REDIRECTS de next.config.ts :
{
  source: '/:path*',
  has: [{ type: 'host', value: 'ma-draisienne-electrique.fr' }],
  destination: 'https://www.ma-draisienne-electrique.fr/:path*',
  permanent: true,
},
```
Puis redéployer.

**Vérification :** `curl -I https://ma-draisienne-electrique.fr/` doit retourner `301` vers `https://www.ma-draisienne-electrique.fr/`

---

### Action 2 — Remplir les méta descriptions dans Sanity [CTR IMMÉDIAT]

Le fichier `SEO_META_DASHBOARD.md` contient les 33 méta descriptions optimisées.

Pour chaque article dans Sanity Studio, remplir le champ `metaDescription` avec le texte correspondant du dashboard.

Articles prioritaires (les plus cherchés) :
1. `meilleures-draisiennes-electriques-pour-adultes-en-2025`
2. `legislation-draisienne-electrique-en-france-2025` (ou `loi-draisienne-electrique-2026`)
3. `draisienne-electrique-vs-trottinette-electrique-que-choisir`
4. `comparatif-des-meilleures-assurances-pour-draisienne-electrique-2025`
5. `draisienne-electrique-adulte-guide-complet`

---

### Action 3 — Corriger les liens internes dans le contenu [MAILLAGE]

Dans `src/app/[slug]/page.tsx`, modifier la fonction `fixWordPressUrls` :

```typescript
function fixWordPressUrls(html: string): string {
  // Fix image URLs
  let fixed = html.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/wp-content\/uploads\//gi,
    '/wp-content/uploads/'
  );
  // Fix internal links (all absolute URLs to this domain → relative paths)
  fixed = fixed.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/((?!wp-content)[^"'\s]*?)\/?(?=["'\s])/gi,
    '/$1'
  );
  return fixed;
}
```

---

## 📅 SEMAINE 1 — 4 actions

### Action 4 — Corriger le titre de la page Blog

Dans `src/app/blog/page.tsx`, s'assurer que le metadata est défini :
```typescript
export const metadata: Metadata = {
  title: 'Blog — Guides & Comparatifs de Draisiennes Électriques',
  description: 'Tous nos guides, tests et comparatifs de draisiennes électriques. Mise à jour 2026.',
  alternates: { canonical: 'https://www.ma-draisienne-electrique.fr/blog' },
}
```

### Action 5 — Corriger sitemap.ts avec de vraies dates

```typescript
// Dans src/app/sitemap.ts, remplacer :
const postUrls = slugs.map((slug) => ({
  url: `${siteUrl}/${slug.slug}`,
  lastModified: new Date(slug.updatedAt || slug.publishedAt || Date.now()),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}))
```
(Adapter selon la forme retournée par `getAllPostSlugs()`)

### Action 6 — Soumettre le sitemap à Google Search Console

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Sitemaps > Ajouter `https://www.ma-draisienne-electrique.fr/sitemap.xml`
3. Demander l'indexation des 5 URLs les plus importantes via "Inspection d'URL"

### Action 7 — Résoudre le conflit slug / redirect pour la page législation

Vérifier dans Sanity Studio :
- Est-ce que l'article `legislation-draisienne-electrique-en-france-2025` a été renommé en `loi-draisienne-electrique-2026` ?
- Si oui : mettre à jour le lien dans la page blog pour qu'il pointe vers `/loi-draisienne-electrique-2026`
- Si non : les deux coexistent et c'est du contenu dupliqué

---

## 📆 MOIS 1 — Améliorations

### Action 8 — Structured data sur la homepage

Dans `src/app/page.tsx`, ajouter en haut du return :
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Ma Draisienne Électrique',
    'url': 'https://www.ma-draisienne-electrique.fr',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.ma-draisienne-electrique.fr/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  })}}
/>
```

### Action 9 — Méta descriptions pour les pages catégorie

Dans `src/app/categorie/[slug]/page.tsx`, ajouter `generateMetadata` :
```typescript
export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return {
    title: `${category.title} — Draisiennes Électriques`,
    description: `Tous nos articles sur ${category.title.toLowerCase()} : guides, tests et comparatifs. Site de référence sur la draisienne électrique en France.`,
    alternates: { canonical: `https://www.ma-draisienne-electrique.fr/categorie/${slug}` },
  }
}
```

### Action 10 — H1 homepage plus SEO-friendly

Remplacer *"L'Élite de la Draisienne Électrique"* par quelque chose de descriptif :
*"Draisiennes Électriques Adultes & Enfants : Guides et Comparatifs 2026"*

---

## 📊 Métriques de suivi

Après avoir appliqué les corrections, surveiller dans Google Search Console :
- **Coverage** : nombre d'URLs indexées (doit augmenter vers 40-45 pages)
- **Performance** : clicks et impressions sur les mots-clés cibles
- **Core Web Vitals** : LCP, INP, CLS

Délai de récupération estimé après correction : **2 à 6 semaines** selon la fréquence de recrawl de Google.
