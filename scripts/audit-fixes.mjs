/**
 * audit-fixes.mjs
 * Applies all corrections identified in the blog audit report (2026-05-17).
 *
 * Fixes applied:
 *  1. metaDescription for draisienne-electrique-adulte-guide-complet
 *  2. metaDescription + seoTitle for test-complet-urbanglide-linx-160
 *  3. seoTitle for draisienne-electrique-adulte-guide-complet
 *  4. FAQ legal fix on urbanglide (assurance RC obligatoire)
 *  5. Assign author Fx to 3 posts missing it
 *  6. Fix author bio typo ("passione" → "passionne")
 */

import { createClient } from 'next-sanity'

const AUTHOR_ID = 'd91a4228-1691-4053-8650-32d0300fadb8'

const client = createClient({
  projectId: 'svwgtz77',
  dataset: 'production',
  apiVersion: '2025-05-06',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function run() {
  const mutations = []
  let ok = 0
  let fail = 0

  async function patch(id, fields, label) {
    try {
      await client.patch(id).set(fields).commit()
      console.log(`  ✓ ${label}`)
      ok++
    } catch (e) {
      console.error(`  ✗ ${label}: ${e.message}`)
      fail++
    }
  }

  // ── 1 & 3 · Guide complet ──────────────────────────────────────────────
  console.log('\n[1/6] Guide complet — metaDescription + seoTitle')
  await patch(
    'post-draisienne-electrique-adulte-guide-complet',
    {
      metaDescription:
        'Draisienne électrique adulte : loi 2026, guide d\'achat et comparatif des meilleurs modèles. 62 000 unités vendues en France en 2025.',
      seoTitle: 'Draisienne Électrique Adulte 2025',
    },
    'metaDescription (133 chars) + seoTitle (33 chars → 60 chars avec brand)'
  )

  // ── 2 & 4 · Urbanglide Linx 160 ───────────────────────────────────────
  console.log('\n[2/6] Urbanglide Linx 160 — metaDescription + seoTitle + FAQ légale')
  await patch(
    'post-test-complet-urbanglide-linx-160',
    {
      metaDescription:
        'Test Urbanglide Linx 160 (2025) : 600 W, 40 km d\'autonomie réelle, batterie amovible. Notre avis complet après 4 semaines — 589 €.',
      seoTitle: 'Test Urbanglide Linx 160 (2025)',
      faq: [
        {
          question: 'Quelle est l\'autonomie réelle de la Linx 160 en ville ?',
          answer:
            'En conditions urbaines réelles, 30 à 38 km selon le profil de trajet. Sur terrain plat, jusqu\'à 40 km. Sur parcours accidenté avec pentes > 8°, comptez 22-25 km. (Source : test direct, Paris, mai 2025)',
        },
        {
          question: 'La Linx 160 est-elle légale en France sans permis ?',
          answer:
            'Oui. Elle respecte la norme NF EN 17128 : vitesse bridée à 25 km/h, puissance nominale 350 W. Ni permis ni immatriculation requis. Une assurance responsabilité civile est obligatoire — votre contrat habitation la couvre souvent. Circulation autorisée sur pistes cyclables et routes limitées à 50 km/h.',
        },
        {
          question: 'Peut-on utiliser la Linx 160 sous la pluie ?',
          answer:
            'Oui. Indice IPX5 : protégée contre les jets d\'eau directionnels. Testée sous pluie modérée sans incident. Évitez la submersion et maintenez le connecteur de charge au sec.',
        },
        {
          question: 'Combien de temps dure la batterie sur la durée ?',
          answer:
            '500 à 800 cycles complets avant dégradation notable. À raison d\'une charge complète par jour, c\'est 1,5 à 2 ans. Remplacement estimé à 120-180 € en 2025.',
        },
        {
          question: 'Comment la Linx 160 se compare-t-elle à l\'Urbanglide eBike 160 ?',
          answer:
            'Le Linx 160 est une évolution majeure : moteur 600 W vs 350 W, batterie 360 Wh amovible vs 216 Wh fixe, freins à disque double vs V-brake, IPX5 vs IPX4. Environ 190 € plus cher.',
        },
      ],
    },
    'metaDescription (131 chars) + seoTitle (31 chars) + FAQ légale corrigée'
  )

  // ── 5 · Assign author to 3 posts ──────────────────────────────────────
  console.log('\n[3/6] Assignation auteur Fx aux 3 posts manquants')
  const authorRef = { _type: 'reference', _ref: AUTHOR_ID }

  const postsNeedingAuthor = [
    { id: 'post-wp-assurance-pour-draisienne-electrique-obl', label: 'assurance-pour-draisienne-electrique-obligatoire' },
    { id: 'post-wp-meilleures-draisiennes-electriques-16-po', label: 'meilleures-draisiennes-16-pouces-enfants' },
    { id: 'post-wp-meilleures-draisiennes-electriques-pour-', label: 'meilleures-draisiennes-adultes-en-2025' },
  ]

  for (const p of postsNeedingAuthor) {
    await patch(p.id, { author: authorRef }, `author → ${p.label}`)
  }

  // ── 6 · Fix author bio typo ────────────────────────────────────────────
  console.log('\n[4/6] Correction typo bio auteur (passione → passionne)')
  try {
    const author = await client.fetch(`*[_type == "author" && _id == $id][0]{bio}`, { id: AUTHOR_ID })
    if (author?.bio && author.bio.includes('passione') && !author.bio.includes('passionne')) {
      const fixedBio = author.bio.replace('passione', 'passionne')
      await client.patch(AUTHOR_ID).set({ bio: fixedBio }).commit()
      console.log('  ✓ Bio corrigée')
      ok++
    } else {
      console.log('  — Bio déjà correcte, rien à faire')
    }
  } catch (e) {
    console.error(`  ✗ Bio: ${e.message}`)
    fail++
  }

  // ── Summary ───────────────────────────────────────────────────────────
  console.log(`\n──────────────────────────────────`)
  console.log(`Résultat : ${ok} patchs OK, ${fail} échecs`)
  if (fail > 0) process.exit(1)
}

run().catch((e) => { console.error(e); process.exit(1) })
