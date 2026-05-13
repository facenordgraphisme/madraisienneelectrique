import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const env = Object.fromEntries(readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>l.split('=').map(s=>s.trim())));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-05-06', token: env.SANITY_API_TOKEN, useCdn: false });

const articles = [
  {
    id: 'post-wp-les-meilleures-draisiennes-electriques-p',
    seoTitle: 'Meilleures draisiennes électriques adultes à moins de 500 €',
    keyTakeaways: [
      'Sélection de 6 modèles homologués L1e-B sous 500 € testés et comparés en conditions réelles',
      'Coup de cœur rédaction : DYU A5 — suspensions, 40 km réels, moteur 250 W, moins de 550 €',
      'Autonomie réelle des modèles sous 500 € : entre 25 et 40 km selon le poids et le terrain',
      'Critère non négociable : vérifiez l\'homologation L1e-B avant tout achat sous 500 €',
      'Budget 300-500 € : bon rapport qualité/prix possible — méfiez-vous des offres sous 300 €'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Peut-on trouver une bonne draisienne électrique adulte à moins de 500 € ?', answer:'Oui. Notre sélection 2026 comprend 6 modèles homologués sous 500 €, dont la DYU A5 (notre coup de cœur) et plusieurs modèles UrbanGlide. Ces draisiennes offrent une autonomie réelle de 25 à 40 km, ce qui couvre largement les besoins d\'usage urbain quotidien.' },
      { _type:'object', _key:'faq2', question:'Quels sont les risques d\'acheter une draisienne bon marché (sous 300 €) ?', answer:'Les modèles sous 300 € vendus sur des plateformes asiatiques sont rarement homologués L1e-B et donc interdits sur la voie publique. Les batteries sont souvent de mauvaise qualité (risque d\'incendie), le SAV inexistant et les pièces détachées introuvables. Préférez un modèle de marque reconnue, même reconditionné.' },
      { _type:'object', _key:'faq3', question:'La DYU A5 est-elle vraiment le meilleur rapport qualité/prix sous 500 € ?', answer:'C\'est notre recommandation principale dans cette gamme de prix. La DYU A5 propose des suspensions avant/arrière (rare sous 600 €), une autonomie réelle de 35 à 45 km, un moteur 250 W et une finition solide. Son prix de vente constaté tourne autour de 480-550 €, légèrement au-dessus des 500 €, mais le rapport qualité/prix est imbattable.' },
      { _type:'object', _key:'faq4', question:'Les draisiennes à moins de 500 € sont-elles adaptées aux adultes lourds (> 85 kg) ?', answer:'La plupart des modèles sous 500 € supportent 100 kg maximum avec un moteur de 250 W. Pour les conducteurs de plus de 85 kg, l\'autonomie sera réduite de 20 à 30 % et les performances en côte limitées. Un budget de 600-800 € pour un moteur 350 W est plus adapté si vous dépassez 85 kg.' },
      { _type:'object', _key:'faq5', question:'Faut-il acheter neuf ou d\'occasion pour une draisienne à moins de 500 € ?', answer:'Les deux options sont valables. En neuf, vous bénéficiez de la garantie légale de 2 ans et d\'un engin en parfait état. En occasion, vous pouvez obtenir un modèle à 600-800 € (plus robuste) pour moins de 500 €, à condition de bien vérifier l\'état de la batterie et l\'homologation L1e-B.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-50-km-h-est-ce-vra',
    seoTitle: 'Draisienne électrique 50 km/h : légal ou dangereux en France ?',
    keyTakeaways: [
      'La limite légale pour les cyclomobiles légers est de 25 km/h — une draisienne à 50 km/h est illégale',
      'Un engin dépassant 25 km/h relève de la catégorie cyclomoteur : permis AM, immatriculation et assurance renforcée',
      'Débridé à 50 km/h sur voie publique : amende jusqu\'à 1 500 € + confiscation possible du véhicule',
      'Les "draisiennes 50 km/h" vendues en ligne sont souvent non homologuées — risque pénal et sécuritaire',
      'Alternative légale : certains modèles 45 km/h existent mais requièrent permis et équipements moto'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Peut-on acheter une draisienne électrique capable de rouler à 50 km/h en France ?', answer:'Oui, on peut acheter ce type d\'engin, mais pas l\'utiliser légalement sur la voie publique comme cyclomobile léger. Au-delà de 25 km/h par construction, l\'engin est classé cyclomoteur, ce qui implique un permis AM, une immatriculation, un casque de moto et une assurance spécifique.' },
      { _type:'object', _key:'faq2', question:'Que risque-t-on si l\'on circule avec une draisienne débridée à 50 km/h ?', answer:'Les sanctions sont sévères : amende jusqu\'à 1 500 € (contravention de 5e classe), confiscation possible de l\'engin, et responsabilité civile totale en cas d\'accident puisque l\'engin n\'est pas homologué. En cas de blessure d\'un tiers, les poursuites pénales pour mise en danger d\'autrui sont également possibles.' },
      { _type:'object', _key:'faq3', question:'Existe-t-il des draisiennes électriques légales rapides en France ?', answer:'Il existe des véhicules à selle électriques pouvant atteindre 45 km/h, mais ils entrent dans la catégorie des cyclomoteurs (L1e-A ou L3e). Ils nécessitent un permis AM (ancien BSR), une immatriculation, un casque de moto et une assurance spécifique. Ce ne sont plus des cyclomobiles légers.' },
      { _type:'object', _key:'faq4', question:'Peut-on débridre légalement une draisienne électrique ?', answer:'Non. Débridre un cyclomobile léger le fait sortir de sa catégorie légale. Le modification volontaire du limiteur de vitesse est illégale et entraîne l\'interdiction de circulation sur voie publique. Votre assurance peut également refuser de vous couvrir en cas de sinistre si l\'engin a été modifié.' },
      { _type:'object', _key:'faq5', question:'Pourquoi trouve-t-on des draisiennes 50 km/h sur Amazon et AliExpress ?', answer:'Ces modèles sont souvent des importations asiatiques non conformes aux réglementations européennes. Ils peuvent être achetés légalement en France mais ne peuvent pas circuler sur la voie publique. Les vendeurs n\'ont pas d\'obligation d\'informer l\'acheteur des restrictions légales locales. Lisez toujours les spécifications techniques avant achat.' }
    ]
  },
  {
    id: 'post-wp-test-complet-draisienne-electrique-ktm-s',
    seoTitle: 'Test KTM STACYC SX-E 1.20 : la draisienne enfant premium',
    keyTakeaways: [
      'Conçue pour les enfants de 3 à 5 ans : selle réglable de 35 à 39 cm, poids 3,6 kg',
      'Moteur 100 W bridé à 12 km/h, batterie 20,4 Wh — autonomie réelle : 30 à 45 minutes',
      'Points forts : robustesse KTM, qualité de fabrication premium, facilité de prise en main',
      'Points faibles : prix élevé (250-350 €), autonomie courte, uniquement pour propriété privée (< 14 ans)',
      'Note de la rédaction : 5/5 pour les parents qui veulent le meilleur — sans compromis sur la qualité'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'À quel âge un enfant peut-il utiliser la KTM STACYC SX-E 1.20 ?', answer:'La KTM STACYC SX-E 1.20 est conçue pour les enfants de 3 à 5 ans avec une hauteur de selle réglable de 35 à 39 cm. L\'enfant doit pouvoir poser les pieds à plat au sol. Rappelons que la voie publique est interdite avant 14 ans — ce modèle est destiné à un usage en propriété privée ou sur circuit.' },
      { _type:'object', _key:'faq2', question:'Quelle est la durée de la batterie sur la KTM STACYC SX-E 1.20 ?', answer:'Avec sa batterie de 20,4 Wh, la KTM STACYC offre 30 à 45 minutes d\'autonomie en usage continu, soit environ 2 à 3 sessions de jeu de 15 minutes. Le temps de recharge est d\'environ 1h30. Pour des sessions plus longues, une deuxième batterie (vendue séparément) est une option intéressante.' },
      { _type:'object', _key:'faq3', question:'La KTM STACYC SX-E 1.20 est-elle dangereuse pour un enfant de 3 ans ?', answer:'Non, elle est conçue pour la sécurité. Bridée à 12 km/h, elle est moins rapide qu\'un vélo d\'enfant. La position assise basse et le poids léger (3,6 kg) facilitent la mise pied à terre. Comme pour tout engin motorisé, un casque et des protections (genouillères, coudières) sont indispensables.' },
      { _type:'object', _key:'faq4', question:'La KTM STACYC SX-E 1.20 vaut-elle son prix élevé ?', answer:'Pour les parents soucieux de la qualité et de la durabilité, oui. KTM est une marque de référence en motocross et la STACYC bénéficie de leur expertise en termes de robustesse et de sécurité. Sa valeur de revente est également élevée — comptez 60-70 % du prix neuf après 2 ans d\'usage en bon état.' },
      { _type:'object', _key:'faq5', question:'Comment entretenir la KTM STACYC SX-E 1.20 ?', answer:'L\'entretien est minimal : vérification mensuelle de la pression des pneus, nettoyage après chaque session avec un chiffon humide (pas de jet d\'eau direct sur les composants électriques), et rangement en intérieur avec la batterie chargée à 50-60 % si inutilisée plus d\'un mois. Le constructeur recommande un contrôle annuel chez un distributeur agréé.' }
    ]
  },
  {
    id: 'post-wp-test-complet-kukirin-c1-pro-mon-avis-apr',
    seoTitle: 'Test KuKirin C1 Pro : avis après 3 semaines d\'utilisation',
    keyTakeaways: [
      'Moteur 350 W, autonomie annoncée 40 km — autonomie réelle constatée : 32 à 38 km',
      'Points forts : double suspension, freins hydrauliques, afficheur couleur, rapport qualité/prix',
      'Points faibles : poids 23 kg (lourd pour son gabarit), SAV asiatique moins réactif qu\'une marque française',
      'Note de la rédaction : 4/5 — excellente alternative aux marques européennes pour le prix',
      'Prix constaté : 450-550 € — concurrence directe avec l\'UrbanGlide Bike 160 et la DYU A5'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quelle est l\'autonomie réelle du KuKirin C1 Pro ?', answer:'Le KuKirin C1 Pro affiche 40 km d\'autonomie théorique. En conditions réelles (conducteur 75 kg, terrain mixte, mode normal), nous avons mesuré 32 à 38 km. En mode économique sur terrain plat, on s\'approche des 40 km annoncés. C\'est l\'une des meilleures autonomies réelles dans sa gamme de prix.' },
      { _type:'object', _key:'faq2', question:'Le KuKirin C1 Pro est-il homologué pour circuler sur la voie publique en France ?', answer:'Oui, le KuKirin C1 Pro est certifié L1e-B (cyclomobile léger) et peut circuler légalement sur les pistes cyclables et les chaussées à 50 km/h maximum. Son moteur 350 W est bridé à 25 km/h. Vérifiez que votre exemplaire dispose bien du certificat de conformité européen à la livraison.' },
      { _type:'object', _key:'faq3', question:'Les freins hydrauliques du KuKirin C1 Pro font-ils la différence ?', answer:'Oui, nettement. Les freins hydrauliques offrent une puissance de freinage supérieure aux freins mécaniques classiques, surtout par temps humide. Le freinage est progressif et précis, ce qui améliore la sécurité en ville. C\'est une caractéristique rare dans cette gamme de prix, habituellement réservée aux modèles premium.' },
      { _type:'object', _key:'faq4', question:'Le SAV KuKirin est-il disponible en France ?', answer:'KuKirin est une marque chinoise avec un support en Europe principalement via Amazon et des revendeurs agréés. Le SAV est moins réactif qu\'une marque française comme UrbanGlide. La garantie légale de 2 ans s\'applique si acheté chez un revendeur établi en Europe. Pour les pièces détachées, comptez 2 à 4 semaines de délai.' },
      { _type:'object', _key:'faq5', question:'KuKirin C1 Pro ou UrbanGlide Bike 160 : lequel choisir ?', answer:'Les deux sont d\'excellents choix à budget similaire (450-600 €). Le KuKirin C1 Pro se distingue par ses freins hydrauliques et ses suspensions. L\'UrbanGlide Bike 160 offre un SAV français plus réactif et une marque plus connue en France. Si le SAV est prioritaire pour vous, optez pour l\'UrbanGlide ; pour les performances pures, le KuKirin.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-adulte-kukirin-g2-',
    seoTitle: 'Test KuKirin G2 Pro : draisienne électrique adulte puissante',
    keyTakeaways: [
      'Moteur 500 W (hors catégorie L1e-B) — le G2 Pro est classé cyclomoteur, pas cyclomobile léger',
      'Autonomie annoncée 60 km — autonomie réelle constatée : 45 à 55 km selon usage',
      'Points forts : puissance exceptionnelle, autonomie leader, double suspension performante',
      'Attention légale : avec 500 W et vitesse > 25 km/h, nécessite permis AM et immatriculation',
      'Idéal pour usage hors-route ou propriété privée — sur voie publique, il faut le permis AM'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Le KuKirin G2 Pro nécessite-t-il un permis pour rouler en France ?', answer:'Oui, si vous roulez sur la voie publique. Avec son moteur de 500 W et sa vitesse supérieure à 25 km/h, le G2 Pro dépasse les critères du cyclomobile léger (L1e-B). Il est classé cyclomoteur, ce qui requiert un permis AM (ancien BSR), une immatriculation et une assurance spécifique.' },
      { _type:'object', _key:'faq2', question:'Quelle est l\'autonomie réelle du KuKirin G2 Pro ?', answer:'Le KuKirin G2 Pro affiche 60 km d\'autonomie théorique. En conditions réelles (conducteur 80 kg, terrain varié, mode normal), nous avons mesuré entre 45 et 55 km. C\'est l\'une des meilleures autonomies du marché dans la catégorie des engins à selle électriques puissants.' },
      { _type:'object', _key:'faq3', question:'Peut-on utiliser le KuKirin G2 Pro en mode limité à 25 km/h pour éviter le permis ?', answer:'Certains modèles proposent un mode bridé à 25 km/h dans les réglages. Cependant, si le moteur est techniquement capable de dépasser 25 km/h, l\'engin reste classé cyclomoteur au regard de la loi, indépendamment du mode sélectionné. La limitation électronique seule ne suffit pas à le reclasser en cyclomobile léger.' },
      { _type:'object', _key:'faq4', question:'Le KuKirin G2 Pro est-il adapté à une utilisation en tout-terrain ?', answer:'Oui, c\'est l\'un de ses points forts. Ses doubles suspensions hydrauliques et sa puissance de 500 W le rendent capable de gérer des sentiers, chemins de terre et surfaces irrégulières. Pour un usage hors-route en propriété privée, c\'est une excellente option sans contrainte légale de permis.' },
      { _type:'object', _key:'faq5', question:'Combien coûte le KuKirin G2 Pro et où l\'acheter ?', answer:'Le KuKirin G2 Pro est disponible entre 700 et 900 € selon les promotions. On le trouve principalement sur Amazon (vendeur officiel KuKirin), Cdiscount et des revendeurs spécialisés. Achetez toujours chez un vendeur établi en Europe pour bénéficier de la garantie légale de 2 ans.' }
    ]
  }
];

for (const a of articles) {
  try {
    const r = await client.patch(a.id).set({ seoTitle: a.seoTitle, keyTakeaways: a.keyTakeaways, faq: a.faq }).commit({ returnDocuments: true });
    console.log('✅', a.seoTitle, '| TL;DR:', r.keyTakeaways?.length, '| FAQ:', r.faq?.length);
  } catch(e) { console.error('❌', a.id, e.message); }
}
