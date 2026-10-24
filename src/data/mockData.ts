import { GlobalClass, MembershipApplication, NewsItem, ProgramAction } from '../types';

export const OFFICIAL_PCI_INFO = {
  name: 'Pionnier Club International (PCI)',
  subName: 'Association Les Pionniers de la Famille Nouvelle',
  slogan: 'Un réseau fondé sur le leadership, la fraternité, la solidarité et le développement partagé.',
  shortMission: 'Le club service qui construit la famille et forme des leaders engagés pour une société équilibrée.',
  phone: '+225 0500671912',
  phoneDisplay: '+225 05 00 67 19 12',
  whatsappUrl: 'https://wa.me/2250500671912?text=Bonjour%20Pionnier%20Club%20International,%20je%20souhaite%20obtenir%20des%20informations%20sur%20les%20adh%C3%A9sions.',
  email: 'Pionnierclub.international@gmail.com',
  website: 'www.pionnierclubinternational.com',
  location: 'Abidjan, Côte d’Ivoire · Bureau International & Bureau National',
  membershipFeeAnnual: 10000,
  membershipFeeCurrency: 'FCFA',
  ageRange: '21 à 77 ans',
  classStandardSize: 24,
  sessionsPerYear: 20,
  sessionCadence: 'Tous les 15 jours, les samedis uniquement (4 heures par séance)',
  distinctiveModel: 'ONG de culture à but d’éducation (différente des ONG caritatives), sous la forme de Club-Service (type Lion’s Club & Rotary Club).',
};

export const PIONEER_CREED = [
  {
    id: 1,
    title: 'Développement Personnel & Leadership',
    text: 'Je souhaite mon développement personnel par le développement de mon leadership.',
    icon: 'Compass',
  },
  {
    id: 2,
    title: 'Impact Positif sur ma Famille',
    text: 'Je souhaite impacter positivement ma famille et stabiliser mon foyer.',
    icon: 'Heart',
  },
  {
    id: 3,
    title: 'Création de Revenus Passifs',
    text: 'Je veux développer des revenus passifs par la mutualisation et les clubs d’investissement.',
    icon: 'TrendingUp',
  },
  {
    id: 4,
    title: 'Amitiés Fiables & Sensibilité Mutuelle',
    text: 'Je veux avoir des amitiés fiables et sensibles à mes problèmes réels.',
    icon: 'Users',
  },
  {
    id: 5,
    title: 'Briser l’Isolement & l’Égocentrisme',
    text: 'Je veux éviter l’isolement et l’égocentrisme destructeurs.',
    icon: 'ShieldCheck',
  },
  {
    id: 6,
    title: 'Force du Progrès Collectif',
    text: 'J’aime évoluer en groupe solidaire et avancer avec mes pairs.',
    icon: 'Sparkles',
  },
  {
    id: 7,
    title: 'Connaissance Identitaire & 5 Arbres',
    text: 'Je veux améliorer ma connaissance identitaire grâce aux Cinq Arbres du Leadership familial.',
    icon: 'BookOpen',
  },
  {
    id: 8,
    title: 'Réduction du Coût de la Vie',
    text: 'Je veux bénéficier des réductions substantielles négociées par l’organisation auprès des partenaires.',
    icon: 'CreditCard',
  },
];

