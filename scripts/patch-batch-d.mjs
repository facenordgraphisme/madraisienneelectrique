import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const env = Object.fromEntries(readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>l.split('=').map(s=>s.trim())));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-05-06', token: env.SANITY_API_TOKEN, useCdn: false });

const articles = [
  {
    id: 'post-wp-nettoyer-sa-draisienne-electrique-sans-l',
    seoTitle: 'Nettoyer sa draisienne électrique sans l\'abîmer : guide',
    keyTakeaways: [
      'Ne jamais utiliser de jet d\'eau haute pression — les composants électriques ne sont pas étanches',
      'Outil idéal : chiffon microfibre humide + brosse douce pour les zones difficiles d\'accès',
      'Produits interdits : alcool pur, solvants, acide — ils dégradent les plastiques et les joints',
      'Fréquence recommandée : nettoyage rapide après chaque utilisation par temps de pluie, complet tous les mois',
      'Lubrifier la chaîne (si présente) et les axes après chaque lavage pour prévenir la rouille'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Peut-on nettoyer une draisienne électrique avec un jet d\'eau ?', answer:'Non. La grande majorité des draisiennes électriques ne sont pas étanches (indice IP54 au mieux). Un jet d\'eau haute pression peut infiltrer l\'eau dans le moteur, le contrôleur ou la batterie et provoquer des courts-circuits. Utilisez un chiffon humide ou une éponge, en évitant le guidon et les prises de charge.' },
      { _type:'object', _key:'faq2', question:'Quels produits utiliser pour nettoyer une draisienne électrique ?', answer:'Privilégiez l\'eau savonneuse (liquide vaisselle dilué) et un chiffon microfibre. Un spray nettoyant multiusages doux peut être utilisé sur le cadre. Évitez l\'alcool pur, les solvants (white-spirit, acétone) et les produits acides qui dégradent les plastiques et les revêtements. Pour les contacts électriques, utilisez un spray contact sec.' },
      { _type:'object', _key:'faq3', question:'Faut-il retirer la batterie avant de nettoyer une draisienne électrique ?', answer:'Oui, c\'est fortement recommandé. Retirez la batterie avant tout nettoyage humide pour éviter tout risque de court-circuit. Attendez que l\'engin soit complètement sec avant de la remettre en place. Pour le nettoyage à sec (dépoussiérage), retirer la batterie n\'est pas obligatoire mais reste une bonne pratique.' },
      { _type:'object', _key:'faq4', question:'Comment nettoyer les contacts électriques d\'une draisienne ?', answer:'Utilisez un spray de protection contacts électroniques (type WD-40 Electrique ou CRC Contact Cleaner) disponible en grande surface de bricolage. Appliquez une légère pression sur les contacts, laissez agir 30 secondes et essuyez avec un coton-tige. Réalisez cette opération 2 à 4 fois par an pour prévenir les oxydations.' },
      { _type:'object', _key:'faq5', question:'Comment protéger sa draisienne électrique contre la pluie ?', answer:'Investissez dans une housse de protection imperméable adaptée (15-30 €) pour le stockage extérieur. En déplacement, vous pouvez rouler sous une pluie légère si votre modèle est IP54 ou mieux, mais évitez les pluies torrentielles et les flaques profondes. Séchez toujours l\'engin après une sortie sous la pluie avant de le ranger.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-vs-skate-electriqu',
    seoTitle: 'Draisienne vs skate électrique : lequel choisir en 2026 ?',
    keyTakeaways: [
      'Draisienne électrique = selle + stabilité + confort — idéale pour les trajets > 5 km en ville',
      'Skate électrique = sensation, liberté, compact — parfait pour les courtes distances et le fun',
      'Prix similaires : bons modèles dès 300-600 € dans les deux catégories',
      'Sécurité : la draisienne est plus accessible aux débutants grâce à sa position assise',
      'Légalement : deux catégories distinctes — draisienne = cyclomobile léger L1e-B ; skate = EDPM'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Draisienne ou skate électrique : lequel est plus adapté pour les déplacements quotidiens ?', answer:'La draisienne électrique est plus adaptée aux trajets quotidiens domicile-travail : plus confortable sur longue durée, plus stable et avec une meilleure autonomie. Le skate électrique convient mieux aux courtes distances (< 5 km) et aux utilisateurs recherchant des sensations et de la maniabilité en zone dense.' },
      { _type:'object', _key:'faq2', question:'Le skate électrique est-il plus difficile à maîtriser qu\'une draisienne ?', answer:'Oui, significativement. Le skate électrique requiert de l\'équilibre et un temps d\'apprentissage de plusieurs heures à plusieurs jours selon la personne. La draisienne électrique, avec sa selle et ses deux roues stables, est accessible à quasiment tout le monde dès la première utilisation, y compris les personnes âgées ou moins agiles.' },
      { _type:'object', _key:'faq3', question:'Quelle est la réglementation du skate électrique en France ?', answer:'Le skate électrique est classé EDPM (engin de déplacement personnel motorisé) comme la trottinette électrique. Il est autorisé sur les pistes cyclables et les chaussées à 50 km/h en agglomération, avec une limite de 25 km/h. Le casque est obligatoire hors agglomération. Les règles sont similaires à celles de la draisienne électrique.' },
      { _type:'object', _key:'faq4', question:'Quel budget prévoir pour un bon skate électrique en 2026 ?', answer:'Un skate électrique de qualité coûte entre 300 et 800 €. Les modèles entrée de gamme (300-400 €) offrent 15 à 20 km d\'autonomie et des vitesses de 25-30 km/h. Les modèles premium (600-800 €) proposent 25 à 40 km d\'autonomie, plus de puissance et de meilleures suspensions. Boosted et Evolve sont des références du marché.' },
      { _type:'object', _key:'faq5', question:'Peut-on utiliser un skate électrique par temps de pluie ?', answer:'La plupart des skates électriques ont un indice d\'étanchéité limité (IP54 ou moins) et ne sont pas conçus pour une utilisation sous la pluie. L\'eau peut endommager la batterie, les moteurs et les roulements. Certains modèles premium sont IP65 et supportent la pluie légère. La draisienne électrique est généralement plus robuste dans ces conditions.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-ktm-le-guide-compl',
    seoTitle: 'Draisiennes KTM STACYC 2026 : guide complet de la gamme',
    keyTakeaways: [
      'KTM STACYC propose 4 modèles : SX-E 1.20 (3-5 ans), SX-E 1.3 (4-7 ans), 12eDrive et 16eDrive',
      'Qualité et robustesse motocross KTM transposées aux draisiennes électriques pour enfants',
      'Autonomie : 30 à 75 minutes selon le modèle et l\'utilisation — recharge en 1h à 2h',
      'Disponibles chez les concessionnaires KTM en France — SAV professionnel et pièces détachées garanties',
      'Prix : 250-600 € selon le modèle — le premium du marché des draisiennes électriques pour enfants'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Quels modèles KTM STACYC sont disponibles en France ?', answer:'KTM propose 4 modèles STACYC en France : le SX-E 1.20 (3-5 ans, 12 km/h), le SX-E 1.3 (4-7 ans, 16 km/h), le 12eDrive (5-8 ans) et le 16eDrive (6-10 ans). Chaque modèle est adapté à une tranche d\'âge et de taille spécifique. Ils sont disponibles chez les concessionnaires KTM agréés.' },
      { _type:'object', _key:'faq2', question:'Les draisiennes KTM STACYC peuvent-elles être utilisées hors-route ?', answer:'Oui, c\'est précisément leur point fort. Conçues avec l\'ADN de la motocross KTM, les STACYC sont robustes et performantes sur les surfaces non bitumées : herbe, gravier, petits chemins de terre. Elles sont idéales pour un usage en jardin, terrain de motocross adapté ou propriété privée avec terrain varié.' },
      { _type:'object', _key:'faq3', question:'Où acheter une draisienne KTM STACYC en France ?', answer:'Les draisiennes KTM STACYC sont disponibles exclusivement chez les concessionnaires KTM agréés en France (plus de 200 points de vente). Vous pouvez localiser le concessionnaire le plus proche sur ktm.com. Certains revendeurs spécialisés motocross les vendent également en ligne, avec les mêmes garanties constructeur.' },
      { _type:'object', _key:'faq4', question:'Quelle est la durée de garantie des draisiennes KTM STACYC ?', answer:'Les draisiennes KTM STACYC bénéficient de la garantie légale de 2 ans applicable en France, en plus de la garantie constructeur KTM. Le réseau de concessionnaires agréés assure le SAV et la disponibilité des pièces détachées, ce qui est un avantage majeur par rapport aux marques sans réseau physique en France.' },
      { _type:'object', _key:'faq5', question:'La KTM STACYC vaut-elle son prix par rapport aux concurrents moins chers ?', answer:'Pour les parents qui privilégient la durabilité et le plaisir de conduite, oui. La qualité des composants KTM (cadre, fourche, batterie) est supérieure aux modèles entrée de gamme. De plus, la valeur de revente est excellente : une STACYC en bon état se revend 65-75 % de son prix neuf, contre 40-50 % pour les marques moins connues.' }
    ]
  },
  {
    id: 'post-wp-changer-une-chambre-a-air-ou-un-pneu-sur',
    seoTitle: 'Changer pneu ou chambre à air sur draisienne électrique',
    keyTakeaways: [
      'Une crevaison se répare en 20 à 45 minutes avec les bons outils — sans aller chez un réparateur',
      'Outils nécessaires : démonte-pneus, clés Allen, rustines (ou chambre neuve) et une pompe',
      'Coût chambre à air de remplacement : 5 à 15 € selon le diamètre (10\', 12\', 14\', 16\' ou 20\')',
      'Coût pneu complet de remplacement : 15 à 40 € — à changer si le flanc est fissuré ou la bande usée',
      'Attention au moteur-roue : ne jamais démonter la roue arrière sans déconnecter le câble moteur'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Comment changer une chambre à air sur une draisienne électrique ?', answer:'Dégonflez complètement, retirez l\'axe de roue (clé Allen ou clé plate selon le modèle), démontez le pneu avec des démonte-pneus plastiques, extrayez la chambre percée, installez la nouvelle chambre légèrement gonflée pour lui donner sa forme, remontez le pneu en prenant garde de ne pas pincer la chambre, regonflez à la pression recommandée.' },
      { _type:'object', _key:'faq2', question:'Peut-on réparer une chambre à air plutôt que de la remplacer ?', answer:'Oui, une rustine colle suffisamment bien pour une chambre peu endommagée. Séchez la zone percée, poncez légèrement, appliquez la colle, attendez qu\'elle devienne collante (1-2 min), posez la rustine et exercez une pression ferme pendant 2 minutes. Une chambre réparée peut durer plusieurs mois si la crevaison est petite.' },
      { _type:'object', _key:'faq3', question:'Comment savoir si le pneu doit être remplacé (et pas seulement la chambre) ?', answer:'Remplacez le pneu si : la bande de roulement est usée jusqu\'aux témoins d\'usure, si les flancs présentent des craquelures ou des coupures profondes, ou si le pneu a subi plusieurs crevaisons au même endroit (objet incrusté). Un pneu en mauvais état augmente le risque de crevaison et diminue la stabilité.' },
      { _type:'object', _key:'faq4', question:'La roue arrière (moteur-roue) est-elle plus difficile à changer ?', answer:'Oui. La roue arrière d\'une draisienne électrique intègre souvent le moteur électrique (moteur-roue ou hub motor). Avant tout démontage, débranchez impérativement le câble moteur. Le remontage doit être réalisé avec précaution pour ne pas endommager les fils ou mal positionner le frein. En cas de doute, faites-le faire par un technicien.' },
      { _type:'object', _key:'faq5', question:'Où trouver des pneus et chambres à air pour draisienne électrique ?', answer:'Pour les marques courantes (UrbanGlide, DYU, Wispeed), les pièces sont disponibles sur Amazon, dans les magasins de sport et cycles, et chez les revendeurs officiels. Pour les marques moins connues, commandez auprès du fabricant ou sur les sites spécialisés EDPM. Notez le diamètre (pouces) et la largeur de votre pneu avant de commander.' }
    ]
  },
  {
    id: 'post-wp-draisienne-electrique-en-zone-rurale',
    seoTitle: 'Draisienne électrique en zone rurale : bonne idée en 2026 ?',
    keyTakeaways: [
      'La draisienne électrique est adaptée aux zones rurales avec des routes plates et des pistes cyclables',
      'Défi principal : l\'autonomie — préférez un modèle > 40 km réels pour les trajets interurbains',
      'Routes hors agglomération > 50 km/h : interdites aux draisiennes — vérifiez les voies disponibles',
      'Le réseau de pistes cyclables rurales s\'étend — vérifiez les voies vertes près de chez vous (voievertesfrance.fr)',
      'Entretien facilité en milieu rural : moins d\'arrêts fréquents mais terrain potentiellement plus exigeant'
    ],
    faq: [
      { _type:'object', _key:'faq1', question:'Peut-on utiliser une draisienne électrique en zone rurale en France ?', answer:'Oui, à condition de respecter les zones de circulation autorisées. Les voies vertes, pistes cyclables et routes limitées à 50 km/h dans les bourgs sont accessibles. En revanche, les routes départementales et nationales (généralement > 50 km/h) sont interdites aux cyclomobiles légers hors agglomération.' },
      { _type:'object', _key:'faq2', question:'Quelle autonomie faut-il pour utiliser une draisienne en milieu rural ?', answer:'En zone rurale, les distances entre les points d\'intérêt sont plus importantes. Visez une autonomie réelle d\'au moins 40 km pour des trajets confortables sans angoisse de panne. Les modèles comme la Wispeed Wimob 20 (40-50 km réels) ou le KuKirin C1 Pro (32-38 km réels) sont bien adaptés.' },
      { _type:'object', _key:'faq3', question:'Où peut-on recharger une draisienne électrique en zone rurale ?', answer:'La recharge se fait principalement à domicile (prise secteur standard, 2 à 6h selon la batterie). En déplacement, certaines mairies, aires de camping-car et commerces disposent de prises 220V accessibles. Planifiez vos trajets en fonction des points de recharge disponibles et emportez le câble de charge original.' },
      { _type:'object', _key:'faq4', question:'La draisienne électrique est-elle adaptée aux chemins de terre en campagne ?', answer:'Les modèles avec suspensions (DYU A5, KuKirin C1 Pro, Wispeed Wimob 20) gèrent correctement les chemins de gravier et les petits sentiers. Les modèles sans suspensions sont inconfortables sur revêtements irréguliers et risquent d\'endommager la batterie. Pour un usage intensif hors-route, préférez un modèle spécifiquement conçu pour ce terrain.' },
      { _type:'object', _key:'faq5', question:'Y a-t-il des voies vertes accessibles aux draisiennes électriques en France ?', answer:'Oui, la France dispose de plus de 7 000 km de voies vertes (pistes réservées aux modes doux) accessibles aux cyclomobiles légers. Des itinéraires comme la Loire à Vélo, la Vélodyssée ou les voies de la Scandibérique traversent des zones rurales. Consultez voievertesfrance.fr pour planifier vos itinéraires.' }
    ]
  }
];

for (const a of articles) {
  try {
    const r = await client.patch(a.id).set({ seoTitle: a.seoTitle, keyTakeaways: a.keyTakeaways, faq: a.faq }).commit({ returnDocuments: true });
    console.log('✅', a.seoTitle, '| TL;DR:', r.keyTakeaways?.length, '| FAQ:', r.faq?.length);
  } catch(e) { console.error('❌', a.id, e.message); }
}
