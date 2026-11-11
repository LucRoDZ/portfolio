import type { L, TimelineEntry } from './types';

export const work: TimelineEntry[] = [
  {
    start: '2025-12',
    type: 'work',
    period: { en: 'Since Dec 2025', fr: 'Depuis déc. 2025' },
    title: { en: 'Freelance developer & consultant', fr: 'Développeur & consultant freelance' },
    org: 'Auto-entrepreneur',
    place: { en: 'Paris and remote', fr: 'Paris et à distance' },
    bullets: [
      {
        en: 'Scope client needs into phased roadmaps (Jira, GitHub Projects) and UX mockups (Figma).',
        fr: 'Je traduis les besoins clients en roadmaps par phases (Jira, GitHub Projects) et en maquettes UX (Figma).',
      },
      {
        en: 'Build APIs and backends with AI integration, e.g. a proof of concept that detects manufacturing process drifts for annual product reporting.',
        fr: 'Je développe des API et des backends avec intégration IA, par exemple un POC de détection des dérives d’un procédé de fabrication pour le reporting produit annuel.',
      },
      {
        en: 'Set up Docker, CI/CD and handover documentation so clients can run what I deliver.',
        fr: 'Je mets en place Docker, la CI/CD et la documentation de passation pour que le client puisse exploiter ce que je livre.',
      },
    ],
    stack: ['Python', 'FastAPI', 'React', 'Next.js', 'Docker', 'CI/CD', 'Figma'],
  },
  {
    start: '2025-09',
    type: 'work',
    period: { en: 'Sept 2025 to Jan 2026', fr: 'sept. 2025 à janv. 2026' },
    title: { en: 'Full-stack developer intern', fr: 'Stagiaire développeur full-stack' },
    org: 'Asmodee',
    place: { en: 'Boulogne-Billancourt, AI and Data team', fr: 'Boulogne-Billancourt, équipe IA et Data' },
    bullets: [
      {
        en: 'Built an LLM-powered file generation service for a multi-LLM platform used by 800+ employees; benchmarked 3 models and cut the error rate from 13% to 4%.',
        fr: 'Développement d’un service de génération de fichiers par LLM pour une plateforme multi-LLM utilisée par plus de 800 employés ; comparaison de 3 modèles, taux d’erreur ramené de 13 % à 4 %.',
      },
      {
        en: 'Integrated Mistral OCR, DeepL and Whisper voice dictation into the FastAPI/LangChain backend.',
        fr: 'Intégration de Mistral OCR, DeepL et de la dictée vocale Whisper dans le backend FastAPI/LangChain.',
      },
      {
        en: 'Took backend test coverage from 0 to 88% (Pytest, Tox, GitHub Actions).',
        fr: 'Couverture de tests backend portée de 0 à 88 % (Pytest, Tox, GitHub Actions).',
      },
      {
        en: 'Worked in two-week Scrum sprints with daily stand-ups and code review before every merge.',
        fr: 'Travail en sprints Scrum de deux semaines, avec daily et revue de code avant chaque merge.',
      },
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'Pytest', 'GitHub Actions', 'Vue 3'],
  },
];

