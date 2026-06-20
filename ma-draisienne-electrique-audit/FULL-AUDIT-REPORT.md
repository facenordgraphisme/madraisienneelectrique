# Audit SEO Complet — ma-draisienne-electrique.fr
**Date :** 20 juin 2026  
**Contexte :** Perte massive de trafic après migration WordPress → Next.js / Sanity  
**Score SEO Global : 38 / 100**

---

## Résumé Exécutif

La migration WordPress → Next.js a introduit **6 problèmes critiques** qui expliquent l'essentiel de la perte de trafic et de mots-clés. Le plus grave est un **problème de domaine www vs non-www** : les deux versions du site répondent en 200 OK sans aucune redirection, créant du contenu dupliqué à grande échelle. Google avait indexé WordPress sous `ma-draisienne-electrique.fr` (sans www) ; le site Next.js cible `www.ma-draisienne-electrique.fr` — Google interprète ça comme deux sites différents.

**Perte estimée :** 60-80 % du trafic organique attribuable aux problèmes www/non-www et trailing-slash.

---

## Scores par Catégorie

| Catégorie | Score | Poids | Contribution |
|-----------|-------|-------|-------------|
| SEO Technique | 18/100 | 22% | 4/22 |
| Qualité du contenu | 55/100 | 23% | 13/23 |
| On-Page SEO | 30/100 | 20% | 6/20 |
| Schéma / Données structurées | 60/100 | 10% | 6/10 |
| Performance (CWV) | 65/100 | 10% | 7/10 |
| Maillage interne | 25/100 | 5% | 1/5 |
| Préparation IA (GEO) | 40/100 | 10% | 4/10 |
| **TOTAL** | **38/100** | | |

---

## PROBLÈMES CRITIQUES (à corriger dans les 24h)

### 🔴 CRITIQUE #1 — www vs non-www : double indexation sans redirection

**Impact : ★★★★★ (le plus grave)**

**Constat :**
- `https://ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir` → **200 OK**, contenu complet
- `https://www.ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir` → **200 OK**, même contenu

**Pourquoi c'est dévastateur :**
WordPress fonctionnait sur `ma-draisienne-electrique.fr` (sans www). Tous vos backlinks, le référencement historique, et l'autorité de domaine accumulée pointent vers le non-www. Après migration, Next.js sert le contenu sur www ET sur non-www sans redirection. Google voit 32 articles × 2 URLs = 64 pages avec contenu identique. Il choisit laquelle indexer et divise l'autorité de chaque page en deux.

**Preuve :** Les deux versions répondent en 200 OK. Aucune redirection dans next.config.ts pour www/non-www.

**Correction (next.config.ts) :**
```typescript
// Ajouter au début du tableau REDIRECTS :
{
  source: '/:path*',
  has: [{ type: 'host', value: 'ma-draisienne-electrique.fr' }],
  destination: 'https://www.ma-draisienne-electrique.fr/:path*',
  permanent: true,
},
```
**OU** configurer au niveau hébergeur (Vercel > Domains : rediriger le domaine sans www vers le www).

---

### 🔴 CRITIQUE #2 — URLs WordPress avec trailing slash non gérées

**Impact : ★★★★★**

**Constat :**
WordPress sert les articles avec un slash final : `/draisienne-electrique-vs-trottinette-electrique-que-choisir/`  
Next.js sert sans slash : `/draisienne-electrique-vs-trottinette-electrique-que-choisir`

Google avait indexé **32 articles** sous `ma-draisienne-electrique.fr/slug/` (non-www + trailing slash). Ces URLs n'existent plus sans redirection.

**Ce qui se passe sur le non-www avec trailing slash :**
- `https://ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir/` → probablement 404 ou redirect Next.js sans préserver le non-www

**Correction (next.config.ts) :**
```typescript
// Redirection catch-all pour trailing slash (à mettre avant les autres redirects) :
{
  source: '/:slug((?!api|_next|studio).*[^/])/',  // match URLs se terminant par /
  destination: '/:slug',
  permanent: true,
},
```
Next.js gère aussi cela automatiquement avec `trailingSlash: false` (déjà la valeur par défaut).

---

### 🔴 CRITIQUE #3 — Méta descriptions absentes sur les pages en production

**Impact : ★★★★☆**

**Constat :**
Audit de plusieurs pages en production. Méta descriptions : **non détectées** sur :
- Homepage
- Page article `/draisienne-electrique-adulte-guide-complet`
- Page article `/meilleures-draisiennes-electriques-pour-adultes-en-2025`
- Page article `/loi-draisienne-electrique-2026`
- Page catégorie `/categorie/comparatifs`

