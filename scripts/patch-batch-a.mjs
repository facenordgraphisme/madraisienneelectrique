import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-05-06',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const articles = [
  {
    id: 'post-wp-draisienne-electrique-enfant-que-dit-la-',
    seoTitle: 'Draisienne électrique enfant : que dit la loi 2026 ?',
    keyTakeaways: [
      'Âge minimum légal sur voie publique : 14 ans depuis le décret n°2023-848 du 31 août 2023',
      'En dessous de 14 ans, usage limité aux propriétés privées — jardin, cour, chemin privé uniquement',
      'Dès 14 ans : pistes cyclables et chaussées ≤ 50 km/h en agglomération uniquement',
      'Le casque est obligatoire hors agglomération et fortement recommandé pour tous les enfants',
      'Parent responsable : laisser un mineur de moins de 14 ans rouler sur voie publique = 135 € d\'amende'
    ],
    faq: [
      { _type:'object', _key:'faq1',
        question: 'À quel âge un enfant peut-il utiliser une draisienne électrique sur la voie publique ?',
        answer: 'Depuis le décret n°2023-848 du 31 août 2023, l\'âge minimum légal est de 14 ans. En dessous de cet âge, l\'usage est limité aux propriétés privées. L\'ancienne règle fixait la limite à 12 ans — certains sites l\'indiquent encore, mais elle n\'est plus en vigueur depuis fin 2023.' },
      { _type:'object', _key:'faq2',
        question: 'Un enfant peut-il utiliser une draisienne électrique dans un parc public ?',
        answer: 'Cela dépend du règlement intérieur du parc. Certains parcs municipaux autorisent les engins sur leurs allées non ouvertes à la circulation, d\'autres non. Vérifiez auprès de votre mairie. Sur les voies ouvertes à la circulation publique, c\'est interdit avant 14 ans sans exception.' },
      { _type:'object', _key:'faq3',
        question: 'Quel casque choisir pour un enfant sur une draisienne électrique ?',
        answer: 'Un casque de vélo homologué CE (norme EN1078) suffit, nul besoin d\'un casque moto. Choisissez un modèle bien ajusté avec fermeture sous le menton. Le casque doit être systématiquement porté même en propriété privée pour les enfants — c\'est une question de sécurité avant tout.' },
      { _type:'object', _key:'faq4',
        question: 'Quelle draisienne électrique choisir pour un enfant ?',
        answer: 'Privilégiez les modèles avec selle réglable, poids inférieur à 15 kg et vitesse bridée à 15-20 km/h. Les marques KTM STACYC et Wegoboard proposent des modèles conçus pour enfants dès 4-5 ans. Assurez-vous que le modèle est homologué si l\'enfant a 14 ans ou plus et souhaite circuler sur voie publique.' },
      { _type:'object', _key:'faq5',
        question: 'Les parents sont-ils responsables si leur enfant roule illégalement ?',
        answer: 'Oui. Un parent qui laisse un enfant de moins de 14 ans circuler sur la voie publique avec une draisienne électrique risque une contravention de 4e classe (135 €). En cas d\'accident, la responsabilité civile des parents peut également être engagée pour les dommages causés à des tiers.' }
    ]
  },
  {
    id: 'post-wp-assurance-pour-draisienne-electrique-obl',
    seoTitle: 'Assurance draisienne électrique : obligatoire en 2026 ?',
    keyTakeaways: [
      'Oui, l\'assurance responsabilité civile (RC) est légalement obligatoire sur la voie publique depuis 2022',
      'Pas de carte grise ni d\'immatriculation — seule l\'attestation RC est exigée au contrôle',
      'Sans assurance : amende jusqu\'à 3 750 € et réparation des dommages entièrement à votre charge',
      'Tarifs : RC seule dès 2-5 €/mois ; couverture vol + dommages entre 8 et 20 €/mois',
      'Vérifiez votre contrat habitation multirisques — certains couvrent déjà vos engins de mobilité'
    ],
    faq: [
      { _type:'object', _key:'faq1',
        question: 'L\'assurance est-elle vraiment obligatoire pour une draisienne électrique ?',
        answer: 'Oui, depuis le décret n°2022-31 du 14 janvier 2022, une assurance RC est obligatoire pour toute draisienne électrique circulant sur la voie publique. Contrairement aux voitures, aucune carte grise ni immatriculation n\'est requise, mais l\'attestation d\'assurance doit être présentée lors d\'un contrôle.' },
      { _type:'object', _key:'faq2',
        question: 'Quel est le risque de circuler sans assurance sur une draisienne électrique ?',
        answer: 'Circuler sans assurance RC expose à une amende pouvant atteindre 3 750 €. En cas d\'accident avec un tiers, vous êtes personnellement responsable de l\'intégralité des dommages matériels et corporels, ce qui peut représenter des dizaines de milliers d\'euros. Le risque financier est considérable.' },
      { _type:'object', _key:'faq3',
        question: 'Mon assurance habitation couvre-t-elle ma draisienne électrique ?',
        answer: 'Peut-être. De nombreux contrats multirisques habitation incluent une RC vie privée couvrant les engins de mobilité. Vérifiez les exclusions, notamment les clauses sur les véhicules motorisés. En cas de doute, contactez votre assureur et demandez une confirmation écrite par e-mail.' },
      { _type:'object', _key:'faq4',
        question: 'Quel est le prix d\'une assurance pour draisienne électrique ?',
        answer: 'Une RC seule coûte entre 2 et 5 €/mois. Une couverture complète (vol, dommages, assistance) coûte entre 8 et 20 €/mois selon le modèle et sa valeur. Wizzas, Qivio, MAIF et MACIF proposent des offres dédiées aux engins de mobilité électrique compétitives.' },
      { _type:'object', _key:'faq5',
        question: 'Faut-il assurer une draisienne utilisée uniquement en propriété privée ?',
        answer: 'Non, l\'obligation d\'assurance ne s\'applique qu\'à l\'usage sur voie publique. En propriété privée (jardin, terrain), vous n\'êtes pas légalement tenu de l\'assurer. Une RC reste conseillée en cas d\'accident avec un visiteur, mais ce n\'est pas une obligation légale.' }
    ]
  },
  {
    id: 'post-wp-guide-dachat-draisienne-electrique-adult',
    seoTitle: 'Guide achat draisienne électrique adulte 2026 : 5 critères',
    keyTakeaways: [
      '5 critères essentiels : autonomie réelle, puissance moteur (≤ 350 W), poids, homologation L1e-B et budget',
      'Homologation obligatoire : vérifiez le certificat de conformité L1e-B avant tout achat',
      'Autonomie réelle = 70-80 % de l\'autonomie constructeur — un modèle affiché 45 km fait ~30-35 km',
      'Poids idéal < 25 kg pour faciliter le transport dans les escaliers et les transports en commun',
      'Budget optimal : 400-800 € pour un bon rapport qualité/prix — méfiez-vous des offres sous 300 €'
    ],
    faq: [
      { _type:'object', _key:'faq1',
        question: 'Quels sont les critères pour bien choisir une draisienne électrique adulte ?',
        answer: 'Les 5 critères essentiels sont : l\'autonomie réelle, la puissance moteur (250-350 W selon votre poids), le poids de l\'engin (idéalement < 25 kg), l\'homologation L1e-B pour rouler légalement en France, et votre budget. Les suspensions sont un plus si vous roulez sur des revêtements dégradés.' },
      { _type:'object', _key:'faq2',
        question: 'Comment vérifier qu\'une draisienne électrique est homologuée ?',
        answer: 'Demandez le certificat de conformité européen (COC) attestant la catégorie L1e-B. Les modèles homologués mentionnent clairement cette catégorie dans leur fiche technique. Méfiez-vous des modèles vendus sous 300 € sur les plateformes asiatiques (Temu, AliExpress) rarement conformes aux exigences françaises.' },
      { _type:'object', _key:'faq3',
        question: 'L\'autonomie annoncée par les fabricants de draisiennes est-elle fiable ?',
        answer: 'Non. L\'autonomie réelle est 20 à 30 % inférieure à l\'autonomie annoncée. Un modèle affiché à 45 km offre réellement 30 à 35 km en usage mixte. Ces écarts s\'expliquent par le poids du conducteur, le terrain, la température et le mode de conduite. Basez-vous toujours sur des tests indépendants.' },
      { _type:'object', _key:'faq4',
        question: 'Quelle puissance moteur choisir pour une draisienne électrique adulte ?',
        answer: 'La limite légale est de 350 W. Un moteur 250 W convient à un usage urbain plat pour les conducteurs jusqu\'à 75 kg. Un moteur 350 W est recommandé au-delà de 80 kg ou en ville avec des côtes. Les deux restent bridés à 25 km/h — la puissance impacte l\'accélération et les côtes, pas la vitesse maximale.' },
      { _type:'object', _key:'faq5',
        question: 'Faut-il choisir une draisienne électrique pliable ou non-pliable ?',
        answer: 'Le modèle pliable est idéal si vous combinez draisienne et transports en commun ou manquez de place. En revanche, les versions pliables sont souvent plus lourdes et légèrement moins rigides. Pour un usage purement urbain sans multimodalité, la version non-pliable offre plus de stabilité.' }
    ]
  },
  {
    id: 'post-wp-test-complet-urbanglide-bike-140',
    seoTitle: 'Test UrbanGlide Bike 140 : notre verdict complet 2026',
    keyTakeaways: [
      'Moteur 250 W, autonomie annoncée 40 km — autonomie réelle constatée : 28 à 32 km',
      'Points forts : rapport qualité/prix excellent, freins à disque efficaces, SAV disponible en France',
      'Points faibles : pas de suspension arrière, afficheur basique, temps de charge 4 à 5h',
      'Note de la rédaction : 4/5 — excellent premier choix pour les budgets serrés et l\'usage urbain',
      'Prix constaté : 400-480 € — l\'une des meilleures draisiennes électriques sous 500 €'
    ],
    faq: [
      { _type:'object', _key:'faq1',
        question: 'Quelle est l\'autonomie réelle de l\'UrbanGlide Bike 140 ?',
        answer: 'L\'UrbanGlide Bike 140 affiche 40 km d\'autonomie théorique. En conditions réelles (conducteur 75 kg, terrain mixte, mode normal), nous avons constaté 28 à 32 km. En mode économique sur terrain plat, on atteint 35 à 38 km. Prévoyez moins par temps froid ou avec un conducteur de plus de 85 kg.' },
      { _type:'object', _key:'faq2',
        question: 'L\'UrbanGlide Bike 140 est-il homologué pour la voie publique ?',
        answer: 'Oui, l\'UrbanGlide Bike 140 est homologué cyclomobile léger (L1e-B). Il peut circuler légalement sur les pistes cyclables et les chaussées à 50 km/h maximum. Bridé à 25 km/h par construction, il répond aux exigences du décret n°2022-31 du Code de la route français.' },
      { _type:'object', _key:'faq3',
        question: 'Le service après-vente UrbanGlide est-il fiable ?',
        answer: 'UrbanGlide est une marque française (filiale de Boulanger) avec un SAV en France. Les pièces détachées sont disponibles et les délais raisonnables (2 à 4 semaines). C\'est un avantage majeur par rapport aux marques asiatiques sans présence locale, notamment pour faire valoir la garantie légale de 2 ans.' },
      { _type:'object', _key:'faq4',
        question: 'L\'UrbanGlide Bike 140 convient-il aux personnes de plus de 80 kg ?',
        answer: 'L\'UrbanGlide Bike 140 supporte jusqu\'à 100 kg. Pour les conducteurs entre 80 et 100 kg, l\'autonomie sera réduite de 15 à 25 % et les performances en côte seront limitées avec son moteur 250 W. Les conducteurs au-delà de 90 kg devraient envisager l\'UrbanGlide Bike 160 (moteur 350 W).' },
      { _type:'object', _key:'faq5',
        question: 'L\'UrbanGlide Bike 140 est-il difficile à assembler ?',
        answer: 'Non. L\'assemblage prend environ 15 à 20 minutes avec les outils fournis. Le guidon se visse, la selle s\'ajuste et la batterie est pré-installée. Le manuel est en français. La prise en main est immédiate, même pour les personnes peu habituées aux engins électriques.' }
    ]
  },
  {
    id: 'post-wp-batterie-lithium-ou-batterie-plomb-que-c',
    seoTitle: 'Batterie lithium ou plomb pour draisienne : que choisir ?',
    keyTakeaways: [
      'Lithium-ion : 3× plus légère, 800 cycles vs 300, recharge 2-4h — le standard de tous les modèles homologués',
      'Batterie plomb (SLA) : 30-80 € à l\'achat mais 3× plus lourde et durée de vie 2× plus courte',
      'Durée de vie lithium : 500-800 cycles soit 3-5 ans ; batterie plomb : 200-300 cycles soit 1-2 ans',
      'Ne jamais décharger une batterie lithium à 0 % — cela réduit significativement sa durée de vie',
      'Stockage longue durée : conserver la batterie entre 20 % et 80 % de charge à température ambiante'
    ],
    faq: [
      { _type:'object', _key:'faq1',
        question: 'Quelle est la différence entre une batterie lithium et une batterie plomb pour draisienne ?',
        answer: 'La batterie lithium-ion est 3 fois plus légère pour la même capacité, offre 500 à 800 cycles contre 200 à 300 pour le plomb, et se recharge en 2 à 4h contre 6 à 8h. La batterie plomb (SLA) est moins chère à l\'achat (30-80 €) mais pèse beaucoup plus et dure deux fois moins longtemps.' },
      { _type:'object', _key:'faq2',
        question: 'La batterie lithium est-elle dangereuse sur une draisienne électrique ?',
        answer: 'Les batteries lithium modernes intègrent un BMS (Battery Management System) qui prévient les surcharges et courts-circuits. Le risque est très faible en utilisant le chargeur d\'origine. N\'achetez jamais une batterie de remplacement non certifiée CE — c\'est la principale source de risque d\'incendie.' },
      { _type:'object', _key:'faq3',
        question: 'Combien de temps dure une batterie lithium sur une draisienne électrique ?',
        answer: 'Une batterie lithium de qualité dure 500 à 800 cycles de charge, soit 3 à 5 ans d\'usage normal. Sa durée de vie diminue si vous la déchargez à 0 % ou si vous la stockez dans des conditions extrêmes (< 0 °C ou > 40 °C). Maintenez-la entre 20 % et 80 % de charge pour maximiser sa longévité.' },
      { _type:'object', _key:'faq4',
        question: 'Quel est le prix d\'une batterie de remplacement pour draisienne électrique ?',
        answer: 'Une batterie lithium de remplacement coûte entre 80 et 200 € selon la capacité (36 V 7 Ah à 48 V 15 Ah). Les batteries plomb coûtent 30 à 80 €. Achetez uniquement des batteries certifiées CE compatibles avec votre modèle pour éviter tout risque et préserver votre garantie.' },
      { _type:'object', _key:'faq5',
        question: 'Comment prolonger la durée de vie de la batterie de ma draisienne ?',
        answer: 'Six règles simples : ne jamais décharger à 0 %, recharger après chaque sortie, stocker à 50-60 % si inutilisée plus de 2 semaines, éviter les températures extrêmes, utiliser uniquement le chargeur d\'origine, et ne pas laisser la batterie sur charge plusieurs jours après charge complète.' }
    ]
  }
];

for (const a of articles) {
  try {
    const r = await client.patch(a.id).set({
      seoTitle: a.seoTitle,
      keyTakeaways: a.keyTakeaways,
      faq: a.faq
    }).commit({ returnDocuments: true });
    console.log('✅', a.seoTitle, '| TL;DR:', r.keyTakeaways?.length, '| FAQ:', r.faq?.length);
  } catch(e) {
    console.error('❌', a.id, e.message);
  }
}
