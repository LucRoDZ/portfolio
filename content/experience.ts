import type { L, TimelineEntry } from './types';

export const work: TimelineEntry[] = [
  {
    period: { en: 'Dec 2025 – now', fr: 'déc. 2025 – aujourd’hui' },
    title: { en: 'Freelance developer', fr: 'Développeur freelance' },
    org: 'Auto-entrepreneur',
    place: { en: 'Paris', fr: 'Paris' },
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
    stack: ['Python', 'FastAPI', 'React', 'Docker', 'CI/CD', 'Figma'],
  },
  {
    period: { en: 'Sept 2025 – Jan 2026', fr: 'sept. 2025 – janv. 2026' },
    title: { en: 'Full-stack developer intern', fr: 'Stagiaire développeur full-stack' },
    org: 'Asmodee',
    place: { en: 'Boulogne-Billancourt', fr: 'Boulogne-Billancourt' },
    bullets: [
      {
        en: 'Built an LLM-powered file generation service for a multi-LLM platform used by 800+ employees; benchmarked 3 models and cut the error rate from 13% to 4%.',
        fr: 'Développement d’un service de génération de fichiers par LLM pour une plateforme multi-LLM utilisée par plus de 800 employés ; comparaison de 3 modèles, taux d’erreur ramené de 13 % à 4 %.',
      },
      {
        en: 'Integrated Mistral OCR, DeepL and Whisper voice dictation into the FastAPI/LangChain backend.',
        fr: 'Intégration de Mistral OCR, DeepL et de la dictée vocale Whisper dans le backend FastAPI/LangChain.',
      },
      {
        en: 'Took backend test coverage from 0 to 88% (Pytest, Tox, GitHub Actions).',
        fr: 'Couverture de tests backend portée de 0 à 88 % (Pytest, Tox, GitHub Actions).',
      },
      {
        en: 'Shipped a Projects feature and a full responsive and localisation overhaul (Vue 3, Pinia, Tailwind).',
        fr: 'Livraison d’une fonctionnalité Projets et d’une refonte responsive et localisation complète (Vue 3, Pinia, Tailwind).',
      },
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'Pytest', 'GitHub Actions', 'Vue 3'],
  },
];

export const education: TimelineEntry[] = [
  {
    period: { en: 'Sept 2026 – Jan 2027', fr: 'sept. 2026 – janv. 2027' },
    title: { en: 'Exchange semester', fr: 'Semestre d’échange' },
    org: 'Shibaura Institute of Technology',
    place: { en: 'Tokyo', fr: 'Tokyo' },
    bullets: [
      {
        en: 'Advanced Cognitive Ergonomics; Introduction to Affective Computing.',
        fr: 'Advanced Cognitive Ergonomics ; Introduction to Affective Computing.',
      },
    ],
  },
  {
    period: { en: '2024 – 2027', fr: '2024 – 2027' },
    title: { en: 'Engineering degree, final year', fr: 'Cycle ingénieur, dernière année' },
    org: 'EPITA',
    place: { en: 'Paris · Global IT Management major', fr: 'Paris · majeure Global IT Management' },
    bullets: [],
  },
  {
    period: { en: '2022 – 2024', fr: '2022 – 2024' },
    title: { en: 'Preparatory classes (CPGE)', fr: 'Classes préparatoires (CPGE)' },
    org: 'Lycée Camille Guérin',
    place: { en: 'Poitiers', fr: 'Poitiers' },
    bullets: [],
  },
];

export const earlier: L = {
  en: 'Software development intern at Serli (2019, a mobile app in JavaScript) · Production operator at Elis (summer 2024).',
  fr: 'Stage de développement chez Serli (2019, application mobile en JavaScript) · Opérateur de production chez Elis (été 2024).',
};

export const languages: L = {
  en: 'French (native) · English (TOEIC 825)',
  fr: 'Français (langue maternelle) · Anglais (TOEIC 825)',
};