export const OFFICIAL_PRESENTATION_CHAPTERS = [
  {
    id: 'chap-1',
    number: '01',
    title: 'Qui sommes-nous ?',
    subtitle: 'Nature & Identité du Club Service',
    points: [
      'Une ONG de culture à but d’éducation, fondamentalement différente des ONG à but purement caritatif.',
      'Un fonctionnement sous la forme d’un Club-Service d’excellence, à l’image du Lion’s Club et du Rotary Club.',
      'Une organisation constituée sous le régime du droit ivoirien.',
      'Un réseau appelé à s’étendre par des succursales dans les pays africains et à l’international.'
    ]
  },
  {
    id: 'chap-2',
    number: '02',
    title: 'Pourquoi nous existons ?',
    subtitle: 'Raison d’être & Vocation Sociale',
    points: [
      'Apporter aux populations un soulagement et un soutien tangible lorsqu’elles sont seules et désemparées.',
      'Offrir un appui, quel que soit l’âge, lorsque la personne ne bénéficie pas du soutien attendu d’une famille unie.',
      'Favoriser le développement personnel par l’éducation continue au leadership.',
      'Encourager l’enrichissement solidaire et le bien-être partagé.',
      'Créer un réseau de Pionniers fondé sur la convivialité, la fraternité et la solidarité.'
    ]
  },
  {
    id: 'chap-3',
    number: '03',
    title: 'À qui nous nous adressons ?',
    subtitle: 'Profil des Adhérents & Critères d’Entrée',
    points: [
      'À toutes les personnes, hommes ou femmes, majeures jusqu’à 77 ans.',
      'Savoir au moins lire et écrire de préférence.',
      'Être à même d’apporter ce que l’on possède : cotisations, conseils, expériences, connaissances ou expertise.',
      'Contribuer collectivement à la croissance et à l’exemplarité du réseau Pionnier Club.'
    ]
  },
  {
    id: 'chap-4',
    number: '04',
    title: 'Que fait-on dans une Globale-Classe ?',
    subtitle: 'Vie de Classe, Progression & Activités',
    points: [
      'Une classe compte au plus 24 personnes pour garantir la proximité fraternelle.',
      'Les rencontres ont lieu tous les quinze jours, le week-end, le samedi uniquement.',
      '20 séances par année ; l’assiduité permet d’obtenir des gratifications officielles et des grades supérieurs.',
      'Développer son leadership à travers la résolution de cas pratiques et thématiques familiales.',
      'Travailler avec ses pairs sur des problématiques familiales réelles et appliquer les acquis à l’extérieur.',
      'Participer au club d’investissement pour la création de richesse et l’enrichissement solidaire des membres.'
    ]
  },
  {
    id: 'chap-5',
    number: '05',
    title: 'Quel bénéfice pour les membres ?',
    subtitle: 'Retombées Humaines, Morales & Économiques',
    points: [
      'Trouver des solutions durables à leurs problèmes de bien-être social et identitaire.',
      'Se développer activement en créant de la richesse pour soi et sa famille.',
      'Pratiquer au quotidien la convivialité sincère et la solidarité de groupe.'
    ]
  },
  {
    id: 'chap-6',
    number: '06',
    title: 'Pourquoi 24 personnes par classe ?',
    subtitle: 'La Règle d’Or du Nombre d’Or Communautaire',
    points: [
      'Un format optimal : ni trop restreint pour stimuler la diversité, ni trop large pour éviter l’anonymat.',
      'Une proximité réelle et intime entre chaque membre de la classe.',
      'Une variété enrichissante de relations, de parcours professionnels et d’interactions humaines.',
      'Une certaine souplesse organisationnelle et une meilleure mobilité des membres et de la classe.'
    ]
  },
  {
    id: 'chap-7',
    number: '07',
    title: 'Pourquoi je suis Pionnier ?',
    subtitle: 'Le Manifeste des 8 Engagements du Membre',
    points: [
      'Je souhaite mon développement personnel par le développement de mon leadership.',
      'Je souhaite impacter positivement ma famille.',
      'Je veux développer des revenus passifs par l’investissement solidaire.',
      'Je veux avoir des amitiés fiables et sensibles à mes problèmes.',
      'Je veux éviter l’isolement et l’égocentrisme.',
      'J’aime évoluer en groupe.',
      'Je veux améliorer ma connaissance identitaire grâce aux cinq arbres du Leadership familial du Pionnier Club.',
      'Je veux bénéficier des réductions proposées par les partenaires de l’organisation aux membres.'
    ]
  }
];

