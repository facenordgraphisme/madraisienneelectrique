import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const env = Object.fromEntries(readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>l.split('=').map(s=>s.trim())));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-05-06', token: env.SANITY_API_TOKEN, useCdn: false });

const articles = [
  {
    id: 'post-wp-draisienne-electrique-enfant-pas-chere-q',
    seoTitle: 'Draisienne électrique enfant pas chère : que vaut l\'entrée de gamme ?',
    keyTakeaways: [
      'Entrée de gamme enfant : modèles entre 80 et 200 € — convient pour un usage occasionnel en propriété privée',
      'Risques des modèles très bon marché (< 80 €) : batterie non certifiée, structure fragile, vitesse mal bridée',
      'Critères de sécurité non négociables : bridage ≤ 15 km/h, poids < 10 kg, certifié CE',
      'Budget 150-300 € : le segment idéal pour un bon modèle enfant durable et sécurisé',
      'Rappel : usage voie publique interdit avant 14 ans — l\'entrée de gamme est pour la propriété privée'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Peut-on trouver une draisienne électrique enfant de qualité pour moins de 200 € ?', answer:'Oui, mais avec des compromis. Entre 150 et 200 €, on trouve des modèles corrects pour un usage occasionnel en jardin. En dessous de 100 €, la qualité de la batterie et la robustesse du cadre sont souvent insuffisantes. Pour un usage régulier, un budget de 200 à 350 € offre un meilleur rapport durabilité/prix.' },
      { _type:'object', _key:'faq2', question:'Quels sont les risques des draisiennes électriques très bon marché pour enfants ?', answer:'Les modèles sous 80 € peuvent présenter plusieurs risques : batteries lithium non certifiées CE (risque d\'incendie), vitesse mal bridée (dépassement des 15-20 km/h recommandés pour les enfants), cadre plastique fragile sous les chocs, et absence de SAV en cas de panne. Vérifiez toujours la certification CE et les avis clients.' },
      { _type:'object', _key:'faq3', question:'Quelle vitesse maximale pour une draisienne électrique enfant pas chère ?', answer:'Pour les enfants de 3 à 10 ans, la vitesse maximale recommandée est de 12 à 20 km/h selon l\'âge. Vérifiez que le modèle est bridé en usine et que le réglage de vitesse ne peut pas être déverrouillé facilement par l\'enfant. Certains parents-testeurs regrettent des modèles bon marché dont le limiteur se débraye après quelques chutes.' },
      { _type:'object', _key:'faq4', question:'Comment choisir entre une draisienne thermique et électrique pour enfant ?', answer:'Aujourd\'hui, les draisiennes thermiques pour enfants ont pratiquement disparu du marché au profit des électriques. L\'électrique est plus silencieux, ne dégage pas de fumée et est plus facile à entretenir. Pour un enfant de moins de 14 ans en propriété privée, une draisienne électrique entre 150 et 300 € est la meilleure option.' },
      { _type:'object', _key:'faq5', question:'Faut-il un casque pour utiliser une draisienne électrique enfant en jardin ?', answer:'Oui, absolument. Même en propriété privée et à faible vitesse, les chutes arrivent et le casque protège efficacement la tête. Un casque de vélo CE adapté à la tête de l\'enfant est suffisant. Ajoutez des genouillères et coudières pour les débutants. Ne négligez jamais la protection, quelle que soit la vitesse.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-moovway-que-sont-d',
    seoTitle: 'Draisienne électrique Moovway : que sont-elles devenues ?',
    keyTakeaways: [
      'Moovway (B3, B20) : marque pionnière des draisiennes électriques en France, active de 2015 à 2022 environ',
      'Les modèles Moovway ne sont plus produits — pièces détachées de plus en plus difficiles à trouver',
      'SAV actuel : support limité, certains revendeurs tiers proposent encore des batteries compatibles',
      'Alternative recommandée : UrbanGlide, Wispeed ou DYU proposent des modèles équivalents avec SAV actif',
      'En occasion : un Moovway en bon état peut encore valoir le coup à moins de 150-200 €'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'La marque Moovway existe-t-elle encore ?', answer:'Moovway a été une marque pionnière des draisiennes électriques en France, distribuée notamment via Décathlon et les grandes surfaces. Après une activité commerciale jusqu\'en 2021-2022, la marque n\'est plus active pour la production de nouveaux modèles. Le support et les pièces détachées se raréfient progressivement.' },
      { _type:'object', _key:'faq2', question:'Peut-on encore trouver des pièces détachées pour une Moovway B3 ou B20 ?', answer:'C\'est de plus en plus difficile. Certains revendeurs tiers et des vendeurs Amazon proposent encore des batteries et des pneus compatibles. Les forums spécialisés (Reddit, groupes Facebook EDPM) sont de bonnes sources pour des pièces d\'occasion. Si votre Moovway tombe en panne majeure, le coût de réparation peut dépasser sa valeur marchande.' },
      { _type:'object', _key:'faq3', question:'Quelle est la valeur d\'une Moovway d\'occasion en 2026 ?', answer:'Un Moovway B3 ou B20 en bon état vaut entre 80 et 180 € en 2026, selon le modèle et l\'état de la batterie. Si la batterie est usée, comptez 50-80 € de remplacement supplémentaire. L\'achat n\'est recommandé que si le prix est très attractif et si vous avez les compétences pour l\'entretenir vous-même.' },
      { _type:'object', _key:'faq4', question:'Quelle draisienne électrique recommandez-vous à la place d\'une Moovway ?', answer:'Pour remplacer une Moovway B3 ou B20, notre recommandation 2026 est l\'UrbanGlide Bike 140 (SAV France, prix 400-480 €) pour un budget serré, ou la DYU A5 (suspensions, 550 €) pour plus de confort. Les deux sont homologuées L1e-B et bénéficient d\'un SAV actif en France.' },
      { _type:'object', _key:'faq5', question:'Les Moovway sont-elles toujours homologuées pour circuler sur la voie publique ?', answer:'Les Moovway B3 et B20 étaient homologuées lors de leur commercialisation. L\'homologation elle-même ne se périme pas. Si votre Moovway possède toujours son certificat de conformité L1e-B d\'origine, elle reste légalement utilisable sur la voie publique, à condition que l\'engin réponde toujours aux critères techniques (vitesse ≤ 25 km/h, etc.).' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-pour-enfant-est-el',
    seoTitle: 'Draisienne électrique pour enfant : est-ce dangereux ?',
    keyTakeaways: [
      'La draisienne électrique est sûre pour les enfants si les bonnes précautions sont respectées',
      'Équipement indispensable : casque CE + genouillères + coudières — toujours, même en propriété privée',
      'Vitesse bridée ≤ 15 km/h pour les moins de 10 ans — vérifiez le réglage avant chaque utilisation',
      'Surveillance parentale recommandée pour les premières sessions et obligatoire pour les moins de 8 ans',
      'Voie publique interdite avant 14 ans — utilisez jardins, cours et espaces privatifs uniquement'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'La draisienne électrique est-elle dangereuse pour un enfant ?', answer:'Pas si les précautions de base sont respectées. La draisienne électrique est plus sûre que le vélo classique (position assise basse, pas de pédales à gérer) et plus stable qu\'une trottinette debout. Le principal risque est la chute à basse vitesse. Un équipement adapté (casque, protections) et une surveillance parentale rendent cet engin parfaitement sûr.' },
      { _type:'object', _key:'faq2', question:'Quel âge minimum pour qu\'un enfant utilise une draisienne électrique ?', answer:'En propriété privée, il n\'y a pas d\'âge minimum légal. En pratique, les enfants peuvent commencer à 3-4 ans sur les modèles adaptés (type KTM STACYC SX-E 1.20). L\'important est que l\'enfant soit à l\'aise, puisse poser les pieds à plat et comprenne les commandes basiques (accélérateur et frein).' },
      { _type:'object', _key:'faq3', question:'Quels équipements de protection prévoir pour un enfant ?', answer:'Le minimum absolu est un casque CE bien ajusté (norme EN1078). Pour les débutants et les moins de 8 ans, ajoutez des genouillères, des coudières et idéalement des gants. Pour les enfants plus jeunes ou les premières sessions, un gilet de protection intégral offre une sécurité maximale. Vérifiez l\'ajustement du casque à chaque session.' },
      { _type:'object', _key:'faq4', question:'Comment apprendre à un enfant à utiliser une draisienne électrique en toute sécurité ?', answer:'Commencez sur une surface plate et dégagée, moteur coupé pour les premières minutes. Montrez comment actionner le frein avant de démarrer. Démarrez en mode le plus lent possible. Restez à côté de l\'enfant pour les 2-3 premières sessions. Augmentez progressivement la vitesse quand il maîtrise le freinage.' },
      { _type:'object', _key:'faq5', question:'Y a-t-il des risques spécifiques liés à la batterie des draisiennes électriques pour enfants ?', answer:'Les modèles de marques reconnues et certifiés CE utilisent des batteries lithium-ion avec BMS intégré qui préviennent les surcharges et les courts-circuits. Le risque d\'incendie est très faible avec le chargeur d\'origine. Évitez les modèles très bon marché dont les batteries ne sont pas certifiées. Ne laissez jamais charger la nuit sans surveillance pour les modèles bon marché.' }
    ]
  },
  {
    id: 'post-wp-guide-complet-accessoires-indispensables',
    seoTitle: 'Accessoires draisienne électrique : les indispensables 2026',
    keyTakeaways: [
      'Antivol : premier achat obligatoire — optez pour un antivol certifié SRA (chaîne ou U) dès 30-60 €',
      'Casque : obligatoire hors agglomération, fortement recommandé en ville — casque de vélo CE suffit',
      'Éclairage homologué : obligatoire de nuit — feux avant blanc + feu arrière rouge + réflecteurs',
      'Support smartphone : indispensable pour la navigation — modèle avec fixation vibration-proof',
      'Gilet réfléchissant : obligatoire de nuit hors agglomération — préférez un gilet avec poches'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quels sont les accessoires obligatoires pour une draisienne électrique ?', answer:'Les accessoires légalement obligatoires sont : l\'éclairage (feux avant et arrière, réflecteurs latéraux), le casque hors agglomération, et l\'équipement réfléchissant de nuit. L\'antivol n\'est pas légalement obligatoire mais est indispensable en pratique. Ces équipements sont en général fournis sur les modèles homologués L1e-B.' },
      { _type:'object', _key:'faq2', question:'Quel antivol choisir pour sa draisienne électrique ?', answer:'Optez pour un antivol certifié SRA, qui est reconnu par les assureurs pour les indemnisations vol. Pour une draisienne, un antivol en U certifié SRA (30-60 €) ou une chaîne épaisse (50-100 €) sont les plus efficaces. Attachez toujours la draisienne à un point fixe et bloquez la roue. Doublez avec un câble pour les arrêts courts.' },
      { _type:'object', _key:'faq3', question:'Quel support smartphone choisir pour sa draisienne électrique ?', answer:'Choisissez un support avec une fixation anti-vibrations (gel ou ressorts) pour protéger votre téléphone du moteur-roue. Les supports Quad Lock, Shapeheart et SP Connect sont des références fiables. Vérifiez la compatibilité avec votre guidon (diamètre standard 22 mm) et optez pour un modèle avec protection contre la pluie.' },
      { _type:'object', _key:'faq4', question:'Faut-il un gilet réfléchissant pour rouler en draisienne électrique ?', answer:'Un équipement réfléchissant est légalement obligatoire de nuit et en cas de faible visibilité hors agglomération. En agglomération, il est fortement recommandé. Un gilet réfléchissant homologué CE (type EN ISO 20471) suffit. Pour plus de confort, certains cyclistes préfèrent les bandes réfléchissantes fixées sur le bras ou le sac à dos.' },
      { _type:'object', _key:'faq5', question:'Quel budget prévoir pour bien équiper sa draisienne électrique ?', answer:'Le budget accessoires essentiel est de 80 à 150 € : antivol SRA (40-60 €), casque (20-40 €), éclairage complémentaire si non inclus (15-30 €), gilet réfléchissant (10-20 €). Pour un équipement complet (support smartphone, pompe portable, kit crevaison, sacoche), comptez 150 à 250 € supplémentaires.' }
    ]
  },
  {
    id: 'post-wp-linfluence-de-la-taille-des-roues-dune-d',
    seoTitle: 'Taille des roues draisienne électrique : quel impact sur la conduite ?',
    keyTakeaways: [
      'Petites roues (10\'-12\') : maniabilité et légèreté — idéales pour la ville et les surfaces lisses',
      'Grandes roues (16\'-20\') : stabilité et confort sur revêtements irréguliers — meilleures en campagne',
      'Roues 14\' : le bon compromis pour un usage mixte ville + chemins — la taille la plus polyvalente',
      'Pneus larges ≥ 2,5\' : meilleur amorti sur pavés, absorbent les vibrations sans suspension',
      'Pneus gonflables vs pleins : le gonflable offre plus de confort, le plein (no puncture) évite les crevaisons'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle taille de roues choisir pour une draisienne électrique en ville ?', answer:'Pour un usage urbain sur routes et pistes cyclables bitumées, des roues de 10 à 14 pouces sont idéales. Elles offrent une bonne maniabilité, un poids réduit et suffisamment de stabilité pour les vitesses jusqu\'à 25 km/h. Les roues de 20 pouces, plus stables, sont mieux adaptées aux longues distances et aux routes dégradées.' },
      { _type:'object', _key:'faq2', question:'Les grandes roues sont-elles vraiment plus stables ?', answer:'Oui, en général. Une roue de 20 pouces absorbe mieux les irrégularités du sol (pavés, joints de dilatation, petits nids-de-poule) qu\'une roue de 10 pouces. Elle offre également une meilleure trajectoire en ligne droite. En contrepartie, elle alourdit l\'engin et réduit légèrement la maniabilité dans les espaces restreints.' },
      { _type:'object', _key:'faq3', question:'Quelle est la différence entre pneus gonflables et pneus solides ?', answer:'Les pneus gonflables (chambres à air) offrent plus de confort en absorbant les chocs, mais sont vulnérables aux crevaisons (5-10 min de réparation). Les pneus solides (no puncture) sont increvables mais transmettent davantage les vibrations. Pour la ville, les pneus gonflables sont préférables. Pour les chemins difficiles, le solid tire évite les mauvaises surprises.' },
      { _type:'object', _key:'faq4', question:'La taille des roues influence-t-elle l\'autonomie d\'une draisienne ?', answer:'Indirectement, oui. Les petites roues (10-12\') tournent plus vite pour la même vitesse et sollicitent davantage le moteur sur terrain irrégulier. Les grandes roues (16-20\') roulent plus efficacement sur longue distance. La différence d\'autonomie reste marginale (5-10 %) et est principalement influencée par la capacité de la batterie.' },
      { _type:'object', _key:'faq5', question:'Peut-on changer la taille des roues d\'une draisienne électrique ?', answer:'Non, la taille des roues est fixée par le cadre et le moteur-roue. Vous ne pouvez pas monter des roues de 20 pouces sur un cadre prévu pour du 12 pouces. En revanche, vous pouvez changer le type de pneu (gonflable/solide) et la largeur dans les limites de compatibilité avec votre jante. Consultez le manuel du fabricant.' }
    ]
  },
  {
    id: 'post-wp-wegoboard-draisiennes-electriques-franca',
    seoTitle: 'Wegoboard : la marque française de draisienne électrique',
    keyTakeaways: [
      'Wegoboard est la principale marque française spécialisée en draisiennes électriques depuis 2016',
      'Gamme complète : modèles adultes (W7, W9) et enfants (W4, W5) — tous homologués L1e-B',
      'SAV 100 % français avec pièces détachées disponibles — atout majeur face aux marques asiatiques',
      'Prix : 300-700 € selon le modèle — positionnement milieu de gamme avec qualité supérieure',
      'Disponible en magasins spécialisés et directement sur wegoboard.com avec livraison France entière'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Wegoboard est-il un fabricant français de draisiennes électriques ?', answer:'Oui, Wegoboard est une marque française fondée en 2016, spécialisée exclusivement dans les draisiennes électriques. La conception et le développement sont réalisés en France, même si la production est assurée en Asie comme la quasi-totalité des constructeurs du secteur. Le SAV et le support client sont entièrement basés en France.' },
      { _type:'object', _key:'faq2', question:'Les Wegoboard sont-elles homologuées pour circuler sur la voie publique ?', answer:'Oui, tous les modèles Wegoboard adultes (W7, W9) sont homologués cyclomobile léger (L1e-B) et peuvent circuler légalement sur les pistes cyclables et les chaussées à 50 km/h maximum. Les modèles enfants (W4, W5) sont destinés à un usage en propriété privée pour les moins de 14 ans.' },
      { _type:'object', _key:'faq3', question:'Quelle est la meilleure Wegoboard adulte en 2026 ?', answer:'Le Wegoboard W7 est notre recommandation principale : moteur 350 W, autonomie réelle 35-45 km, suspensions avant, cadre aluminium robuste. Le W9 est plus premium avec double suspension et plus grande autonomie, mais aussi plus cher (600-700 €). Pour un budget serré, le W5 offre un bon rapport qualité/prix.' },
      { _type:'object', _key:'faq4', question:'Le SAV Wegoboard est-il meilleur qu\'un concurrent asiatique ?', answer:'Oui, significativement. Wegoboard dispose d\'un service client francophone, d\'un stock de pièces détachées en France et d\'un réseau de réparateurs agréés. Les délais d\'intervention sont nettement plus courts (1-2 semaines) que les marques sans présence locale. C\'est l\'un des principaux arguments d\'achat justifiant le surcoût par rapport aux marques asiatiques.' },
      { _type:'object', _key:'faq5', question:'Peut-on essayer une Wegoboard avant de l\'acheter ?', answer:'Oui, Wegoboard dispose de partenaires revendeurs et de pop-up events réguliers en France pour des essais. Consultez leur site officiel (wegoboard.com) pour localiser le point de vente le plus proche. Certaines enseignes de sport et de mobilité douce proposent également des essais sur rendez-vous pour les modèles en stock.' }
    ]
  },
  {
    id: 'post-wp-dyu-d3f-la-draisienne-electrique-adulte-',
    seoTitle: 'Test DYU D3F : la draisienne pliable ultra-compacte 2026',
    keyTakeaways: [
      'DYU D3F : la plus compacte des draisiennes électriques pliables adultes — 14 kg, roues 12\'',
      'Moteur 240 W, autonomie réelle 25-30 km — idéale pour les trajets courts (< 10 km) en ville',
      'Points forts : pliage rapide (30 sec), légèreté, prix attractif (350-450 €), design épuré',
      'Points faibles : pas de suspension, pneus petits (12\') peu confortables sur pavés, autonomie limitée',
      'Notre verdict : 3,5/5 — excellente pour le dernier kilomètre et la multimodalité, insuffisante pour les longues distances'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'La DYU D3F est-elle homologuée pour rouler sur la voie publique en France ?', answer:'Oui, la DYU D3F est homologuée cyclomobile léger (L1e-B) si vous achetez le modèle spécifique à la réglementation française. Vérifiez bien la mention L1e-B sur la fiche technique lors de l\'achat, car DYU vend plusieurs variantes dont certaines dépassent 25 km/h et ne sont pas homologuées pour la voie publique.' },
      { _type:'object', _key:'faq2', question:'Quelle est l\'autonomie réelle de la DYU D3F ?', answer:'La DYU D3F affiche 30 km d\'autonomie théorique. En conditions réelles, nous constatons 20 à 28 km selon le poids du conducteur et le terrain. Pour un conducteur de 70 kg sur terrain plat en mode normal, 25-28 km sont réalistes. C\'est suffisant pour des trajets quotidiens courts (< 10 km), mais insuffisant pour des distances plus importantes.' },
      { _type:'object', _key:'faq3', question:'Combien de temps faut-il pour plier la DYU D3F ?', answer:'Le mécanisme de pliage de la DYU D3F se réalise en 20 à 30 secondes une fois le geste maîtrisé. Le guidon se rabat et le cadre se plie en deux points. Dépliée, elle reste parfaitement rigide. Cette rapidité de pliage la rend idéale pour les usages multimodaux (métro + draisienne) sans gêner les autres voyageurs.' },
      { _type:'object', _key:'faq4', question:'La DYU D3F est-elle adaptée aux personnes de grande taille ?', answer:'La DYU D3F est conçue pour les personnes de 1,50 m à 1,80 m environ. Sa selle et son guidon sont réglables sur une certaine plage. Pour les personnes de plus de 1,80 m, la position de conduite peut sembler un peu comprimée. Dans ce cas, la DYU A5 (roues plus grandes, guidon plus haut) est plus adaptée.' },
      { _type:'object', _key:'faq5', question:'DYU D3F ou DYU A5 : laquelle choisir ?', answer:'Choisissez la D3F si vous avez besoin de la plier régulièrement (transports en commun, voiture) et si vos trajets ne dépassent pas 15 km. La A5 est préférable si vous roulez plus de 20 km par charge, si vous rencontrez des revêtements irréguliers (ses suspensions font une vraie différence) ou si vous pesez plus de 80 kg.' }
    ]
  },
  {
    id: 'post-loi-draisienne-electrique-2026',
    seoTitle: 'Loi draisienne électrique 2026 : tout ce qu\'il faut savoir',
    keyTakeaways: [
      'Classées cyclomobiles légers (L1e-B) depuis le décret n°2022-31 du 14 janvier 2022',
      'Âge minimum légal sur voie publique : 14 ans depuis le décret n°2023-848 du 31 août 2023',
      'Vitesse bridée 25 km/h, moteur ≤ 350 W, poids < 30 kg — critères cumulatifs obligatoires',
      'Assurance RC obligatoire — pas de carte grise, pas d\'immatriculation requises',
      'Amendes : 35 € (trottoir) à 1 500 € pour un engin non homologué sur voie publique'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle est la loi applicable aux draisiennes électriques en 2026 ?', answer:'En 2026, les draisiennes électriques sont régies par le décret n°2022-31 du 14 janvier 2022 (création de la catégorie cyclomobile léger L1e-B) et le décret n°2023-848 du 31 août 2023 (relèvement de l\'âge minimum à 14 ans). Aucune nouvelle loi spécifique n\'est entrée en vigueur en 2026 — ce cadre juridique reste celui applicable.' },
      { _type:'object', _key:'faq2', question:'Où peut-on circuler avec une draisienne électrique en 2026 ?', answer:'Les cyclomobiles légers sont autorisés sur les pistes et bandes cyclables (priorité), les chaussées limitées à 50 km/h en agglomération (en l\'absence de piste cyclable), et les voies vertes hors agglomération. Les trottoirs, les autoroutes et les routes dépassant 50 km/h hors agglo sont interdits.' },
      { _type:'object', _key:'faq3', question:'Le casque est-il obligatoire pour conduire une draisienne électrique en 2026 ?', answer:'En 2026, le casque est obligatoire hors agglomération (un casque de vélo suffit) et fortement recommandé en ville. Il n\'est pas encore légalement obligatoire en agglomération sur les voies à 50 km/h, mais une proposition de loi en cours d\'examen parlementaire pourrait le rendre obligatoire partout dans les prochains mois.' },
      { _type:'object', _key:'faq4', question:'Quelles sont les amendes pour non-respect de la loi draisienne électrique ?', answer:'Les infractions de 2e classe (35 €) concernent le trottoir, l\'absence d\'éclairage ou la conduite à deux de front. Les infractions de 4e classe (135 €) visent la voie interdite, le transport de passager, l\'absence de casque hors agglo ou le mineur de moins de 14 ans sur voie publique. Un engin non homologué expose à une amende jusqu\'à 1 500 €.' },
      { _type:'object', _key:'faq5', question:'Quoi de neuf en 2026 concernant la réglementation des draisiennes électriques ?', answer:'Aucune nouvelle loi spécifique aux cyclomobiles légers n\'est entrée en vigueur en 2026. Deux évolutions sont à surveiller : la proposition de loi sur l\'obligation du casque en agglomération (déposée sept. 2025) et les discussions d\'harmonisation européenne sur la catégorie L1e-B (horizon 2026-2027). Pour l\'heure, le cadre de 2022-2023 s\'applique.' }
    ]
  }
];

for (const a of articles) {
  try {
    const r = await client.patch(a.id).set({ seoTitle: a.seoTitle, keyTakeaways: a.keyTakeaways, faq: a.faq }).commit({ returnDocuments: true });
    console.log('✅', a.seoTitle, '| TL;DR:', r.keyTakeaways?.length, '| FAQ:', r.faq?.length);
  } catch(e) { console.error('❌', a.id, e.message); }
}