export const education: TimelineEntry[] = [
  {
    start: '2026-09',
    type: 'education',
    period: { en: 'Sept 2026 to Jan 2027', fr: 'sept. 2026 à janv. 2027' },
    title: { en: 'Exchange semester, Computer Science Engineering', fr: 'Semestre d’échange, Computer Science Engineering' },
    org: 'Shibaura Institute of Technology',
    place: { en: 'Tokyo, Japan, Master 2 level', fr: 'Tokyo, Japon, niveau Master 2' },
    bullets: [
      {
        en: 'Five-month semester at a Japanese engineering university known for its strong ties with industry, alongside Japanese and international students.',
        fr: 'Semestre de cinq mois dans une université d’ingénieurs japonaise reconnue pour ses liens avec l’industrie, avec des étudiants japonais et internationaux.',
      },
      {
        en: 'Coursework: Management of Innovation and International Marketing, Advanced Cognitive Ergonomics, Introduction to Affective Computing.',
        fr: 'Cours : Management of Innovation and International Marketing, Advanced Cognitive Ergonomics, Introduction to Affective Computing.',
      },
    ],
  },
  {
    start: '2024-09',
    type: 'education',
    period: { en: 'Sept 2024 to Aug 2027', fr: 'sept. 2024 à août 2027' },
    title: {
      en: 'Engineering degree (Master’s level), Computer Science and Global IT Management',
      fr: 'Diplôme d’ingénieur (niveau Master), informatique et Global IT Management',
    },
    org: 'EPITA',
    place: { en: 'Le Kremlin-Bicêtre, Paris area', fr: 'Le Kremlin-Bicêtre, Île-de-France' },
    bullets: [
      {
        en: 'Global IT Management major, taught entirely in English: technical depth combined with steering IT projects, governance, risk and teams in an international context.',
        fr: 'Majeure Global IT Management, entièrement en anglais, qui associe la technique au pilotage de projets IT, à la gouvernance, au risque et au management d’équipes dans un contexte international.',
      },
      {
        en: 'Coursework: IT governance, data governance, cyber risk management, Agile project delivery, vendor management, pitch and executive communication.',
        fr: 'Cours : gouvernance des SI, gouvernance des données, gestion du risque cyber, conduite de projet Agile, gestion des fournisseurs, pitch et communication auprès de la direction.',
      },
      {
        en: 'The engineering cycle started with EPITA’s intensive “Piscines”: algorithms and programming in several languages through solo and team projects (C, C++, Java).',
        fr: 'Le cycle a commencé par les « Piscines » intensives de l’EPITA : algorithmique et programmation dans plusieurs langages, en projets solo et en équipe (C, C++, Java).',
      },
    ],
  },
  {
    start: '2022-09',
    type: 'education',
    period: { en: '2022 to 2024', fr: '2022 à 2024' },
    title: { en: 'Preparatory classes (CPGE), MP2I then MPI', fr: 'Classes préparatoires (CPGE), MP2I puis MPI' },
    org: 'Lycée Camille Guérin',
    place: { en: 'Poitiers', fr: 'Poitiers' },
    bullets: [
      {
        en: 'Two-year intensive program in mathematics, physics and computer science, preparing for the competitive entrance exams of French engineering schools.',
        fr: 'Deux ans de programme intensif en mathématiques, physique et informatique, préparant aux concours des écoles d’ingénieurs.',
      },
      {
        en: 'Computer science: algorithms and data structures, graph and text algorithms, complexity, memory management, C and OCaml, relational databases (SQL).',
        fr: 'Informatique : algorithmique et structures de données, algorithmes de graphes et de texte, complexité, gestion de la mémoire, C et OCaml, bases de données relationnelles (SQL).',
      },
      {
        en: 'Mathematics and physics: linear algebra, analysis, probability and statistics, mechanics, thermodynamics, electromagnetism.',
        fr: 'Mathématiques et physique : algèbre linéaire, analyse, probabilités et statistiques, mécanique, thermodynamique, électromagnétisme.',
      },
    ],
  },
];

/** Work and education in one list, most recent start first. */
export function timeline(entries: TimelineEntry[] = [...work, ...education]): TimelineEntry[] {
  return [...entries].sort((a, b) => b.start.localeCompare(a.start));
}

export const earlier: L = {
  en: 'Software development intern at Serli (2019, a mobile app in JavaScript) and production operator at Elis (summer 2024).',
  fr: 'Stage de développement chez Serli (2019, application mobile en JavaScript) et opérateur de production chez Elis (été 2024).',
};

export const languages: L = {
  en: 'French (native), English (TOEIC 825)',
  fr: 'Français (langue maternelle), anglais (TOEIC 825)',
};
