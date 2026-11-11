import type { CaseStudy } from './types';
import { shot } from './shot';

/*
 * Sources for every fact below:
 * - Asmodee: Lucas's verified bullets (brief of 2026-10-27), the CV and the EPITA internship report
 *   (Rapport Lucas ZIVAN/ChatBot Asmodee — kept out of git). Internal product and colleague names are
 *   deliberately left out. Only the responsive captures are published, anonymised (conversation
 *   titles blurred, DevTools cropped); usage dashboards, cost figures and videos stay private.
 * - EASY.Q: ~/PERSO/easyq (CLAUDE.md, docs, CI, git history) and the June 2026 pitch deck.
 * - NYOS APR: ~/PERSO/NYOS-APR (README.md, TECHNICAL_SUMMARY.md) and app screenshots (June 2026).
 * - EcoMuni: the IONIS GoodWill's pitch deck (2026) and app screenshots (January 2026).
 * - Nail technician site: project notes (live site, Instagram feed, auth, booking).
 * - SnAick: the project README.
 * Unknown values are `TODO(lucas): …` and are hidden in production builds.
 */

export const caseStudies: CaseStudy[] = [
  {
    slug: 'asmodee-ai-platform',
    title: 'Asmodee AI platform',
    kind: { en: 'Internship · Asmodee', fr: 'Stage · Asmodee' },
    pitch: {
      en: 'AI features for an internal multi-LLM platform used by 800+ Asmodee employees: LLM file generation, OCR, translation and voice dictation — shipped with the tests and CI that keep them working.',
      fr: 'Des fonctionnalités IA pour une plateforme multi-LLM interne utilisée par plus de 800 employés d’Asmodee : génération de fichiers par LLM, OCR, traduction et dictée vocale — livrées avec les tests et la CI qui les maintiennent.',
    },
    period: { en: 'Sept 2025 – Jan 2026 · 21 weeks', fr: 'sept. 2025 – janv. 2026 · 21 semaines' },
    role: { en: 'Full-stack developer intern', fr: 'Stagiaire développeur full-stack' },
    team: {
      en: 'AI & Data team of 5 in the IT department · two-week sprints, daily stand-ups, review before every merge',
      fr: 'Équipe IA & Data de 5 personnes (DSI) · sprints de deux semaines, daily, revue avant chaque merge',
    },
    context: {
      en: 'Asmodee wanted one AI tool built and run in-house rather than scattered external licences. The platform was already in production when I joined; my job was to widen what it could do and to make the backend safe to change.',
      fr: 'Asmodee voulait un outil IA unique, maîtrisé en interne, plutôt que des licences externes éparpillées. La plateforme était déjà en production à mon arrivée : mon rôle était d’élargir ce qu’elle sait faire et de rendre le backend sûr à faire évoluer.',
    },
    decisions: [
      {
        title: { en: 'Pick the model with a benchmark, not a hunch', fr: 'Choisir le modèle sur un benchmark, pas à l’intuition' },
        body: {
          en: 'Word and Excel files are built from JSON that an LLM generates. I ran the same generation task on 3 models. Gemini won because it accepts a JSON schema in the request (structured output), so its answers match the schema. The error rate went from 13% to 4%.',
          fr: 'Les fichiers Word et Excel sont construits à partir d’un JSON généré par un LLM. J’ai fait tourner la même tâche sur 3 modèles. Gemini l’a emporté car il accepte un schéma JSON dans la requête (structured output) : ses réponses respectent le schéma. Le taux d’erreur est passé de 13 % à 4 %.',
        },
      },
      {
        title: { en: 'Tests and CI before more features', fr: 'Des tests et de la CI avant de nouvelles fonctionnalités' },
        body: {
          en: 'The backend had no automated tests. I wrote Pytest suites with shared fixtures and mocks for every external API, ran them in isolated Tox environments and on every merge request in GitHub Actions. Coverage went from 0 to 88%.',
          fr: 'Le backend n’avait aucun test automatisé. J’ai écrit des suites Pytest avec des fixtures partagées et des mocks pour chaque API externe, exécutées dans des environnements Tox isolés et à chaque merge request dans GitHub Actions. La couverture est passée de 0 à 88 %.',
        },
      },
      {
        title: { en: 'Specialised providers behind one API', fr: 'Des fournisseurs spécialisés derrière une seule API' },
        body: {
          en: 'Mistral OCR (PDF → Base64 → Markdown pages with images), DeepL and Whisper dictation sit behind the FastAPI/LangChain services. The Vue front-end calls one API whichever provider does the work.',
          fr: 'Mistral OCR (PDF → Base64 → pages Markdown avec images), DeepL et la dictée Whisper sont derrière les services FastAPI/LangChain. Le front Vue appelle une seule API, quel que soit le fournisseur.',
        },
      },
      {
        title: { en: 'Generated files expire', fr: 'Des fichiers générés qui expirent' },
        body: {
          en: 'Generated documents go to cloud storage keyed by conversation, behind download links that expire after 48 hours, with upload size limits on the way in.',
          fr: 'Les documents générés sont stockés dans le cloud par conversation, derrière des liens de téléchargement qui expirent après 48 heures, avec une taille d’upload limitée en entrée.',
        },
      },
    ],
    results: [
      { en: 'File generation error rate: 13% → 4%.', fr: 'Taux d’erreur de la génération de fichiers : 13 % → 4 %.' },
      { en: 'Backend test coverage: 0 → 88% (Pytest, Tox, GitHub Actions).', fr: 'Couverture de tests backend : 0 → 88 % (Pytest, Tox, GitHub Actions).' },
      {
        en: 'In production: voice dictation, PDF OCR, Word/Excel generation, DeepL, Projects (conversations grouped under shared instructions), message feedback.',
        fr: 'En production : dictée vocale, OCR des PDF, génération Word/Excel, DeepL, Projets (conversations regroupées sous des instructions communes), évaluation des réponses.',
      },
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
        { id: 'api', label: 'FastAPI backend', sub: 'LangChain · LangGraph', col: 1, row: 1 },
        { id: 'ci', label: 'GitHub Actions', sub: 'Pytest · Tox', col: 1, row: 3 },
        { id: 'llm', label: 'LLM providers', sub: 'GPT-4o · Gemini', col: 2, row: 0 },
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
    stack: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'PostgreSQL', 'Pytest', 'Tox', 'GitHub Actions', 'Vue 3', 'Pinia', 'Tailwind CSS'],
    links: [],
    shots: [
      shot(
        'asmodee-ai-platform',
        'tablet',
        531,
        698,
        { en: 'Tablet layout after the responsive overhaul (conversation titles blurred)', fr: 'Affichage tablette après la refonte responsive (titres de conversations floutés)' },
        'mobile',
      ),
      shot(
        'asmodee-ai-platform',
        'mobile',
        322,
        700,
        { en: 'Phone layout after the responsive overhaul', fr: 'Affichage mobile après la refonte responsive' },
        'mobile',
      ),
    ],
    confidential: true,
    differently: {
      en: 'OCR on long PDFs (over 50 pages) still takes 30–45 seconds; I would process pages in parallel. And I would add end-to-end tests on the main user journeys — the suite I built is unit-level only.',
      fr: 'L’OCR des PDF longs (plus de 50 pages) prend encore 30 à 45 secondes : je traiterais les pages en parallèle. Et j’ajouterais des tests end-to-end sur les parcours principaux — la suite que j’ai construite reste au niveau unitaire.',
    },
  },
  {
    slug: 'easyq',
    title: 'EASY.Q',
    kind: { en: 'Restaurant SaaS · co-founder & CTO', fr: 'SaaS restauration · cofondateur & CTO' },
    pitch: {
      en: 'Scan, eat, pay: QR digital menu, an AI virtual waiter, table ordering, payment and a live kitchen display — one product for restaurants, from PDF menu to paid bill.',
      fr: 'Scan, eat, pay : menu digital par QR code, serveur virtuel IA, commande à table, paiement et écran cuisine temps réel — un seul produit pour les restaurants, du menu PDF à l’addition réglée.',
    },
    period: { en: '2026 — TODO(lucas): start month', fr: '2026 — TODO(lucas): mois de début' },
    role: {
      en: 'CTO and sole developer: architecture, back-end, front-end, AI integration, UX',
      fr: 'CTO et seul développeur : architecture, backend, front, intégration IA, UX',
    },
    team: { en: 'Three co-founders (CTO, CEO, CBO)', fr: 'Trois cofondateurs (CTO, CEO, CBO)' },
    context: {
      en: 'In a restaurant, guests wait twice — to order and to pay — orders get lost between floor and kitchen, and owners have no live view of sales. EASY.Q started with West Africa’s mobile-money market in mind; payments there need a BCEAO banking licence, so we chose to validate the model in France first.',
      fr: 'Au restaurant, le client attend deux fois — pour commander puis pour payer —, les commandes se perdent entre la salle et la cuisine, et le restaurateur n’a aucune vue en direct sur ses ventes. EASY.Q visait d’abord le marché du mobile money en Afrique de l’Ouest ; le paiement y exige une licence bancaire BCEAO, nous avons donc choisi de valider le modèle en France d’abord.',
    },
    decisions: [
      {
        title: { en: 'Import the menu the owner already has', fr: 'Importer le menu que le restaurateur a déjà' },
        body: {
          en: 'Owners upload their PDF menu. The backend extracts the text with PyMuPDF and Gemini turns it into structured dishes, prices and allergens, so onboarding does not start with data entry. The same model translates the menu into 10 languages.',
          fr: 'Le restaurateur importe son menu PDF. Le backend en extrait le texte avec PyMuPDF et Gemini le transforme en plats, prix et allergènes structurés : l’onboarding ne commence pas par de la saisie. Le même modèle traduit le menu en 10 langues.',
        },
      },
      {
        title: { en: 'Augment the waiter, don’t replace them', fr: 'Outiller le serveur, pas le remplacer' },
        body: {
          en: 'Interviews with 3 restaurant owners showed that speed matters most, but removing the human contact is a deal-breaker. So the AI assistant advises guests and adds dishes to the cart, and there is a “call the waiter” button and a waiter mode for table-side orders.',
          fr: 'Des entretiens avec 3 restaurateurs ont montré que la rapidité compte avant tout, mais que supprimer le lien humain est rédhibitoire. L’assistant IA conseille donc le client et ajoute des plats au panier, avec un bouton « appeler le serveur » et un mode serveur pour la prise de commande en salle.',
        },
      },
      {
        title: { en: 'SSE for the chatbot, WebSocket for the kitchen', fr: 'SSE pour le chatbot, WebSocket pour la cuisine' },
        body: {
          en: 'Chatbot answers are a one-way token stream, so they use Server-Sent Events. The kitchen display needs orders pushed as they arrive: WebSocket, fanned out through Redis pub/sub.',
          fr: 'Les réponses du chatbot sont un flux de tokens à sens unique : Server-Sent Events. L’écran cuisine doit recevoir les commandes dès leur arrivée : WebSocket, diffusé via Redis pub/sub.',
        },
      },
      {
        title: { en: 'EU hosting for under €10 a month', fr: 'Hébergement européen pour moins de 10 € par mois' },
        body: {
          en: 'Static front-end on Vercel; API, PostgreSQL and Redis in Docker behind Nginx on one OVH VPS. Data stays in the EU and the whole stack costs less than €10 a month.',
          fr: 'Front statique sur Vercel ; API, PostgreSQL et Redis dans Docker derrière Nginx sur un VPS OVH. Les données restent en Europe et l’ensemble coûte moins de 10 € par mois.',
        },
      },
    ],
    results: [
      { en: '416 back-end and 113 front-end automated tests (May 2026).', fr: '416 tests automatisés backend et 113 front (mai 2026).' },
      {
        en: 'CI on every push and pull request: Ruff, Pytest, and a 70% coverage gate.',
        fr: 'CI à chaque push et pull request : Ruff, Pytest et un seuil de couverture à 70 %.',
      },
      {
        en: 'Working MVP: menu editor with live mobile preview, QR codes per table, AI assistant, cart with VAT, tips, kitchen display, sales analytics.',
        fr: 'MVP fonctionnel : éditeur de menu avec aperçu mobile, QR code par table, assistant IA, panier avec TVA, pourboires, écran cuisine, analytics de ventes.',
      },
      { en: 'Deployed on easyq.fr (Vercel + OVH).', fr: 'Déployé sur easyq.fr (Vercel + OVH).' },
      {
        en: 'TODO(lucas): usage — restaurants onboarded, orders processed, or pilot feedback',
        fr: 'TODO(lucas): usage — restaurants inscrits, commandes traitées ou retours pilotes',
      },
    ],
    metrics: [
      { value: '529', caption: { en: 'automated tests', fr: 'tests automatisés' } },
      { value: '10', caption: { en: 'menu languages via Gemini', fr: 'langues de menu via Gemini' } },
      { value: '<€10', caption: { en: 'infrastructure per month', fr: 'd’infrastructure par mois' } },
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
        { id: 'redis', label: 'Redis', sub: 'cache · pub/sub', col: 2, row: 1 },
        { id: 'gemini', label: 'Gemini', sub: 'OCR · i18n · chat SSE', col: 2, row: 2 },
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
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'React', 'Vite', 'Tailwind CSS', 'Gemini', 'Stripe', 'Clerk', 'Docker', 'Nginx', 'GitHub Actions', 'OVH'],
    links: [
      { kind: 'live', href: 'https://easyq.fr' },
      { kind: 'github', href: 'https://github.com/LucRoDZ/EASY-.Q' },
    ],
    shots: [
      shot('easyq', 'editor', 1600, 982, { en: 'Menu editor with a live mobile preview of the published menu', fr: 'Éditeur de menu avec aperçu mobile en direct du menu publié' }),
      shot('easyq', 'menu-mobile', 489, 1065, { en: 'Customer menu opened from a table QR code, with dietary filters', fr: 'Menu client ouvert depuis le QR code d’une table, avec filtres alimentaires' }, 'mobile'),
      shot('easyq', 'assistant-mobile', 484, 1056, { en: 'AI virtual waiter with quick suggestions (wine pairing, gluten-free…)', fr: 'Serveur virtuel IA avec suggestions rapides (accords vins, sans gluten…)' }, 'mobile'),
      shot('easyq', 'cart-mobile', 486, 1063, { en: 'Cart with VAT computed per category', fr: 'Panier avec TVA calculée par catégorie' }, 'mobile'),
      shot('easyq', 'tip-mobile', 489, 1065, { en: 'Transparent tipping step before payment', fr: 'Étape de pourboire transparente avant le paiement' }, 'mobile'),
      shot('easyq', 'dashboard', 1528, 1177, { en: 'Owner dashboard: menus, dishes, tables and QR codes', fr: 'Tableau de bord restaurateur : menus, plats, tables et QR codes' }),
      shot('easyq', 'translate', 1600, 1066, { en: 'One-click menu translation, editable side by side', fr: 'Traduction du menu en un clic, éditable côte à côte' }),
      shot('easyq', 'tables', 1543, 1137, { en: 'Table management with a QR code per table', fr: 'Gestion des tables avec un QR code par table' }),
      shot('easyq', 'kds', 1600, 519, { en: 'Kitchen display: orders pushed live by status', fr: 'Écran cuisine : commandes poussées en direct par statut' }),
    ],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'tinyx',
    title: 'TinyX',
    kind: { en: 'Microservices · EPITA', fr: 'Microservices · EPITA' },
    pitch: {
      en: 'A small X/Twitter clone split into Java Quarkus microservices built for high traffic — delivered by a team of 14 that I led.',
      fr: 'Un mini-clone de X/Twitter découpé en microservices Java Quarkus pensés pour un fort trafic — livré par une équipe de 14 que j’ai pilotée.',
    },
    period: { en: 'TODO(lucas): dates', fr: 'TODO(lucas): dates' },
    role: { en: 'Team lead', fr: 'Pilotage de l’équipe' },
    team: { en: '14 students', fr: '14 étudiants' },
    context: {
      en: 'An EPITA project: rebuild the core of a social network as independent services that can each be scaled on their own when traffic grows, instead of one monolith that has to scale as a whole.',
      fr: 'Un projet EPITA : reconstruire le cœur d’un réseau social sous forme de services indépendants, chacun dimensionnable seul quand le trafic augmente, plutôt qu’un monolithe qui doit grossir d’un bloc.',
    },
    // TODO(lucas): confirm the role of each datastore below and the service split.
    decisions: [
      {
        title: { en: 'One datastore per access pattern', fr: 'Une base par type d’accès' },
        body: {
          en: 'Neo4j holds the follow graph, Elasticsearch serves full-text search, and services exchange events through Redis pub/sub instead of calling each other synchronously.',
          fr: 'Neo4j porte le graphe d’abonnements, Elasticsearch sert la recherche plein texte, et les services s’échangent des événements via Redis pub/sub plutôt que de s’appeler de façon synchrone.',
        },
      },
      {
        title: { en: 'TODO(lucas): how you split the work across 14 people', fr: 'TODO(lucas): comment tu as réparti le travail entre 14 personnes' },
        body: { en: 'TODO(lucas): teams per service, interfaces, rituals', fr: 'TODO(lucas): équipes par service, interfaces, rituels' },
      },
    ],
    results: [{ en: 'TODO(lucas): one measurable outcome (load test, grade, services delivered)', fr: 'TODO(lucas): un résultat mesurable (test de charge, note, services livrés)' }],
    metrics: [{ value: '14', caption: { en: 'people on the team', fr: 'personnes dans l’équipe' } }],
    diagram: {
      title: { en: 'Simplified architecture', fr: 'Architecture simplifiée' },
      cols: 3,
      rows: 3,
      nodes: [
        { id: 'client', label: 'Clients', sub: 'REST', col: 0, row: 1 },
        { id: 'svc', label: 'Quarkus services', sub: 'Java · microservices', col: 1, row: 1 },
        { id: 'redis', label: 'Redis', sub: 'pub/sub events', col: 2, row: 0 },
        { id: 'es', label: 'Elasticsearch', sub: 'search', col: 2, row: 1 },
        { id: 'neo4j', label: 'Neo4j', sub: 'follow graph', col: 2, row: 2 },
      ],
      edges: [
        ['client', 'svc'],
        ['svc', 'redis'],
        ['svc', 'es'],
        ['svc', 'neo4j'],
      ],
    },
    stack: ['Java', 'Quarkus', 'Redis pub/sub', 'Elasticsearch', 'Neo4j'],
    links: [],
    shots: [],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'nyos-apr',
    title: 'NYOS APR',
    kind: { en: 'Pharma quality SaaS · team NYOS', fr: 'SaaS qualité pharma · équipe NYOS' },
    pitch: {
      en: 'Annual Product Review platform for pharmaceutical quality teams: drift and anomaly detection, a Gemini assistant and AI-drafted reports exported to PDF.',
      fr: 'Plateforme d’Annual Product Review pour la qualité pharmaceutique : détection de dérives et d’anomalies, assistant Gemini et rapports rédigés par IA exportés en PDF.',
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
          fr: 'Les vraies données de production sont confidentielles : l’équipe a construit un générateur pour 9 catégories de données sur 2020–2025, avec des événements cachés (usure d’équipement, problème fournisseur, effet saisonnier) pour vérifier que l’analyse les retrouve.',
        },
      },
      {
        title: { en: 'One container to deploy', fr: 'Un seul conteneur à déployer' },
        body: {
          en: 'A multi-stage Docker build compiles the React front-end and serves it from the FastAPI app, so the demo deploys as a single service.',
          fr: 'Un build Docker multi-étapes compile le front React et le sert depuis l’app FastAPI : la démo se déploie comme un seul service.',
        },
      },
    ],
    results: [
      { en: '70+ REST endpoints across 5 routers, 16-table data model.', fr: 'Plus de 70 endpoints REST répartis sur 5 routeurs, modèle de données de 16 tables.' },
      {
        en: 'Quality dashboard over 6 years of synthetic data (43,299 batches): quality score, yield, QC pass rate, open CAPAs, and drift detection comparing the last 90 days with the previous 90.',
        fr: 'Tableau de bord qualité sur 6 ans de données synthétiques (43 299 lots) : score qualité, rendement, taux de conformité QC, CAPA ouvertes et détection de dérive comparant les 90 derniers jours aux 90 précédents.',
      },
      { en: 'Public demo video.', fr: 'Vidéo de démonstration publique.' },
      { en: 'TODO(lucas): hackathon outcome or client feedback', fr: 'TODO(lucas): résultat du hackathon ou retour client' },
    ],
    metrics: [
      { value: '70+', caption: { en: 'API endpoints', fr: 'endpoints d’API' } },
      { value: '43k', caption: { en: 'synthetic batches analysed', fr: 'lots synthétiques analysés' } },
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
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'Gemini', 'React', 'Vite', 'Recharts', 'Docker'],
    links: [
      { kind: 'demo', href: 'https://youtu.be/1mw6pO0CnSs' },
      { kind: 'github', href: 'https://github.com/noasebag/NYOS-APR' },
    ],
    shots: [
      shot('nyos-apr', 'dashboard', 1600, 609, { en: 'Quality dashboard over six years: score, yield, QC pass rate, open CAPAs', fr: 'Tableau de bord qualité sur six ans : score, rendement, conformité QC, CAPA ouvertes' }),
      shot('nyos-apr', 'drift', 1600, 853, { en: 'Yield and complaint trends, drift detection and recent anomalies', fr: 'Tendances de rendement et de réclamations, détection de dérive et anomalies récentes' }),
      shot('nyos-apr', 'report', 669, 851, { en: 'APR report generation to PDF', fr: 'Génération du rapport APR en PDF' }),
      shot('nyos-apr', 'analytics', 1600, 892, { en: 'Advanced analytics across production, suppliers and equipment', fr: 'Analyses avancées par production, fournisseurs et équipements' }),
      shot('nyos-apr', 'generator', 1600, 896, { en: 'Synthetic data generator: 9 pharmaceutical CSV categories with hidden scenarios', fr: 'Générateur de données synthétiques : 9 catégories CSV pharmaceutiques avec scénarios cachés' }),
    ],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
  {
    slug: 'ecomuni',
    title: 'EcoMuni',
    kind: { en: 'Energy SaaS · IONIS GoodWill’s contest', fr: 'SaaS énergie · concours IONIS GoodWill’s' },
    pitch: {
      en: 'Energy-optimisation SaaS for French municipalities: consumption dashboard, AI anomaly detection, a Gemini assistant and Décret Tertiaire tracking — with no sensors and no works.',
      fr: 'SaaS d’optimisation énergétique pour les communes : tableau de bord des consommations, détection d’anomalies par IA, assistant Gemini et suivi du Décret Tertiaire — sans capteurs ni travaux.',
    },
    period: { en: 'Jan 2026', fr: 'janv. 2026' },
    role: { en: 'Solo: product, design and development', fr: 'Solo : produit, design et développement' },
    team: { en: 'Solo entry, IONIS GoodWill’s contest (EPITA)', fr: 'Candidature solo, concours IONIS GoodWill’s (EPITA)' },
    context: {
      en: 'Public buildings are a large share of a town’s running costs and CO₂ emissions, and every euro lost to energy waste is a euro less for schools or social services. Under the Décret Tertiaire, municipalities must also track and cut that consumption — but bills arrive after the fact and existing tools target large cities.',
      fr: 'Les bâtiments publics pèsent lourd dans les dépenses de fonctionnement et les émissions de CO₂ d’une commune, et chaque euro gaspillé en énergie manque à l’école ou au social. Avec le Décret Tertiaire, les communes doivent en plus suivre et réduire ces consommations — mais les factures arrivent après coup et les outils existants visent les grandes métropoles.',
    },
    decisions: [
      {
        title: { en: 'No sensors, no works: start from the bills', fr: 'Sans capteurs ni travaux : partir des factures' },
        body: {
          en: 'EcoMuni works from data towns already have — energy bills, consumption history, local weather and building type — so it deploys in hours. Incumbents (Deepki, Ubigreen, Energisme…) need sensors and cost €10–50k a year; the target price is about €1,100.',
          fr: 'EcoMuni s’appuie sur les données que les communes ont déjà — factures, historiques de consommation, météo locale et type de bâtiment — et se déploie en quelques heures. Les acteurs en place (Deepki, Ubigreen, Energisme…) demandent des capteurs et coûtent 10 à 50 k€ par an ; le prix visé est d’environ 1 100 €.',
        },
      },
      {
        title: { en: 'Outputs a council can act on', fr: 'Des livrables qu’un conseil municipal peut utiliser' },
        body: {
          en: 'Recommendations are costed in euros, kWh and CO₂, a before/after simulation shows the effect of renovation work before it is paid for, and PDF reports are ready for the council and citizens.',
          fr: 'Les recommandations sont chiffrées en euros, kWh et CO₂, une simulation avant/après montre l’effet des travaux avant de les engager, et les rapports PDF sont prêts pour le conseil municipal et les citoyens.',
        },
      },
    ],
    results: [
      {
        en: 'Working MVP: bill import, dashboard, building map, anomaly detection, Gemini assistant, costed recommendations, before/after simulation, PDF reports.',
        fr: 'MVP fonctionnel : import des factures, tableau de bord, carte des bâtiments, détection d’anomalies, assistant Gemini, recommandations chiffrées, simulation avant/après, rapports PDF.',
      },
      { en: 'TODO(lucas): contest outcome or one measurable result', fr: 'TODO(lucas): résultat du concours ou un résultat mesurable' },
    ],
    metrics: [
      { value: '0', caption: { en: 'sensors or works required', fr: 'capteur ou travaux requis' } },
      { value: '~€1.1k', caption: { en: 'target price per year (incumbents: €10–50k)', fr: 'prix visé par an (concurrents : 10–50 k€)' } },
    ],
    diagram: {
      title: { en: 'Architecture', fr: 'Architecture' },
      cols: 3,
      rows: 3,
      nodes: [
        { id: 'spa', label: 'Dashboard', sub: 'React · Vite · Leaflet', col: 0, row: 1 },
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
    stack: ['Python', 'FastAPI', 'React', 'Vite', 'Leaflet', 'Gemini', 'Docker'],
    // TODO(lucas): v1 linked github.com/LucRoDZ/EcoMuni, which returns 404. Make it public or add a demo link.
    links: [],
    shots: [
      shot('ecomuni', 'analyses', 1600, 693, { en: 'Energy diagnosis of a city: anomalies, recommendations, potential savings, consumption per m²', fr: 'Diagnostic énergétique d’une ville : anomalies, recommandations, économies potentielles, consommation au m²' }),
      shot('ecomuni', 'map', 1574, 822, { en: 'Map of public buildings coloured by energy intensity', fr: 'Carte des bâtiments publics colorés par intensité énergétique' }),
      shot('ecomuni', 'impact', 1593, 779, { en: 'Triple impact view: CO₂ avoided, savings and funded social projects', fr: 'Vue triple impact : CO₂ évité, économies et projets sociaux financés' }),
      shot('ecomuni', 'mobile', 318, 686, { en: 'Mobile dashboard', fr: 'Tableau de bord mobile' }, 'mobile'),
    ],
    differently: {
      en: 'TODO(lucas): one thing you would change with hindsight',
      fr: 'TODO(lucas): une chose que tu changerais avec le recul',
    },
  },
];
