import type { L } from './types';

/**
 * Three categories, no percentages. Each "production" item traces to Asmodee, freelance work or
 * EASY.Q. Removed from v1 because nothing on the site backs them: Kubernetes, Helm, ArgoCD,
 * Prometheus, Grafana, Loki, Kotlin. TODO(lucas): re-add any you can point to a project for.
 */
export const skillGroups: { id: 'production' | 'comfortable' | 'management'; items: (string | L)[] }[] = [
  {
    id: 'production',
    items: [
      'Python',
      'FastAPI',
      'LangChain / LangGraph',
      'LLM APIs (OpenAI, Mistral, Gemini, Whisper)',
      'Pytest / Tox',
      'Docker',
      'GitHub Actions',
      'Vue 3 / Pinia',
      'React',
      'Redis',
      'Tailwind CSS',
      'Git',
    ],
  },
  {
    id: 'comfortable',
    items: [
      'TypeScript',
      'Next.js',
      'Java / Quarkus',
      'PostgreSQL / SQL',
      'CI/CD (GitLab CI)',
      'WebSocket / SSE',
      'Stripe API',
      'Nginx',
      'OVH, Vercel',
      'Azure',
      'Linux',
      'C',
    ],
  },
  {
    id: 'management',
    items: [
      'Scrum / Agile',
      { en: 'Answering calls for tender (RFP)', fr: 'Réponse à appel d’offres (RFP)' },
      { en: 'Phased roadmaps', fr: 'Roadmaps par phases' },
      'Figma',
      { en: 'Dashboards (Excel, Power BI)', fr: 'Tableaux de bord (Excel, Power BI)' },
      'Jira, Asana, GitHub Projects',
      { en: 'Handover documentation', fr: 'Documentation de passation' },
    ],
  },
];

/** Notions: used in school projects or briefly; listed apart so the three categories stay honest. */
export const familiar = ['C++', 'Elasticsearch', 'Neo4j', 'NestJS'];
