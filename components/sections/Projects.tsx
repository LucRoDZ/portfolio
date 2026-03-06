'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const projects = [    {
    title: 'Chatbot IA Asmodee',
    description: 'Chatbot intelligent pour les employés d\'Asmodee (+800 utilisateurs). Backend Python (FastAPI), tests unitaires (Pytest, Tox, GitHub Actions), frontend Vue 3 & Tailwind.',
    tags: ['Python', 'FastAPI', 'Vue.js', 'Tailwind', 'CI/CD'],
    github: '#',
    featured: false,
  },
  {
    title: 'EcoMuni',
    description: 'SaaS d\'optimisation énergétique pour municipalités françaises. Dashboard interactif, détection d\'anomalies par IA, assistant conversationnel (Google Gemini), rapports PDF, suivi Décret Tertiaire et simulations avant/après travaux.',
    tags: ['Python', 'FastAPI', 'React', 'Vite', 'Gemini AI'],
    github: 'https://github.com/LucRoDZ/EcoMuni',
    featured: false,
  },
  {
    title: 'NYOS ARP',
    description: 'Plateforme full-stack d\'intelligence qualité pharmaceutique pour l\'Annual Product Review (APR). Dashboard analytique avancé avec Streamlit, génération de données synthétiques, et assistant IA (Google Gemini) pour analyser les données de fabrication, détecter les tendances et générer des rapports.',
    tags: ['Python', 'Streamlit', 'FastAPI', 'Gemini AI', 'SQLite', 'Pandas'],
    github: '#',
    featured: false,
  },
  {
    title: 'PING',
    description: 'Application web full stack : API REST en Java (Quarkus) avec gestion CRUD, systèmes de fichiers et documentation Swagger. Frontend responsive connecté au back en React et CSS.',
    tags: ['Java', 'Quarkus', 'React', 'CSS', 'REST API'],
    github: '#',
    featured: false,
  },
  {
    title: 'Tiger Compiler',
    description: 'Réalisation d\'un compilateur complet pour le langage Tiger en C++. Approfondissement de l\'orienté objet et de l\'architecture des compilateurs.',
    tags: ['C++', 'Compilateur', 'OOP', 'Architecture'],
    github: '#',
    featured: false,
  },
  {
    title: '42sh',
    description: 'Conception et réalisation d\'un shell interactif respectant la norme POSIX en C. Réalisé en un mois en équipe.',
    tags: ['C', 'POSIX', 'Shell', 'Linux'],
    github: '#',
    featured: false,
  },
  {
    title: 'DataClash',
    description: 'Analyse et manipulation de données. Injection SQL et développement de requêtes complexes pour l\'extraction et la visualisation de données.',
    tags: ['SQL', 'PostgreSQL', 'Data', 'Analyse'],
    github: '#',
    featured: false,
  },
  {
    title: 'E-PLACE',
    description: 'Frontend JavaScript reproduisant l\'expérience collaborative de Reddit r/place. Interaction en temps réel sur une grille partagée avec authentification par token.',
    tags: ['JavaScript', 'WebSocket', 'Canvas', 'Auth'],
    github: '#',
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative glass rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Gradient border hover effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
           style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(6,182,212,0.1))' }} />
      
      <div className="p-8 md:p-10">
        {/* Project number */}
        <span className="text-xs font-mono text-text-tertiary mb-6 block tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-full bg-white/[0.04] text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 md:py-40 relative">
      <div className="section-divider" />
      <div className="container mx-auto px-6 pt-16">
        <SectionHeading
          label="// Projets"
          title="Travaux sélectionnés."
          description="Une sélection de projets qui reflètent mon expertise technique et ma passion pour le développement web."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
