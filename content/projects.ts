import type { CaseStudy, MinorProject } from './types';

/*
 * Sources for every fact below:
 * - Asmodee: Lucas's verified bullets (brief of 2026-10-27) and the CV.
 * - EASY.Q: ~/PERSO/easyq (CLAUDE.md, docs/DEPLOYMENT_SETUP_EASY_FR.md, docs/audit-2026-05-07.md,
 *   .github/workflows/ci.yml, git history — 128 commits, single author).
 * - NYOS APR: ~/PERSO/NYOS-APR (README.md, TECHNICAL_SUMMARY.md, git history — 3 contributors).
 * - EcoMuni: v1 site copy only. The GitHub repo linked in v1 returns 404 (private or deleted).
 * Unknown values are `TODO(lucas): …` and are hidden in production builds.
 */

export const caseStudies: CaseStudy[] = [
  {
    slug: 'asmodee-ai-platform',
    title: 'Asmodee AI platform',
    pitch: {
      en: 'Features for an internal multi-LLM platform used by 800+ Asmodee employees: file generation, OCR, translation and voice dictation.',
      fr: 'Des fonctionnalités pour une plateforme IA multi-LLM interne utilisée par plus de 800 employés d’Asmodee : génération de fichiers, OCR, traduction et dictée vocale.',
    },
    period: { en: 'Sept 2025 – Jan 2026', fr: 'sept. 2025 – janv. 2026' },
    role: { en: 'Full-stack developer intern', fr: 'Stagiaire développeur full-stack' },
    team: {
      en: 'TODO(lucas): team size and who you reported to (role only, no names)',
      fr: 'TODO(lucas): taille de l’équipe et à qui tu reportais (rôle seulement)',
    },
    context: {
      en: 'Asmodee gives its employees one internal interface to several LLMs. I joined as a full-stack intern to add AI features to the FastAPI/LangChain backend and the Vue 3 front-end, and to make the backend safe to change.',
      fr: 'Asmodee met à disposition de ses employés une interface interne unique vers plusieurs LLM. J’ai rejoint l’équipe en stage full-stack pour ajouter des fonctionnalités IA au backend FastAPI/LangChain et au front Vue 3, et rendre le backend sûr à faire évoluer.',
    },
    decisions: [
      {
        title: { en: 'Benchmark models before picking one', fr: 'Comparer les modèles avant d’en choisir un' },
        body: {
          en: 'For the LLM-powered file generation service I ran the same task on 3 models and compared their outputs. The chosen model brought the error rate from 13% to 4%.',
          fr: 'Pour le service de génération de fichiers par LLM, j’ai fait tourner la même tâche sur 3 modèles et comparé les résultats. Le modèle retenu a fait passer le taux d’erreur de 13 % à 4 %.',
        },
      },
      {
        title: { en: 'Tests and CI before more features', fr: 'Des tests et de la CI avant de nouvelles fonctionnalités' },
        body: {
          en: 'The backend had no tests. I set up Pytest and Tox and ran them in GitHub Actions. Coverage went from 0 to 88%, so each new integration could be checked against the existing ones.',
          fr: 'Le backend n’avait aucun test. J’ai mis en place Pytest et Tox, exécutés dans GitHub Actions. La couverture est passée de 0 à 88 %, ce qui permet de vérifier chaque nouvelle intégration contre l’existant.',
        },
      },
      {
        title: { en: 'Specialised services behind one API', fr: 'Des services spécialisés derrière une seule API' },
        body: {
          en: 'Mistral OCR, DeepL and Whisper voice dictation are integrated in the FastAPI/LangChain backend. The front-end calls one API whichever provider does the work.',
          fr: 'Mistral OCR, DeepL et la dictée vocale Whisper sont intégrés au backend FastAPI/LangChain. Le front appelle une seule API, quel que soit le fournisseur derrière.',
        },
      },
    ],
    results: [
      { en: 'File generation error rate: 13% → 4%.', fr: 'Taux d’erreur de la génération de fichiers : 13 % → 4 %.' },
      { en: 'Backend test coverage: 0 → 88% (Pytest, Tox, GitHub Actions).', fr: 'Couverture de tests backend : 0 → 88 % (Pytest, Tox, GitHub Actions).' },
      { en: 'Shipped a Projects feature.', fr: 'Livraison d’une fonctionnalité Projets.' },
      {
        en: 'Responsive and localisation overhaul of the Vue 3 front-end (Pinia, Tailwind).',
        fr: 'Refonte responsive et localisation complète du front Vue 3 (Pinia, Tailwind).',
      },
    ],
    metrics: [
      { value: '13% → 4%', caption: { en: 'error rate, LLM file generation', fr: 'taux d’erreur, génération de fichiers' } },
      { value: '0 → 88%', caption: { en: 'backend test coverage', fr: 'couverture de tests backend' } },
      { value: '800+', caption: { en: 'employees on the platform', fr: 'employés sur la plateforme' } },
    ],
    diagram: {
      title: { en: 'Simplified architecture (public information only)', fr: 'Architecture simplifiée (informations publiques uniquement)' },
      cols: 3,
      rows: 4,
      nodes: [
        { id: 'spa', label: 'Vue 3 front-end', sub: 'Pinia · Tailwind', col: 0, row: 1 },
        { id: 'api', label: 'FastAPI backend', sub: 'LangChain', col: 1, row: 1 },
        { id: 'ci', label: 'GitHub Actions', sub: 'Pytest · Tox', col: 1, row: 3 },
        { id: 'llm', label: 'LLM providers', sub: 'multi-model', col: 2, row: 0 },
        { id: 'ocr', label: 'Mistral OCR', col: 2, row: 1 },
        { id: 'deepl', label: 'DeepL', sub: 'translation', col: 2, row: 2 },
        { id: 'whisper', label: 'Whisper', sub: 'voice dictation', col: 2, row: 3 },
      ],
      edges: [
        ['spa', 'api'],
        ['api', 'llm'],
        ['api', 'ocr'],
        ['api', 'deepl'],
        ['api', 'whisper'],
        ['ci', 'api'],
      ],
    },
    stack: ['Python', 'FastAPI', 'LangChain', 'Pytest', 'Tox', 'GitHub Actions', 'Vue 3', 'Pinia', 'Tailwind CSS'],
    // Internal tool: no public link, no screenshots. TODO(lucas): confirm Asmodee is fine with these metrics being public.
    links: [],
    confidential: true,
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight (e.g. how you ran the model benchmark)',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'easyq',
    title: 'EASY.Q',
    pitch: {
      en: 'A SaaS for restaurants: QR digital menu, an AI waiter chatbot, table ordering and payment, in one product.',
      fr: 'Un SaaS pour restaurants : menu digital par QR code, chatbot serveur IA, commande et paiement à table, dans un seul produit.',
    },
    period: { en: '2026 — TODO(lucas): start month', fr: '2026 — TODO(lucas): mois de début' },
    role: {
      en: 'Sole developer: product, backend, front-end, infrastructure',
      fr: 'Seul développeur : produit, backend, front, infrastructure',
    },
    team: { en: 'Solo', fr: 'Solo' },
    context: {
      en: 'EASY.Q puts the digital menu, ordering, payment and the owner dashboard behind one QR code. The AI chatbot is part of the ordering and payment flow, not a separate widget.',
      fr: 'EASY.Q réunit le menu digital, la commande, le paiement et le tableau de bord restaurateur derrière un QR code. Le chatbot IA fait partie du parcours de commande et de paiement, ce n’est pas un widget à côté.',
    },
    decisions: [
      {
        title: { en: 'Import the menu from a PDF', fr: 'Importer le menu depuis un PDF' },
        body: {
          en: 'Owners upload the PDF menu they already have. The backend extracts the text with PyMuPDF and Gemini turns it into structured dishes, so onboarding does not start with manual data entry.',
          fr: 'Le restaurateur importe le PDF de menu qu’il a déjà. Le backend en extrait le texte avec PyMuPDF et Gemini le transforme en plats structurés : l’onboarding ne commence pas par de la saisie.',
        },
      },
      {
        title: { en: 'SSE for the chatbot, WebSocket for the kitchen', fr: 'SSE pour le chatbot, WebSocket pour la cuisine' },
        body: {
          en: 'Chatbot answers are a one-way token stream, so they use Server-Sent Events. The kitchen display needs orders pushed as they arrive: WebSocket, fanned out through Redis pub/sub.',
          fr: 'Les réponses du chatbot sont un flux de tokens à sens unique : Server-Sent Events. L’écran cuisine doit recevoir les commandes dès leur arrivée : WebSocket, diffusé via Redis pub/sub.',
        },
      },
      {
        title: { en: 'EU hosting for about €7 a month', fr: 'Hébergement européen pour environ 7 € par mois' },
        body: {
          en: 'Static front-end on Vercel; API, PostgreSQL and Redis in Docker behind Nginx on one OVH VPS. Data stays in the EU and the whole stack runs for about €7 a month.',
          fr: 'Front statique sur Vercel ; API, PostgreSQL et Redis dans Docker derrière Nginx sur un VPS OVH. Les données restent en Europe et l’ensemble tourne pour environ 7 € par mois.',
        },
      },
    ],
    results: [
      { en: '416 backend and 113 front-end automated tests (May 2026).', fr: '416 tests automatisés backend et 113 front (mai 2026).' },
      {
        en: 'CI on every push and pull request: Ruff, Pytest, and a 70% coverage gate.',
        fr: 'CI à chaque push et pull request : Ruff, Pytest et un seuil de couverture à 70 %.',
      },
      { en: 'Deployed on easyq.fr (Vercel + OVH).', fr: 'Déployé sur easyq.fr (Vercel + OVH).' },
      {
        en: 'TODO(lucas): usage — restaurants onboarded, orders processed, or pilot feedback',
        fr: 'TODO(lucas): usage — restaurants inscrits, commandes traitées ou retours pilotes',
      },
    ],
    metrics: [
      { value: '529', caption: { en: 'automated tests', fr: 'tests automatisés' } },
      { value: '70%', caption: { en: 'coverage gate in CI', fr: 'seuil de couverture en CI' } },
      { value: '~€7', caption: { en: 'infrastructure per month', fr: 'd’infrastructure par mois' } },
    ],
    diagram: {
      title: { en: 'Architecture', fr: 'Architecture' },
      cols: 3,
      rows: 4,
      nodes: [
        { id: 'pwa', label: 'Customer PWA', sub: 'React · Vite', col: 0, row: 0 },
        { id: 'owner', label: 'Owner dashboard', sub: 'React', col: 0, row: 1 },
        { id: 'kds', label: 'Kitchen display', sub: 'WebSocket', col: 0, row: 2 },
        { id: 'api', label: 'FastAPI', sub: 'async · Nginx · Docker', col: 1, row: 1 },
        { id: 'pg', label: 'PostgreSQL', sub: 'SQLAlchemy · Alembic', col: 2, row: 0 },
        { id: 'redis', label: 'Redis', sub: 'pub/sub', col: 2, row: 1 },
        { id: 'gemini', label: 'Gemini', sub: 'menu import · chat SSE', col: 2, row: 2 },
        { id: 'stripe', label: 'Stripe Connect', sub: 'payments', col: 2, row: 3 },
      ],
      edges: [
        ['pwa', 'api'],
        ['owner', 'api'],
        ['kds', 'api'],
        ['api', 'pg'],
        ['api', 'redis'],
        ['api', 'gemini'],
        ['api', 'stripe'],
      ],
    },
    stack: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Redis',
      'React',
      'Vite',
      'Tailwind CSS',
      'Gemini',
      'Stripe',
      'Clerk',
      'Docker',
      'Nginx',
      'GitHub Actions',
      'OVH',
    ],
    links: [
      { kind: 'live', href: 'https://easyq.fr' },
      { kind: 'github', href: 'https://github.com/LucRoDZ/EASY-.Q' },
    ],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'ecomuni',
    title: 'EcoMuni',
    pitch: {
      en: 'Energy-optimisation SaaS for French municipalities: consumption dashboard, AI anomaly detection, a Gemini assistant and Décret Tertiaire tracking.',
      fr: 'SaaS d’optimisation énergétique pour les communes : tableau de bord des consommations, détection d’anomalies par IA, assistant Gemini et suivi du Décret Tertiaire.',
    },
    period: { en: 'TODO(lucas): dates', fr: 'TODO(lucas): dates' },
    role: { en: 'TODO(lucas): your role', fr: 'TODO(lucas): ton rôle' },
    team: { en: 'TODO(lucas): team size, school or hackathon context', fr: 'TODO(lucas): taille de l’équipe, cadre (école, hackathon)' },
    context: {
      en: 'Under the Décret Tertiaire, French municipalities must track and reduce the energy use of their public buildings. EcoMuni gathers the consumption data, flags anomalies and simulates the effect of renovation work before it is paid for.',
      fr: 'Avec le Décret Tertiaire, les communes doivent suivre et réduire la consommation énergétique de leurs bâtiments publics. EcoMuni centralise les consommations, signale les anomalies et simule l’effet des travaux avant de les engager.',
    },
    decisions: [
      {
        title: { en: 'TODO(lucas): key decision 1', fr: 'TODO(lucas): décision clé 1' },
        body: { en: 'TODO(lucas): what you chose and why (e.g. how anomalies are detected)', fr: 'TODO(lucas): ce que tu as choisi et pourquoi' },
      },
      {
        title: { en: 'TODO(lucas): key decision 2', fr: 'TODO(lucas): décision clé 2' },
        body: { en: 'TODO(lucas): what you chose and why (e.g. what the Gemini assistant can see)', fr: 'TODO(lucas): ce que tu as choisi et pourquoi' },
      },
    ],
    results: [
      {
        en: 'Dashboard, anomaly detection, Gemini assistant, PDF reports, Décret Tertiaire tracking and before/after renovation simulations.',
        fr: 'Tableau de bord, détection d’anomalies, assistant Gemini, rapports PDF, suivi Décret Tertiaire et simulations avant/après travaux.',
      },
      { en: 'TODO(lucas): one measurable result (accuracy, users, jury ranking…)', fr: 'TODO(lucas): un résultat mesurable' },
    ],
    metrics: [],
    diagram: {
      title: { en: 'Architecture', fr: 'Architecture' },
      cols: 3,
      rows: 3,
      nodes: [
        { id: 'spa', label: 'Dashboard', sub: 'React · Vite', col: 0, row: 1 },
        { id: 'api', label: 'FastAPI', sub: 'Docker', col: 1, row: 1 },
        { id: 'anomaly', label: 'Anomaly detection', col: 2, row: 0 },
        { id: 'gemini', label: 'Gemini', sub: 'assistant', col: 2, row: 1 },
        { id: 'pdf', label: 'PDF reports', col: 2, row: 2 },
      ],
      edges: [
        ['spa', 'api'],
        ['api', 'anomaly'],
        ['api', 'gemini'],
        ['api', 'pdf'],
      ],
    },
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'Gemini', 'Docker'],
    // TODO(lucas): v1 linked github.com/LucRoDZ/EcoMuni, which returns 404. Make it public or add a demo link.
    links: [],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'nyos-apr',
    title: 'NYOS APR',
    pitch: {
      en: 'Annual Product Review platform for pharmaceutical quality teams: drift and anomaly detection, a Gemini assistant and AI-drafted reports exported to PDF.',
      fr: 'Plateforme d’Annual Product Review pour la qualité pharmaceutique : détection de dérives et d’anomalies, assistant Gemini et rapports rédigés par IA exportés en PDF.',
    },
    period: { en: 'Jan – Jun 2026', fr: 'janv. – juin 2026' },
    role: { en: 'TODO(lucas): your part of the work', fr: 'TODO(lucas): ta part du travail' },
    team: {
      en: 'Team NYOS, Google Cloud hackathon — TODO(lucas): team size',
      fr: 'Équipe NYOS, hackathon Google Cloud — TODO(lucas): taille de l’équipe',
    },
    context: {
      en: 'Each year, pharmaceutical manufacturers compile a product’s batch, QC, complaint and CAPA data into an Annual Product Review. NYOS APR analyses that data, flags process drifts and drafts the report.',
      fr: 'Chaque année, les industriels pharmaceutiques compilent les données de lots, de contrôle qualité, de réclamations et de CAPA d’un produit dans une Annual Product Review. NYOS APR analyse ces données, signale les dérives du procédé et rédige le rapport.',
    },
    decisions: [
      {
        title: { en: 'Build the report in three levels', fr: 'Construire le rapport en trois niveaux' },
        body: {
          en: 'Every uploaded CSV gets its own AI report, monthly reports aggregate those, and the annual review is synthesised from the monthly ones. Each level can be checked on its own before it feeds the next.',
          fr: 'Chaque CSV importé reçoit son rapport IA, les rapports mensuels les agrègent et la revue annuelle est synthétisée à partir des mois. Chaque niveau se vérifie seul avant d’alimenter le suivant.',
        },
      },
      {
        title: { en: 'Synthetic data with hidden incidents', fr: 'Des données synthétiques avec des incidents cachés' },
        body: {
          en: 'Real manufacturing data is confidential, so the team built a generator for 9 data categories over 2020–2025, with planted events (equipment degradation, a supplier issue, a seasonal effect) to test whether the analysis finds them.',
          fr: 'Les vraies données de production sont confidentielles : l’équipe a construit un générateur pour 9 catégories de données sur 2020–2025, avec des événements cachés (usure d’équipement, problème fournisseur, effet saisonnier) pour vérifier que l’analyse les retrouve.',
        },
      },
      {
        title: { en: 'One container to deploy', fr: 'Un seul conteneur à déployer' },
        body: {
          en: 'A multi-stage Docker build compiles the React front-end and serves it from the FastAPI app, so the demo deploys as a single service.',
          fr: 'Un build Docker multi-étapes compile le front React et le sert depuis l’app FastAPI : la démo se déploie comme un seul service.',
        },
      },
    ],
    results: [
      { en: '70+ REST endpoints across 5 routers, 16-table data model.', fr: 'Plus de 70 endpoints REST répartis sur 5 routeurs, modèle de données de 16 tables.' },
      { en: 'Public demo video.', fr: 'Vidéo de démonstration publique.' },
      { en: 'TODO(lucas): hackathon outcome or client feedback', fr: 'TODO(lucas): résultat du hackathon ou retour client' },
    ],
    metrics: [
      { value: '70+', caption: { en: 'API endpoints', fr: 'endpoints d’API' } },
      { value: '9', caption: { en: 'synthetic data categories', fr: 'catégories de données synthétiques' } },
      { value: '3', caption: { en: 'report levels to the APR', fr: 'niveaux de rapport jusqu’à l’APR' } },
    ],
    diagram: {
      title: { en: 'Architecture', fr: 'Architecture' },
      cols: 3,
      rows: 4,
      nodes: [
        { id: 'spa', label: 'React front-end', sub: 'Vite · Recharts', col: 0, row: 1 },
        { id: 'api', label: 'FastAPI', sub: '5 routers', col: 1, row: 1 },
        { id: 'gen', label: 'Data generator', sub: '9 categories', col: 1, row: 3 },
        { id: 'gemini', label: 'Gemini', sub: 'chat · reports', col: 2, row: 0 },
        { id: 'db', label: 'SQLite', sub: '16 tables', col: 2, row: 1 },
        { id: 'pdf', label: 'PDF export', col: 2, row: 2 },
      ],
      edges: [
        ['spa', 'api'],
        ['api', 'gemini'],
        ['api', 'db'],
        ['api', 'pdf'],
        ['gen', 'db'],
      ],
    },
    // TODO(lucas): v1 said Streamlit; the repository is React + Vite. Confirm Streamlit was only the MVP.
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Gemini', 'React', 'Vite', 'Docker'],
    links: [
      { kind: 'demo', href: 'https://youtu.be/1mw6pO0CnSs' },
      { kind: 'github', href: 'https://github.com/noasebag/NYOS-APR' },
    ],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
];