export const INITIAL_PROGRAMS: ProgramAction[] = [
  {
    id: 'prog-1',
    title: 'Clubs d’Investissement Solidaire',
    category: 'Investissement Solidaire',
    description: 'Mécanisme structuré au sein des Globales Classes permettant l’épargne productive, le financement d’initiatives familiales et l’enrichissement solidaire des membres.',
    objectives: [
      'Encourager la mutualisation raisonnée des capacités financières',
      'Financer des micro-projets et initiatives d’auto-suffisance familiale',
      'Former à la gestion patrimoniale et à la rigueur budgétaire'
    ],
    realWorldImpact: 'Mise en place de fonds rotatifs fraternels et soutien aux membres dans la concrétisation de projets pérennes.',
    frequency: 'Cycle mensuel avec suivi bimensuel en classe',
    iconName: 'TrendingUp',
  },
  {
    id: 'prog-2',
    title: 'Les Cinq Arbres du Leadership Familial',
    category: 'Leadership Familial',
    description: 'Parcours éducatif et moral exclusif dispensé par exposés fraternels lors des réunions du samedi, destiné à stabiliser le foyer et restaurer des valeurs fondamentales.',
    objectives: [
      'Arbre de la Fraternité : écoute bienveillante et entraide inter-générations',
      'Arbre de la Solidarité : appui dans les épreuves et célébration des succès',
      'Arbre de la Fidélité : respect des engagements moraux et conjugaux',
      'Arbre de la Dignité : exemplarité citoyenne et tenue éthique',
      'Arbre de la Foi : espérance active, persévérance et transcendance'
    ],
    realWorldImpact: 'Renforcement de la cohésion des ménages et formation de tuteurs de valeurs au sein des communautés.',
    frequency: 'Séances bimensuelles régulières de 4h',
    iconName: 'ShieldCheck',
  },
  {
    id: 'prog-3',
    title: 'Carte Privilège & Réduction du Coût de la Vie',
    category: 'Économie & Pouvoir d’Achat',
    description: 'Dispositif conventionné offrant aux titulaires de la carte de membre PCI des avantages tarifaires auprès d’un réseau de partenaires économiques et sociaux.',
    objectives: [
      'Atténuer l’impact de l’inflation sur le panier des ménages adhérents',
      'Fédérer des partenariats avec commerces, cliniques, pharmacies et prestataires',
      'Créer un écosystème commercial éthique et solidaire'
    ],
    realWorldImpact: 'Réductions négociées de 5% à 25% sur les biens et services de première nécessité pour les familles membres.',
    frequency: 'Permanent avec la carte annuelle',
    iconName: 'CreditCard',
  },
  {
    id: 'prog-4',
    title: 'Solidarité d’Urgence & Présence Fraternelle',
    category: 'Action Communautaire',
    description: 'Système d’accompagnement moral et matériel des membres et de leurs familles lors des événements majeurs de la vie (naissances, mariages, deuils, aléas de santé).',
    objectives: [
      'Garantir qu’aucun pionnier ne soit isolé face aux vicissitudes de l’existence',
      'Organiser des visites de réconfort et une présence physique structurée',
      'Mobiliser une aide ponctuelle d’urgence en toute transparence'
    ],
    realWorldImpact: 'Soutien direct et constant délivré à l’échelle de chaque Globale Classe sous la supervision du délégué de classe.',
    frequency: 'Mobilisation à la demande',
    iconName: 'HeartHandshake',
  }
];

