/**
 * Three tiers, no percentages. Each "production" tag must trace to Asmodee, freelance work or EASY.Q.
 * Removed from v1 because nothing on the site backs them: Kubernetes, Helm, ArgoCD, Prometheus,
 * Grafana, Loki, Power BI, Kotlin. TODO(lucas): re-add any you can point to a project for.
 */
export const skillTiers = {
  production: [
    'Python',
    'FastAPI',
    'LangChain',
    'LLM APIs (Mistral, Gemini, Whisper)',
    'Pytest / Tox',
    'Vue 3 / Pinia',
    'React',
    'Tailwind CSS',
    'PostgreSQL',
    'Redis',
    'Docker',
    'GitHub Actions',
    'OVH',
    'Git',
  ],
  // TODO(lucas): confirm the tier for Azure and NestJS — v1 mentioned Azure deployments in freelance
  // work, and NestJS is in your stack list, but no project on the site shows either yet.
  comfortable: [
    'TypeScript',
    'Next.js',
    'NestJS',
    'Vite',
    'Java / Quarkus',
    'SQL',
    'GitLab CI',
    'Azure',
    'Linux',
    'C',
    'Figma',
    'Jira',
  ],
  familiar: ['C++', 'Elasticsearch', 'Neo4j', 'Streamlit', 'WebSocket / SSE', 'Stripe API'],
} as const;

export type SkillTier = keyof typeof skillTiers;