export const minorProjects: MinorProject[] = [
  {
    title: 'TinyX',
    kind: { en: 'School · team of 14', fr: 'École · équipe de 14' },
    summary: {
      en: 'A small X/Twitter clone split into microservices for high traffic.',
      fr: 'Un mini-clone de X/Twitter découpé en microservices pour un fort trafic.',
    },
    stack: ['Java', 'Quarkus', 'Redis pub/sub', 'Elasticsearch', 'Neo4j'],
  },
  {
    title: 'Aurora International Academy — RFP',
    kind: { en: 'Product · led a team of 5', fr: 'Produit · équipe de 5 pilotée' },
    summary: {
      en: 'Answer to a call for tender for a PWA suite: product design, a 3-phase roadmap and Figma mockups.',
      fr: 'Réponse à un appel d’offres pour une suite PWA : conception produit, roadmap en 3 phases et maquettes Figma.',
    },
    stack: ['Figma', 'PWA', 'Roadmapping'],
  },
  {
    title: 'Strategic Business Simulation',
    kind: { en: 'GITM major · management', fr: 'Majeure GITM · management' },
    summary: {
      en: 'Ran a fictional robotics company over 8 quarters; built the Excel strategy dashboard and led the CSR strategy.',
      fr: 'Pilotage d’une entreprise de robotique fictive sur 8 trimestres ; tableau de bord stratégique Excel et stratégie RSE.',
    },
    stack: ['Excel', 'Strategy', 'CSR'],
  },
  {
    title: 'PING',
    kind: { en: 'School', fr: 'École' },
    summary: {
      en: 'Java/Quarkus REST API with CRUD, file-system management and Swagger docs, plus a responsive React front-end.',
      fr: 'API REST Java/Quarkus (CRUD, gestion de fichiers, documentation Swagger) et front React responsive.',
    },
    stack: ['Java', 'Quarkus', 'React', 'REST'],
  },
  {
    title: 'Tiger Compiler',
    kind: { en: 'School', fr: 'École' },
    summary: { en: 'A full compiler for the Tiger language.', fr: 'Un compilateur complet pour le langage Tiger.' },
    stack: ['C++'],
  },
  {
    title: '42sh',
    kind: { en: 'School · one month', fr: 'École · un mois' },
    summary: { en: 'An interactive POSIX shell.', fr: 'Un shell interactif conforme POSIX.' },
    stack: ['C', 'POSIX', 'Linux'],
  },
  {
    title: 'DataClash',
    kind: { en: 'School', fr: 'École' },
    summary: {
      en: 'Complex SQL queries to extract and visualise data, including SQL injection exercises.',
      fr: 'Requêtes SQL complexes pour extraire et visualiser des données, dont des exercices d’injection SQL.',
    },
    stack: ['SQL', 'PostgreSQL'],
  },
  {
    title: 'E-PLACE',
    kind: { en: 'School', fr: 'École' },
    summary: {
      en: 'A front-end for a shared real-time pixel grid in the style of r/place, with token authentication.',
      fr: 'Un front pour une grille de pixels partagée en temps réel façon r/place, avec authentification par token.',
    },
    stack: ['JavaScript', 'WebSocket', 'Canvas'],
  },
  {
    title: 'Nail technician landing page',
    kind: { en: 'Freelance client', fr: 'Client freelance' },
    summary: {
      en: 'Landing page for a nail technician’s business.',
      fr: 'Landing page pour un salon de prothésie ongulaire.',
    },
    stack: ['Next.js', 'Supabase', 'Clerk'],
    // TODO(lucas): confirm the client agrees to be linked.
    href: 'https://rosesnails.vercel.app',
  },
  {
    title: 'SnAick',
    kind: { en: 'TODO(lucas): context', fr: 'TODO(lucas): contexte' },
    summary: { en: 'TODO(lucas): one-line description of SnAick', fr: 'TODO(lucas): description en une ligne de SnAick' },
    stack: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}
