import { caseStudies } from './case-studies';
import { shot } from './shot';
import type { CaseStudy, LabProject, ProductProject, ProofMetric } from './types';

export { caseStudies };

/** Tier 1, in display order. Each one has a case-study page. */
export const flagshipSlugs = ['asmodee-ai-platform', 'easyq', 'tinyx'] as const;

export const productProjects: ProductProject[] = [
  {
    title: { en: 'Aurora International Academy', fr: 'Aurora International Academy' },
    kind: { en: 'Call for tender · led a team of 5', fr: 'Appel d’offres · équipe de 5 pilotée' },
    summary: {
      en: 'Our answer to an RFP for a school’s digital suite: a progressive web app designed from the client’s requirements, phased and mocked up.',
      fr: 'Notre réponse à un appel d’offres pour la suite numérique d’une école : une Progressive Web App conçue à partir du cahier des charges, phasée et maquettée.',
    },
    proof: [
      { en: 'Product scope and PWA suite design', fr: 'Cadrage produit et conception de la suite PWA' },
      { en: 'Delivery roadmap in 3 phases', fr: 'Roadmap de livraison en 3 phases' },
      { en: 'Figma mockups of the key screens', fr: 'Maquettes Figma des écrans clés' },
    ],
    stack: ['Figma', 'PWA', 'Roadmapping'],
    figure: { value: '3', caption: { en: 'roadmap phases', fr: 'phases de roadmap' } },
  },
  {
    title: { en: 'Strategic Business Simulation', fr: 'Strategic Business Simulation' },
    kind: { en: 'GITM major · management', fr: 'Majeure GITM · management' },
    summary: {
      en: 'Ran a fictional robotics company over 8 quarters, from the numbers to the CSR strategy.',
      fr: 'Pilotage d’une entreprise de robotique fictive sur 8 trimestres, des chiffres à la stratégie RSE.',
    },
    proof: [
      { en: 'Built the Excel strategy dashboard the team decided from', fr: 'Construction du tableau de bord stratégique Excel qui guidait les décisions' },
      { en: 'Led the CSR policy', fr: 'Pilotage de la politique RSE' },
    ],
    stack: ['Excel', 'Strategy', 'CSR'],
    figure: { value: '8', caption: { en: 'quarters of decisions', fr: 'trimestres de décisions' } },
  },
  {
    title: { en: 'Industrial drift detection POC', fr: 'POC de détection de dérives industrielles' },
    kind: { en: 'Freelance · confidential client', fr: 'Freelance · client confidentiel' },
    summary: {
      en: 'An AI backend that flags drifts in a manufacturing process for annual product reporting, delivered so the client can run it without me.',
      fr: 'Un backend IA qui signale les dérives d’un procédé de fabrication pour le reporting produit annuel, livré pour que le client puisse l’exploiter sans moi.',
    },
    proof: [
      { en: 'Needs scoped into a phased roadmap', fr: 'Besoins traduits en roadmap par phases' },
      { en: 'Docker, CI/CD and handover documentation', fr: 'Docker, CI/CD et documentation de passation' },
    ],
    stack: ['Python', 'FastAPI', 'Docker', 'CI/CD'],
  },
  {
    title: { en: 'NYOS APR & EcoMuni', fr: 'NYOS APR & EcoMuni' },
    kind: { en: 'AI SaaS · Gemini assistants', fr: 'SaaS IA · assistants Gemini' },
    summary: {
      en: 'Two data products with a Gemini assistant: pharmaceutical quality reporting and energy tracking for municipalities.',
      fr: 'Deux produits data avec assistant Gemini : reporting qualité pharmaceutique et suivi énergétique des communes.',
    },
    proof: [],
    stack: ['FastAPI', 'React', 'Gemini', 'Docker'],
    parts: [
      {
        slug: 'nyos-apr',
        title: 'NYOS APR',
        summary: {
          en: 'Drift detection and AI-drafted Annual Product Reviews for pharma quality teams.',
          fr: 'Détection de dérives et Annual Product Reviews rédigées par IA pour la qualité pharma.',
        },
        shot: shot('nyos-apr', 'dashboard', 1600, 609, { en: 'NYOS APR quality dashboard', fr: 'Tableau de bord qualité NYOS APR' }),
      },
      {
        slug: 'ecomuni',
        title: 'EcoMuni',
        summary: {
          en: 'Energy waste detection for municipal buildings, from the bills towns already have.',
          fr: 'Détection du gaspillage énergétique des bâtiments communaux, à partir des factures existantes.',
        },
        shot: shot('ecomuni', 'analyses', 1600, 693, { en: 'EcoMuni energy diagnosis', fr: 'Diagnostic énergétique EcoMuni' }),
      },
    ],
  },
];

