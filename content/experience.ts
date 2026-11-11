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
    title: { en: 'Exchange semester', fr: 'Semestre d’échange' },
    org: 'Shibaura Institute of Technology',
    place: { en: 'Tokyo, Japan', fr: 'Tokyo, Japon' },
    bullets: [
      {
        en: 'Advanced Cognitive Ergonomics; Introduction to Affective Computing.',
        fr: 'Advanced Cognitive Ergonomics ; Introduction to Affective Computing.',
      },
    ],
  },
  {
    start: '2024-09',
    type: 'education',
    period: { en: '2024 to 2027', fr: '2024 à 2027' },
    title: { en: 'Engineering degree, Global IT Management major', fr: 'Cycle ingénieur, majeure Global IT Management' },
    org: 'EPITA',
    place: { en: 'Paris', fr: 'Paris' },
    bullets: [
      {
        en: 'Software engineering (C, C++, Java, microservices) and IT management: project management, business simulation, answering calls for tender.',
        fr: 'Ingénierie logicielle (C, C++, Java, microservices) et management des SI : gestion de projet, simulation d’entreprise, réponse à appel d’offres.',
      },
    ],
  },
  {
    start: '2022-09',
    type: 'education',
    period: { en: '2022 to 2024', fr: '2022 à 2024' },
    title: { en: 'Preparatory classes (CPGE)', fr: 'Classes préparatoires (CPGE)' },
    org: 'Lycée Camille Guérin',
    place: { en: 'Poitiers', fr: 'Poitiers' },
    bullets: [],
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