export const FIVE_TREES_VALUES = [
  {
    id: 'fraternite',
    name: 'Arbre de la Fraternité',
    subtitle: 'L’union sincère au-delà des différences',
    description: 'Considérer chaque membre comme un frère ou une sœur de cheminement. Développer une bienveillance active, bannir la calomnie et cultiver la joie de se retrouver.',
    quote: '« La fraternité n’est pas un vain mot, mais une pratique quotidienne qui console et relève. »',
    actionConcrete: 'Accueil des nouveaux arrivants, écoute fraternelle et partages de repas conviviaux lors des assemblées.',
    color: 'emerald'
  },
  {
    id: 'solidarite',
    name: 'Arbre de la Solidarité',
    subtitle: 'Le partage et l’assistance mutuelle',
    description: 'Mettre en commun nos forces morales, matérielles et intellectuelles pour soutenir le membre en difficulté et propulser celui qui entreprend.',
    quote: '« Ensemble, les fardeaux se font légers et les victoires se multiplient. »',
    actionConcrete: 'Fonds d’assistance de classe, aide aux études des enfants et parrainage d’activités génératrices de revenus.',
    color: 'amber'
  },
  {
    id: 'fidelite',
    name: 'Arbre de la Fidélité',
    subtitle: 'La constance dans les engagements',
    description: 'Être loyal envers sa famille, ses engagements associatifs et ses principes moraux. La fidélité construit la confiance indéfectible.',
    quote: '« Un pionnier tient parole et garde son cap avec dignité. »',
    actionConcrete: 'Assiduité rigoureuse aux séances bimensuelles et fidélité aux valeurs familiales fondamentales.',
    color: 'blue'
  },
  {
    id: 'dignite',
    name: 'Arbre de la Dignité',
    subtitle: 'Le respect de soi et d’autrui',
    description: 'Cultiver une noblesse d’attitude, l’honnêteté professionnelle et le respect inconditionnel de chaque être humain sans distinction de statut.',
    quote: '« La dignité est le vêtement d’honneur que nul ne peut ôter à celui qui la chérit. »',
    actionConcrete: 'Comportement exemplaire dans la vie civile, tenue soignée lors des rencontres et refus de tout compromis malhonnête.',
    color: 'teal'
  },
  {
    id: 'foi',
    name: 'Arbre de la Foi',
    subtitle: 'L’espérance créatrice et la transcendance',
    description: 'Nourrir la conviction profonde qu’un avenir meilleur est toujours possible par le travail, la prière et la droiture de cœur.',
    quote: '« La foi ouvre les portes que le doute déclarait closes. »',
    actionConcrete: 'Temps de méditation et d’élévation spirituelle respectueux de toutes les sensibilités dans le cadre républicain.',
    color: 'indigo'
  }
];

export const INITIAL_CLASSES: GlobalClass[] = [
  {
    id: 'gc-01',
    code: 'GC-ABJ-001',
    name: 'Globale Classe Cocody-Espérance',
    city: 'Abidjan (Cocody)',
    sessionTime: 'Matinée (08h30 - 12h30)',
    leaderName: 'M. Kouadio Emmanuel',
    currentMembersCount: 22,
    maxCapacity: 24,
    status: 'active',
  },
  {
    id: 'gc-02',
    code: 'GC-ABJ-002',
    name: 'Globale Classe Plateau-Prestige',
    city: 'Abidjan (Plateau)',
    sessionTime: 'Après-midi (14h00 - 18h00)',
    leaderName: 'Mme Bamba Fatoumata',
    currentMembersCount: 24,
    maxCapacity: 24,
    status: 'complete',
  },
  {
    id: 'gc-03',
    code: 'GC-ABJ-003',
    name: 'Globale Classe Yopougon-Fraternité',
    city: 'Abidjan (Yopougon)',
    sessionTime: 'Matinée (08h30 - 12h30)',
    leaderName: 'M. Yao Jean-Baptiste',
    currentMembersCount: 18,
    maxCapacity: 24,
    status: 'in_formation',
  },
  {
    id: 'gc-04',
    code: 'GC-ABJ-004',
    name: 'Globale Classe Riviera-Harmonie',
    city: 'Abidjan (Riviera)',
    sessionTime: 'Après-midi (14h00 - 18h00)',
    leaderName: 'Mme Koné Aïssata',
    currentMembersCount: 20,
    maxCapacity: 24,
    status: 'active',
  }
];