export const labProjects: LabProject[] = [
  {
    title: { en: '42sh', fr: '42sh' },
    kind: { en: 'EPITA · one month', fr: 'EPITA · un mois' },
    summary: { en: 'An interactive POSIX shell: parsing, pipelines, redirections, built-ins.', fr: 'Un shell interactif POSIX : parsing, pipelines, redirections, builtins.' },
    stack: ['C', 'POSIX', 'Linux'],
    category: 'systems',
  },
  {
    title: { en: 'Tiger Compiler', fr: 'Tiger Compiler' },
    kind: { en: 'EPITA', fr: 'EPITA' },
    summary: { en: 'A full compiler for the Tiger language, from lexing to code generation.', fr: 'Un compilateur complet pour le langage Tiger, de l’analyse lexicale à la génération de code.' },
    stack: ['C++'],
    category: 'systems',
  },
  {
    title: { en: 'DataClash', fr: 'DataClash' },
    kind: { en: 'EPITA', fr: 'EPITA' },
    summary: {
      en: 'Complex SQL queries to extract and visualise data, including SQL injection exercises.',
      fr: 'Requêtes SQL complexes pour extraire et visualiser des données, dont des exercices d’injection SQL.',
    },
    stack: ['SQL', 'PostgreSQL'],
    category: 'data',
  },
  {
    title: { en: 'PING', fr: 'PING' },
    kind: { en: 'EPITA', fr: 'EPITA' },
    summary: {
      en: 'Java/Quarkus REST API with CRUD, file-system management and Swagger docs, plus a responsive React front-end.',
      fr: 'API REST Java/Quarkus (CRUD, gestion de fichiers, documentation Swagger) et front React responsive.',
    },
    stack: ['Java', 'Quarkus', 'React', 'REST'],
    category: 'web',
  },
  {
    title: { en: 'E-PLACE', fr: 'E-PLACE' },
    kind: { en: 'EPITA', fr: 'EPITA' },
    summary: {
      en: 'Front-end for a shared real-time pixel grid in the style of r/place, with token authentication.',
      fr: 'Front d’une grille de pixels partagée en temps réel façon r/place, avec authentification par token.',
    },
    stack: ['JavaScript', 'WebSocket', 'Canvas'],
    category: 'web',
  },
  {
    title: { en: 'Nail technician website', fr: 'Site de prothésiste ongulaire' },
    kind: { en: 'Freelance client', fr: 'Client freelance' },
    summary: {
      en: 'Live site for a nail technician: Instagram feed that updates itself, customer accounts and online booking.',
      fr: 'Site en ligne pour une prothésiste ongulaire : flux Instagram mis à jour automatiquement, comptes clients et prise de rendez-vous.',
    },
    stack: ['Next.js', 'Supabase', 'Clerk', 'Instagram API'],
    category: 'web',
    // TODO(lucas): confirm the client agrees to be linked.
    href: 'https://www.rosesnails.beauty',
    shot: shot('nail-landing', 'hero', 1600, 881, { en: 'Home page of the nail technician website', fr: 'Page d’accueil du site de la prothésiste ongulaire' }),
  },
  {
    title: { en: 'SnAick', fr: 'SnAick' },
    kind: { en: 'AI side project · in progress', fr: 'Projet IA personnel · en cours' },
    summary: {
      en: 'Cooking assistant: swipe-to-discover recipes, fridge scan with GPT-4 Vision, LangGraph agents and pgvector recommendations.',
      fr: 'Assistant de cuisine : recettes à swiper, scan du frigo par GPT-4 Vision, agents LangGraph et recommandations pgvector.',
    },
    stack: ['FastAPI', 'LangGraph', 'PostgreSQL', 'pgvector', 'Celery', 'Vue 3'],
    category: 'ai',
    // TODO(lucas): confirm the context (personal, school or client) — taken from the README only.
  },
];

/**
 * Hero band. "800+" counts employees with an account on the platform; the usage dashboard in the
 * internship report shows 932 accounts and 707 active users (21 Jan 2026), so do not call them "active".
 * TODO(lucas): the internship report (written mid-January) says 80% coverage — check that 88% is the final figure.
 */
export const heroMetrics: ProofMetric[] = [
  { value: '13% → 4%', caption: { en: 'error rate of LLM file generation', fr: 'taux d’erreur de la génération de fichiers par LLM' }, source: 'Asmodee' },
  { value: '0 → 88%', caption: { en: 'backend test coverage', fr: 'couverture de tests backend' }, source: 'Pytest · Tox · CI' },
  { value: '800+', caption: { en: 'employees on the multi-LLM platform', fr: 'employés sur la plateforme multi-LLM' }, source: 'Asmodee' },
  { value: '14', caption: { en: 'people led on a microservices architecture', fr: 'personnes pilotées sur une architecture microservices' }, source: 'TinyX' },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((p) => p.slug === slug);
}

export function flagshipProjects(): CaseStudy[] {
  return flagshipSlugs.map((slug) => {
    const project = getCaseStudy(slug);
    if (!project) throw new Error(`Unknown flagship case study: ${slug}`);
    return project;
  });
}