Le code `[slug]/page.tsx` lit `post.metaDescription || post.excerpt || ''`. Si ces champs sont vides dans Sanity, la méta description ne s'affiche pas. Sans méta description, Google génère ses propres extraits (souvent moins efficaces → CTR réduit de 20-40 %).

Le fichier `SEO_META_DASHBOARD.md` contient les méta descriptions pour les 33 articles, mais elles ne semblent pas avoir été importées dans Sanity.

**Vérification immédiate :**
Aller dans Sanity Studio > vérifier si le champ `metaDescription` est rempli pour chacun des 33 articles.

**Correction :** Importer toutes les méta descriptions du fichier `SEO_META_DASHBOARD.md` dans Sanity (champ `metaDescription` de chaque article).

---

### 🔴 CRITIQUE #4 — Liens internes dans le contenu pointant vers l'ancien domaine WordPress

**Impact : ★★★★☆**

**Constat :**
Le contenu HTML migré depuis WordPress contient des liens absolus du type :
```
https://ma-draisienne-electrique.fr/draisienne-electrique-adulte-guide-complet/
https://ma-draisienne-electrique.fr/les-meilleures-draisiennes-electriques-pour-adultes-a-moins-de-500-e/
```

Ces liens :
1. Pointent vers le domaine sans www (ancienne version WordPress)
2. Ont un trailing slash qui peut ne pas rediriger correctement
3. Sont traités par Google comme des liens **externes** (vers un autre site) au lieu de liens internes

La fonction `fixWordPressUrls()` dans `[slug]/page.tsx` ne corrige que les URLs d'images (`wp-content/uploads`), pas les liens internes.

**Correction (`[slug]/page.tsx`) :**
```typescript
function fixWordPressUrls(html: string): string {
  // Images
  let fixed = html.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/wp-content\/uploads\//gi,
    '/wp-content/uploads/'
  );
  // Liens internes : convertir en chemins relatifs
  fixed = fixed.replace(
    /https?:\/\/(?:www\.)?ma-draisienne-electrique\.fr\/((?!wp-content)[^"']*?)\/?(?=["'])/gi,
    '/$1'
  );
  return fixed;
}
```

---

### 🔴 CRITIQUE #5 — Conflit entre redirects next.config.ts et slugs Sanity existants

**Impact : ★★★☆☆**

**Constat :**
La page `/blog` liste un lien vers `/legislation-draisienne-electrique-en-france-2025`, mais `next.config.ts` a une règle qui redirige cette URL vers `/loi-draisienne-electrique-2026`.

Résultat : l'article Sanity avec slug `legislation-draisienne-electrique-en-france-2025` est **inaccessible** (la redirection Next.js s'applique AVANT le routing de page). La page blog affiche un lien qui redirige systématiquement vers un autre article.

**Articles potentiellement affectés** (à vérifier dans Sanity) :
- `legislation-draisienne-electrique-en-france-2025` → redirigé vers `loi-draisienne-electrique-2026`
- Vérifier si les deux slugs Sanity coexistent ou si l'un a été renommé

**Correction :** Dans Sanity Studio, s'assurer que les articles dont le slug est listé dans REDIRECTS ont bien été renommés vers le nouveau slug (pas de doublon). Le blog page doit lier directement vers le nouveau slug.

---

### 🔴 CRITIQUE #6 — Titre de la page Blog dupliqué

**Impact : ★★★☆☆**

**Constat :**
La page `/blog` affiche le titre :
> **"Blog - Ma Draisienne Électrique | Ma Draisienne Électrique"**

La marque apparaît deux fois. C'est causé par le template `'%s | Ma Draisienne Électrique'` dans `layout.tsx` appliqué à un titre qui contient déjà "Ma Draisienne Électrique".

**Correction (`src/app/blog/page.tsx`) :**
```typescript
export const metadata: Metadata = {
  title: 'Blog — Guides & Comparatifs de Draisiennes Électriques',
  description: 'Tous nos guides, tests et comparatifs de draisiennes électriques pour adultes et enfants. Mise à jour 2026.',
}
```

---

## PROBLÈMES ÉLEVÉS (à corriger en semaine 1-2)

### 🟠 ÉLEVÉ #7 — Sitemap : lastModified toujours = aujourd'hui