export const INITIAL_APPLICATIONS: MembershipApplication[] = [
  {
    id: 'app-001',
    referenceCode: 'PCI-2026-7841',
    fullName: 'Séka Arsène Patrick',
    email: 'seka.patrice@example.com',
    phone: '+225 07 48 92 11 04',
    country: 'Côte d’Ivoire',
    city: 'Abidjan',
    age: 38,
    profession: 'Directeur des Ressources Humaines',
    motivation: 'Rejoindre une communauté d’hommes et de femmes engagés pour développer mon leadership familial et m’impliquer dans les clubs d’investissement.',
    status: 'acceptee',
    submittedAt: '2026-10-12T14:32:00Z',
    assignedClassId: 'gc-01',
    adminNotes: 'Dossier validé par le Bureau National. Entretien préliminaire concluant.'
  },
  {
    id: 'app-002',
    referenceCode: 'PCI-2026-8923',
    fullName: 'Gnamien Clarisse N’Dri',
    email: 'c.gnamien@example.com',
    phone: '+225 05 66 12 89 30',
    country: 'Côte d’Ivoire',
    city: 'Yopougon',
    age: 31,
    profession: 'Comptable agréée',
    motivation: 'Souhaite faire partie d’une Globale Classe pour participer à la formation sur les 5 Arbres et apporter mes compétences aux projets solidaires.',
    status: 'en_cours',
    submittedAt: '2026-10-21T09:15:00Z',
    assignedClassId: 'gc-03',
    adminNotes: 'Affectation proposée pour la Globale Classe Yopougon-Fraternité.'
  },
  {
    id: 'app-003',
    referenceCode: 'PCI-2026-9014',
    fullName: 'Diallo Ibrahim Mamadou',
    email: 'diallo.ib@example.com',
    phone: '+225 01 23 45 67 89',
    country: 'Côte d’Ivoire',
    city: 'Marcory',
    age: 44,
    profession: 'Entrepreneur en logistique',
    motivation: 'Valoriser l’esprit de famille et de solidarité agissante dans mon environnement personnel et professionnel.',
    status: 'recue',
    submittedAt: '2026-10-24T08:00:00Z',
    adminNotes: 'Nouvelle demande en attente de vérification des pièces justificatives.'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Rentrée Annuelle des Globales Classes & Consolidation du Réseau Fraternel',
    category: 'Communiqué',
    date: '18 Octobre 2026',
    author: 'Bureau International PCI',
    featured: true,
    summary: 'Le Bureau International convie les responsables de classes et les adhérents à la grande session d’orientation semestrielle axée sur l’impact des Cinq Arbres du Leadership.',
    content: [
      'Dans le cadre de l’harmonisation de nos cycles de formation, le Bureau International Pionnier Club a tenu ce samedi sa session générale d’orientation.',
      'Les 24 délégués de Globales Classes ont échangé sur les retombées concrètes des exposés sur le Leadership Familial, soulignant des progrès tangibles dans la gestion du dialogue conjugal et de l’autorité bienveillante auprès des adolescents.',
      'Le président national a rappelé que l’adhésion à 10 000 FCFA confère un accès intégral à tous les services de l’ONG, sans surcoût d’inscription pour les classes.'
    ]
  },
  {
    id: 'news-2',
    title: 'Lancement du Fond Mutualisé d’Investissement Solidaire des Membres',
    category: 'Solidarité',
    date: '04 Octobre 2026',
    author: 'Commission Économique PCI',
    summary: 'Mise en place d’un dispositif pilote facilitant le regroupement d’épargne productive pour soutenir l’entrepreneuriat des familles au sein des classes.',
    content: [
      'Conformément aux directives de nos statuts, la commission économique du Pionnier Club International a officialisé le protocole de fonctionnement des Clubs d’Investissement.',
      'Chaque adhérent ayant validé au moins 3 mois d’assiduité en Globale Classe peut solliciter l’appui du fond pour développer une activité génératrice de revenus sous caution morale de ses pairs de classe.'
    ]
  },
  {
    id: 'news-3',
    title: 'Élargissement du Réseau de Partenaires : Nouvelle Carte Réduction du Coût de la Vie',
    category: 'Vie du Club',
    date: '22 Septembre 2026',
    author: 'Pôle Partenariats',
    summary: 'Signature de conventions d’avantages avec 15 nouveaux établissements de santé, pharmacies et distributeurs d’équipements scolaires.',
    content: [
      'La mission de lutte contre la précarité et pour l’accès à un coût de la vie maîtrisé franchit une étape importante.',
      'Grâce à la présentation de leur carte annuelle valide, les familles membres bénéficient désormais de tarifs préférentiels dans les cliniques partenaires et les officines conventionnées.'
    ]
  }
];
