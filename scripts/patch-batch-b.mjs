import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const env = Object.fromEntries(readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>l.split('=').map(s=>s.trim())));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-05-06', token: env.SANITY_API_TOKEN, useCdn: false });

const articles = [
  {
    id: 'post-wp-comparatif-des-meilleures-assurances-pou',
    seoTitle: 'Meilleures assurances draisienne électrique 2026 : top 7',
    keyTakeaways: [
      '7 assureurs comparés : Allianz, AXA, MAIF, Macif, Wizzas, Qivio et Crédit Mutuel',
      'RC seule obligatoire : dès 2-5 €/mois — la formule minimum légale pour circuler sur voie publique',
      'Couverture vol + dommages + assistance : compter 8-20 €/mois selon la valeur de votre engin',
      'Coup de cœur rédaction : Wizzas — offre spécialisée EDPM, tarif compétitif, 100 % en ligne',
      'Astuce : vérifiez votre contrat habitation actuel — la RC vie privée couvre souvent les engins de mobilité'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle est la meilleure assurance pour une draisienne électrique en 2026 ?', answer:'Pour la formule minimum légale (RC seule), Wizzas et Qivio proposent des tarifs dès 2,90 €/mois. Pour une couverture complète (vol, dommages, assistance), la MAIF et la MACIF offrent les meilleures garanties entre 10 et 20 €/mois. Comparez en tenant compte de la valeur de votre draisienne.' },
      { _type:'object', _key:'faq2', question:'Mon assurance habitation couvre-t-elle ma draisienne électrique ?', answer:'Souvent oui pour la RC, mais rarement pour le vol ou les dommages. Vérifiez les conditions générales de votre contrat multirisques habitation, notamment les clauses sur les véhicules à moteur. En cas de doute, appelez votre assureur et demandez une confirmation écrite.' },
      { _type:'object', _key:'faq3', question:'L\'assurance draisienne électrique couvre-t-elle le vol ?', answer:'La RC obligatoire ne couvre pas le vol. Pour être indemnisé, souscrivez une option vol spécifique (50-150 €/an pour un modèle à 500 €). Pensez aussi à sécuriser votre draisienne avec un antivol certifié SRA — certains assureurs en exigent un pour garantir l\'indemnisation.' },
      { _type:'object', _key:'faq4', question:'Dois-je assurer ma draisienne même si je l\'utilise rarement ?', answer:'Oui, dès lors que vous circulez sur la voie publique, même occasionnellement. L\'obligation d\'assurance s\'applique dès la première sortie. Si vous ne l\'utilisez qu\'en propriété privée, l\'assurance n\'est pas légalement requise mais reste conseillée en cas d\'accident avec un tiers.' },
      { _type:'object', _key:'faq5', question:'Comment déclarer un sinistre pour une draisienne électrique assurée ?', answer:'Contactez votre assureur dans les 5 jours ouvrés (2 jours en cas de vol). Prenez des photos du sinistre, notez les coordonnées des témoins et remplissez un constat amiable si un tiers est impliqué. Conservez tous vos justificatifs d\'achat et tickets de réparation pour le remboursement.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-occasion-guide-dac',
    seoTitle: 'Draisienne électrique d\'occasion : guide d\'achat 2026',
    keyTakeaways: [
      'Économisez 30 à 60 % par rapport au prix neuf en achetant une draisienne électrique d\'occasion',
      'Vérifications indispensables : état de la batterie, freins, homologation L1e-B et intégrité du cadre',
      'Test obligatoire avant achat : roulez 2-3 km pour tester autonomie, freins et afficheur',
      'Meilleurs endroits : LeBonCoin, Facebook Marketplace, Vinted, revendeurs avec garantie',
      'Prix raisonnable d\'occasion : 40-60 % du prix neuf pour un modèle de moins de 2 ans en bon état'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Où trouver une draisienne électrique d\'occasion fiable ?', answer:'Les meilleures sources sont LeBonCoin, Facebook Marketplace et Vinted pour les particuliers, ou les revendeurs spécialisés pour des achats avec garantie. Évitez les lots sur les plateformes asiatiques sans possibilité de test préalable. Privilégiez les vendeurs locaux pour pouvoir inspecter l\'engin avant achat.' },
      { _type:'object', _key:'faq2', question:'Comment vérifier l\'état de la batterie d\'une draisienne d\'occasion ?', answer:'Demandez l\'historique de charge et effectuez un test d\'autonomie sur 10 km. Une batterie en bon état doit tenir 80 % de son autonomie initiale. Au-delà de 2 ans ou 400 cycles, intégrez un remplacement de batterie (80-200 €) dans votre budget d\'achat.' },
      { _type:'object', _key:'faq3', question:'Quelle est la décote d\'une draisienne électrique d\'occasion ?', answer:'La décote est de 30 à 40 % la première année, puis de 15 à 25 % par an supplémentaire. Un modèle vendu 600 € neuf vaut environ 360-420 € après un an, 200-300 € après deux ans selon son état. Les marques reconnues (UrbanGlide, Wispeed) perdent moins de valeur.' },
      { _type:'object', _key:'faq4', question:'Peut-on acheter une draisienne d\'occasion sans certificat de conformité ?', answer:'Vous pouvez l\'acheter, mais vous ne pourrez pas circuler légalement sur la voie publique si le modèle n\'est pas homologué L1e-B. Demandez toujours le certificat de conformité ou la facture d\'achat mentionnant l\'homologation. Sans ce document, l\'usage est limité à la propriété privée.' },
      { _type:'object', _key:'faq5', question:'Que vérifier lors d\'un achat de draisienne électrique d\'occasion ?', answer:'Vérifiez dans l\'ordre : 1) L\'homologation L1e-B (certificat de conformité), 2) L\'état de la batterie (autonomie réelle sur test), 3) Les freins (net et sans jeu), 4) Le cadre (aucune fissure ou soudure visible), 5) L\'afficheur et les fonctions électroniques. Testez 2-3 km avant de conclure.' }
    ]
  },
  {
    id: 'post-wp-test-complet-wispeed-wimob-20-la-draisie',
    seoTitle: 'Test Wispeed Wimob 20 : verdict draisienne premium 2026',
    keyTakeaways: [
      'Moteur 350 W, autonomie annoncée 55 km — autonomie réelle constatée : 40 à 50 km selon usage',
      'Points forts : finition premium, double suspension, écran couleur, autonomie leader de la catégorie',
      'Points faibles : prix élevé (800-1 000 €), poids important (~30 kg), recharge 5 à 6h',
      'Note de la rédaction : 4,5/5 — la référence premium pour les utilisateurs exigeants',
      'Homologuée L1e-B : circule légalement sur voie publique — la seule draisienne vraiment "route" de sa gamme'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle est l\'autonomie réelle de la Wispeed Wimob 20 ?', answer:'La Wispeed Wimob 20 affiche 55 km d\'autonomie théorique. En conditions réelles (conducteur 75 kg, terrain mixte), nous avons constaté entre 40 et 50 km. Sur parcours plat en mode économique, on approche les 55 km annoncés. C\'est l\'une des meilleures autonomies réelles du marché dans la catégorie premium.' },
      { _type:'object', _key:'faq2', question:'La Wispeed Wimob 20 est-elle homologuée pour circuler sur la route ?', answer:'Oui, la Wispeed Wimob 20 est homologuée cyclomobile léger (L1e-B) et peut légalement circuler sur les pistes cyclables et les chaussées à 50 km/h maximum. Son moteur 350 W est bridé à 25 km/h par construction, conformément aux exigences du Code de la route français.' },
      { _type:'object', _key:'faq3', question:'La Wispeed Wimob 20 est-elle difficile à transporter ?', answer:'Son poids d\'environ 28-30 kg la rend difficile à monter dans les escaliers ou à charger dans un coffre. Elle n\'est pas pliable. La Wispeed Wimob 20 est davantage pensée pour un usage quotidien point A-B que pour la multimodalité. Prévoyez un abri sécurisé pour le stationnement.' },
      { _type:'object', _key:'faq4', question:'Le SAV Wispeed est-il disponible en France ?', answer:'Oui, Wispeed est une marque française avec un SAV basé en France. Les pièces détachées sont disponibles et la garantie légale de 2 ans s\'applique. Le support client est joignable par téléphone et e-mail. C\'est un point fort important qui justifie en partie le positionnement premium.' },
      { _type:'object', _key:'faq5', question:'La Wispeed Wimob 20 vaut-elle son prix par rapport à des modèles moins chers ?', answer:'Si vous utilisez votre draisienne quotidiennement sur plus de 10 km, oui. La Wispeed Wimob 20 offre un confort de conduite et une autonomie nettement supérieurs aux modèles entrée de gamme. Pour un usage occasionnel ou des trajets inférieurs à 15 km, une draisienne à 400-500 € sera suffisante.' }
    ]
  },
  {
    id: 'post-wp-8-astuces-pour-ameliorer-autonomie-de-vo',
    seoTitle: 'Augmenter l\'autonomie draisienne électrique : 8 astuces',
    keyTakeaways: [
      'Gonfler les pneus à la bonne pression améliore l\'autonomie de 10 à 15 % sans aucun coût',
      'Le mode économique réduit la puissance moteur et augmente l\'autonomie de 20 à 30 %',
      'La température impacte la batterie : prévoyez -20 % d\'autonomie en dessous de 5°C',
      'Recharger régulièrement sans attendre 0 % protège la batterie et préserve son autonomie dans le temps',
      'En combinant les 8 astuces, gagnez jusqu\'à +40 % d\'autonomie réelle sur votre draisienne'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Pourquoi mon autonomie réelle est-elle inférieure à celle annoncée ?', answer:'L\'autonomie constructeur est mesurée dans des conditions idéales (terrain plat, conducteur léger, température de 20°C, mode économique). En conditions réelles, l\'autonomie est 20 à 30 % inférieure. Le poids du conducteur, les côtes, la température et le mode de conduite sont les principaux facteurs de réduction.' },
      { _type:'object', _key:'faq2', question:'Le gonflage des pneus a-t-il vraiment un impact sur l\'autonomie ?', answer:'Oui, significatif. Un pneu sous-gonflé augmente la résistance au roulement de 10 à 20 %, ce qui sollicite davantage le moteur et réduit l\'autonomie. Vérifiez la pression recommandée sur le flanc du pneu (généralement 40 à 60 psi) et contrôlez-la toutes les 2 semaines. C\'est l\'astuce la plus simple et la plus efficace.' },
      { _type:'object', _key:'faq3', question:'Le froid réduit-il vraiment l\'autonomie d\'une draisienne électrique ?', answer:'Oui. Les batteries lithium-ion perdent 15 à 25 % de leur capacité effective en dessous de 5°C, et jusqu\'à 40 % sous 0°C. Pour limiter cet effet, stockez la batterie à l\'intérieur la nuit en hiver et ne chargez pas une batterie complètement froide. Laissez-la se réchauffer 15 minutes avant utilisation.' },
      { _type:'object', _key:'faq4', question:'Faut-il recharger sa batterie après chaque utilisation ?', answer:'Oui, dans la mesure du possible. Recharger après chaque sortie évite les décharges profondes qui dégradent les cellules lithium. En revanche, ne laissez pas la batterie branchée plusieurs jours après une charge complète — débranchez dès que le voyant indique 100 %. Une bonne gestion de la charge prolonge la durée de vie de 30 à 50 %.' },
      { _type:'object', _key:'faq5', question:'Le poids du conducteur impacte-t-il beaucoup l\'autonomie ?', answer:'Oui, c\'est l\'un des facteurs les plus importants. Pour chaque 10 kg supplémentaires au-delà du conducteur de référence (généralement 75 kg), l\'autonomie diminue de 5 à 8 %. Un conducteur de 90 kg perdra 10 à 15 % d\'autonomie par rapport aux valeurs annoncées pour 70 kg. Tenez-en compte dans vos estimations.' }
    ]
  },
  {
    id: 'post-wp-meilleures-draisiennes-electriques-16-po',
    seoTitle: 'Meilleures draisiennes 16 pouces enfants 2026 : top 5',
    keyTakeaways: [
      'Format 16 pouces : adapté aux enfants de 5 à 12 ans selon leur taille et leur gabarit',
      '5 modèles testés par un papa passionné : KTM STACYC, Wegoboard, UrbanGlide et autres',
      'Critères prioritaires : selle réglable, poids < 12 kg, vitesse bridée ≤ 20 km/h et robustesse',
      'Budget moyen pour un modèle 16 pouces de qualité : 200 à 500 € selon la marque',
      'Rappel légal : en dessous de 14 ans, usage limité aux propriétés privées — voie publique interdite'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle draisienne électrique 16 pouces choisir pour mon enfant ?', answer:'Notre top 5 2026 place la KTM STACYC SX-E en tête pour la robustesse et le plaisir de conduite, et le Wegoboard W4 pour le rapport qualité/prix. Pour un budget plus serré, l\'UrbanGlide Kids offre une bonne entrée de gamme. Choisissez selon le gabarit de votre enfant : les 16 pouces conviennent généralement aux 5-12 ans.' },
      { _type:'object', _key:'faq2', question:'À quel âge un enfant peut-il utiliser une draisienne 16 pouces ?', answer:'Le format 16 pouces convient généralement aux enfants de 5 à 12 ans, avec une hauteur de selle de 45 à 65 cm selon les modèles. L\'important est que l\'enfant pose les pieds à plat au sol en position assise. Pour la voie publique, rappelons que l\'âge minimum légal est de 14 ans — les 16 pouces s\'utilisent en propriété privée.' },
      { _type:'object', _key:'faq3', question:'Quelle vitesse maximale pour une draisienne électrique 16 pouces enfant ?', answer:'Les draisiennes 16 pouces pour enfants sont généralement bridées à 12 à 20 km/h selon les modèles, bien en dessous de la limite légale de 25 km/h. Cette limitation est intentionnelle pour des raisons de sécurité. Certains modèles permettent aux parents de régler la vitesse maximale via l\'application ou un limiteur mécanique.' },
      { _type:'object', _key:'faq4', question:'Quelle est la durée de vie d\'une batterie de draisienne électrique enfant ?', answer:'La batterie d\'une draisienne enfant dure généralement 1 à 3 ans selon la fréquence d\'utilisation et l\'entretien. Les modèles de marques reconnues (KTM, Wegoboard) utilisent des batteries lithium-ion avec BMS intégré qui prolongent la durée de vie. Rechargez après chaque session et stockez à l\'abri du froid.' },
      { _type:'object', _key:'faq5', question:'Faut-il un casque pour utiliser une draisienne électrique 16 pouces ?', answer:'Oui, absolument et en toutes circonstances, y compris en propriété privée. Un casque de vélo homologué CE (norme EN1078) adapté à la tête de l\'enfant est indispensable. Ajoutez des genouillères et coudières pour les débutants. Ne laissez jamais un enfant rouler sans équipement de protection, même lentement.' }
    ]
  }
];

for (const a of articles) {
  try {
    const r = await client.patch(a.id).set({ seoTitle: a.seoTitle, keyTakeaways: a.keyTakeaways, faq: a.faq }).commit({ returnDocuments: true });
    console.log('✅', a.seoTitle, '| TL;DR:', r.keyTakeaways?.length, '| FAQ:', r.faq?.length);
  } catch(e) { console.error('❌', a.id, e.message); }
}