**Constat (`src/app/sitemap.ts`) :**
```typescript
lastModified: new Date(),  // toujours la date du jour
```
Chaque régénération du sitemap signale à Google que TOUS les articles ont été modifiés aujourd'hui, même s'ils n'ont pas changé. Google gaspille son budget de crawl à revisiter des pages inchangées.

**Correction :** Utiliser la vraie date de publication/modification depuis Sanity :
```typescript
lastModified: new Date(slug.updatedAt || slug.publishedAt || Date.now()),
```

---

### 🟠 ÉLEVÉ #8 — URLs canoniques manquantes sur les pages de catégorie

**Constat :**
Les pages `/categorie/[slug]` n'ont pas de balise canonical détectée en production. Sans canonical, Google peut indexer plusieurs variations de l'URL.

**Correction :** Ajouter `generateMetadata` aux pages catégorie avec `alternates: { canonical: ... }`.

---

### 🟠 ÉLEVÉ #9 — Absence de méta description sur la homepage

**Constat :**
La homepage génère des métadonnées via `layout.tsx` :
```typescript
description: 'Guide de référence sur les draisiennes électriques en France : comparatifs, avis, législation et conseils pratiques pour faire le bon choix en 2025.'
```
Mais la méta description ne semble pas se rendre en production (non détectée par l'audit). À vérifier avec `view-source:https://www.ma-draisienne-electrique.fr`.

---

### 🟠 ÉLEVÉ #10 — Structured data manquante sur la homepage et les pages catégorie

**Constat :**
Seules les pages article ont du JSON-LD (`BlogPosting` + `BreadcrumbList` + `FAQPage`). La homepage et les pages catégorie n'ont aucune donnée structurée.

**Recommandation :**
- Homepage : ajouter `WebSite` (avec `SearchAction`) et `Organization`
- Pages catégorie : ajouter `CollectionPage` ou `ItemList`

---

### 🟠 ÉLEVÉ #11 — Articles manquants dans le sitemap vs le blog

**Constat :**
- Sitemap : **29 articles** + 7 catégories + 2 pages fixes = 38 URLs
- Page `/blog` : **35 articles** listés
- CSV WordPress : **32 articles**

Il y a des articles dans le blog non présents dans le sitemap. Identifier et corriger la query Sanity dans `getAllPostSlugs()`.

---

## PROBLÈMES MOYENS (à corriger dans le mois)

### 🟡 MOYEN #12 — H1 homepage générique non optimisé

**Constat :**
H1 actuel : *"L'Élite de la Draisienne Électrique"*  
H1 recommandé : *"Draisiennes Électriques — Guides, Comparatifs & Avis 2026"*

Le H1 doit contenir le mot-clé principal. "L'Élite de" n'a aucune valeur sémantique pour le référencement.

---

### 🟡 MOYEN #13 — Titre article incomplet dans la balise title

**Constat :**
Pour l'article `/draisienne-electrique-adulte-guide-complet` :
- `og:title` (complet) : "Draisienne Électrique Adulte : Guide Complet 2025 (Choix, Loi, Prix)"
- Balise `<title>` : "Draisienne Électrique Adulte 2025 | Ma Draisienne Électrique"

Le code tronque le titre si `candidate.length > 62` mais applique l'élimination du suffixe branding. Le og:title et le title doivent être cohérents.

---

### 🟡 MOYEN #14 — Images inline des articles WordPress potentiellement cassées

**Constat :**
`fixWordPressUrls()` convertit `https://ma-draisienne-electrique.fr/wp-content/uploads/` en `/wp-content/uploads/`. Ces fichiers doivent exister dans `public/wp-content/uploads/` sur le serveur. Sur le repo local, tous ces fichiers sont marqués comme supprimés (`D` dans git status). Vérifier en production que les images s'affichent bien dans le contenu des articles.

---

### 🟡 MOYEN #15 — Manque de balise hreflang (mineur pour site monolingue)

Le site est 100 % français, donc peu critique. Mais la balise `lang="fr"` dans `<html>` est bien présente — pas de problème majeur.

---

## ANALYSE : POURQUOI AVEZ-VOUS PERDU CES MOTS-CLÉS ?

### Scénario de perte probable (chronologie)

```
AVANT migration (WordPress) :
ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir/
→ indexé par Google, autorité accumulée, 12k visiteurs/mois

APRÈS migration (Next.js) :
[1] www.ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir
    → Nouveau canonical que vous ciblez
[2] ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir
    → L'ancienne URL répond TOUJOURS en 200 OK (pas de redirect !)
[3] ma-draisienne-electrique.fr/draisienne-electrique-vs-trottinette-electrique-que-choisir/
    → Avec trailing slash, état inconnu

Google choisit [2] comme canonical (car historique + backlinks),
mais le sitemap et les canonicals pointent vers [1].
Google est confus → rankings divisés / effacés.
```

### Mots-clés probablement perdus par catégorie

| Type de perte | Cause principale |
|---------------|-----------------|
| Mots-clés "navigationnels" (nom de marque) | Peu affectés |
| Mots-clés d'articles (draisienne electrique vs trottinette, etc.) | ★★★★★ Critique #1 (www/non-www) |
| Mots-clés longue traîne des anciens slugs WP | ★★★★★ Critique #2 (trailing slash) |
| Richesse SERP (descriptions dans les résultats) | ★★★★☆ Critique #3 (meta descriptions) |
| Mots-clés de liens internes | ★★★☆☆ Critique #4 (liens WP dans contenu) |

---

## PLAN D'ACTION PRIORISÉ

### Phase 1 — URGENCE (48h)

- [ ] **Configurer la redirection non-www → www** au niveau Vercel (Settings > Domains) ou dans next.config.ts (voir Critique #1)
- [ ] **Vérifier et confirmer** que `https://ma-draisienne-electrique.fr/` redirige bien en 301 vers `https://www.ma-draisienne-electrique.fr/` après correction
- [ ] **Remplir les méta descriptions** dans Sanity pour tous les articles (SEO_META_DASHBOARD.md contient les 33 descriptions prêtes à l'emploi)
- [ ] **Corriger `fixWordPressUrls()`** pour aussi convertir les liens internes (pas seulement les images)

### Phase 2 — Semaine 1

- [ ] **Corriger la page Blog** : slug Sanity `legislation-draisienne-electrique-en-france-2025` doit pointer vers le bon article, ou supprimer le doublon
- [ ] **Fixer le titre de la page Blog** (Critique #6)
- [ ] **Corriger sitemap.ts** : utiliser la vraie date `updatedAt` de Sanity
- [ ] **Corriger H1 homepage** : le rendre plus descriptif et SEO-friendly
- [ ] **Soumettre le sitemap** à la Google Search Console après les corrections

### Phase 3 — Mois 1

- [ ] **Ajouter structured data** sur homepage (`WebSite` + `Organization`) et catégories (`CollectionPage`)
- [ ] **Ajouter méta descriptions** sur les pages catégorie via `generateMetadata`
- [ ] **Ajouter les canonicals** sur les pages catégorie
- [ ] **Vérifier les images** inline dans les articles (s'assurer qu'elles chargent bien en production)
- [ ] **Fixer les titres title vs og:title** pour qu'ils soient cohérents

### Phase 4 — Mois 2 (monitoring)

- [ ] Mettre en place Google Search Console monitoring (Coverage, Performance)
- [ ] Surveiller les Core Web Vitals via CrUX
- [ ] Identifier les articles qui récupèrent le plus vite pour prioriser les améliorations de contenu
- [ ] Envisager une image sitemap pour les articles avec images

---

## DÉTAILS TECHNIQUES

### Structure du site Next.js
- Framework : Next.js 16.2.4 (App Router)
- CMS : Sanity
- URLs articles : `/{slug}` (racine, pas `/blog/{slug}`)
- URLs catégories : `/categorie/{slug}`
- Sitemap : généré dynamiquement via `src/app/sitemap.ts`
- Robots.txt : correctement configuré (`Allow: /`, `Disallow: /studio/`)

### Contenu audité
- **32 articles WordPress** (CSV export)
- **29 articles** dans le sitemap Next.js
- **35 articles** visibles sur la page blog
- **7 catégories** dans le sitemap

### Ce qui fonctionne bien ✅
- Robots.txt correctement configuré
- JSON-LD `BlogPosting` + `BreadcrumbList` sur les pages article
- FAQPage schema quand des FAQ existent
- Open Graph images depuis Sanity CDN
- Redirects permanents pour les slugs renommés (dans next.config.ts)
- Structure HTML sémantique correcte (article, nav, aside)
- `lang="fr"` sur le HTML
- Vérification Google configurée dans le layout
- Breadcrumb visuel cohérent avec le schema

---

*Rapport généré le 20 juin 2026 — Audit SEO ma-draisienne-electrique.fr*
