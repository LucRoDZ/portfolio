import type { L, TwoWayExplanation } from './types';

/*
 * The same decision told twice: to the engineers who build it and to the people who fund or use it.
 * Every figure comes from content/case-studies.ts; nothing here is new information.
 */
export const explanations: TwoWayExplanation[] = [
  {
    project: 'Asmodee',
    slug: 'asmodee-ai-platform',
    topic: { en: 'Choosing an AI model', fr: 'Choisir un modèle d’IA' },
    technical: {
      en: 'I benchmarked 3 LLMs on generating the JSON that python-docx and xlsxwriter turn into files. Gemini won because it accepts a JSON schema in the request (structured output). Error rate went from 13% to 4%.',
      fr: 'J’ai comparé 3 LLM sur la génération du JSON que python-docx et xlsxwriter transforment en fichiers. Gemini l’a emporté grâce au structured output, qui impose un schéma JSON dans la requête. Le taux d’erreur est passé de 13 % à 4 %.',
    },
    business: {
      en: 'Word and Excel files produced by the AI are now right 96 times out of 100, against 87 before. Fewer manual fixes for the 800+ employees who use the tool.',
      fr: 'Les fichiers Word et Excel produits par l’IA sont justes 96 fois sur 100, contre 87 avant. Moins de corrections à la main pour les plus de 800 employés qui utilisent l’outil.',
    },
  },
  {
    project: 'Asmodee',
    slug: 'asmodee-ai-platform',
    topic: { en: 'Making the product safe to change', fr: 'Rendre le produit sûr à faire évoluer' },
    technical: {
      en: 'Pytest suites with shared fixtures and mocks for every external API, isolated Tox environments, and a run on every merge request in GitHub Actions. Coverage went from 0 to 88%.',
      fr: 'Des suites Pytest avec fixtures partagées et mocks pour chaque API externe, des environnements Tox isolés et une exécution à chaque merge request dans GitHub Actions. La couverture est passée de 0 à 88 %.',
    },
    business: {
      en: 'Every change is checked automatically before it reaches users. The team can add features without breaking the ones people already rely on.',
      fr: 'Chaque modification est vérifiée automatiquement avant d’arriver chez les utilisateurs. L’équipe peut ajouter des fonctionnalités sans casser celles sur lesquelles les gens comptent déjà.',
    },
  },
  {
    project: 'EASY.Q',
    slug: 'easyq',
    topic: { en: 'Hosting a SaaS', fr: 'Héberger un SaaS' },
    technical: {
      en: 'Static front-end on Vercel; FastAPI, PostgreSQL and Redis in Docker behind Nginx on one OVH VPS, with CI on every push and a 70% coverage gate.',
      fr: 'Front statique sur Vercel ; FastAPI, PostgreSQL et Redis dans Docker derrière Nginx sur un VPS OVH, avec une CI à chaque push et un seuil de couverture à 70 %.',
    },
    business: {
      en: 'The whole product runs for less than €10 a month and restaurant data stays in Europe. Costs stay low until there are customers to pay for more.',
      fr: 'Tout le produit tourne pour moins de 10 € par mois et les données des restaurants restent en Europe. Les coûts restent bas tant qu’il n’y a pas de clients pour en financer davantage.',
    },
  },
  {
    project: 'EcoMuni',
    slug: 'ecomuni',
    topic: { en: 'Detecting energy waste', fr: 'Détecter le gaspillage énergétique' },
    technical: {
      en: 'Anomaly detection over energy bills, consumption history, local weather and building type, with a Gemini assistant on top. No sensors, no IoT pipeline.',
      fr: 'Détection d’anomalies à partir des factures, des historiques de consommation, de la météo locale et du type de bâtiment, avec un assistant Gemini par-dessus. Pas de capteurs, pas de chaîne IoT.',
    },
    business: {
      en: 'A town can see where it wastes energy without buying equipment or starting works, for about €1,100 a year instead of €10k to €50k.',
      fr: 'Une commune voit où elle gaspille de l’énergie sans acheter de matériel ni lancer de travaux, pour environ 1 100 € par an au lieu de 10 000 à 50 000 €.',
    },
  },
];

/** What I hand over, depending on who reads it. */
export const deliverables: { technical: L[]; business: L[] } = {
  technical: [
    { en: 'Architecture and model choices backed by a benchmark', fr: 'Choix d’architecture et de modèles appuyés sur un benchmark' },
    { en: 'Automated tests and CI/CD from the first commits', fr: 'Tests automatisés et CI/CD dès les premiers commits' },
    { en: 'Docker setups a team can run on day one', fr: 'Environnements Docker qu’une équipe lance dès le premier jour' },
    { en: 'Handover documentation written for the next developer', fr: 'Documentation de passation écrite pour le développeur suivant' },
  ],
  business: [
    { en: 'Phased roadmaps that say what each phase delivers', fr: 'Roadmaps par phases qui disent ce que chaque phase livre' },
    { en: 'Figma mockups to agree on the product before building it', fr: 'Maquettes Figma pour valider le produit avant de le construire' },
    { en: 'Answers to calls for tender, from scoping to roadmap', fr: 'Réponses à appel d’offres, du cadrage à la roadmap' },
    { en: 'Reports and dashboards a non-technical board can act on', fr: 'Rapports et tableaux de bord exploitables par une direction non technique' },
  ],
};
