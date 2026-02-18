'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const timeline = [
  {
    period: 'Déc 2025 — Présent',
    title: 'Développeur Freelance',
    subtitle: 'Auto-entrepreneur, Paris',
    description: 'Développement de solutions SAAS, d\'applications web full stack (Python, JavaScript, React). Conception d\'API et architectures backend. Mise en place d\'environnements de production, tests et déploiement (Docker, CI/CD).',
    tags: ['Python', 'React', 'JavaScript', 'Docker', 'CI/CD'],
    type: 'work' as const,
  },
  {
    period: 'Sept 2025 — Jan 2026',
    title: 'Stage Développeur Full Stack',
    subtitle: 'Asmodee, Boulogne-Billancourt',
    description: 'Développement d\'un chatbot intelligent pour +800 utilisateurs. Backend Python (FastAPI), tests unitaires (Pytest, Tox, GitHub Actions), améliorations frontend (Vue 3, Tailwind CSS).',
    tags: ['Python', 'FastAPI', 'Vue.js', 'Tailwind', 'GitHub Actions'],
    type: 'work' as const,
  },
  {
    period: 'Sept 2024 — Août 2027',
    title: 'EPITA — Cycle Ingénieur',
    subtitle: 'Majeure Global IT Management, Le Kremlin-Bicêtre',
    description: 'Formation intensive en informatique : algorithmique, architecture logicielle, systèmes distribués, gestion de projet.',
    tags: ['C/C++', 'Java', 'SQL', 'Linux', 'Réseaux'],
    type: 'education' as const,
  },
  {
    period: 'Sept 2022 — Juin 2024',
    title: 'Classe Préparatoire (CPGE)',
    subtitle: 'Lycée Camille Guérin, Poitiers',
    description: 'Classes préparatoires aux grandes écoles. Développement de l\'autonomie, gestion du stress, capacité d\'analyse et d\'adaptation.',
    tags: ['Mathématiques', 'Informatique', 'Physique'],
    type: 'education' as const,
  },
  {
    period: 'Sept 2021 — Juil 2022',
    title: 'Baccalauréat Général',
    subtitle: 'Lycée Guy Chauvet, Loudun',
    description: 'Baccalauréat général avec spécialités scientifiques. Obtenu avec mention.',
    tags: ['Mathématiques', 'Physique-Chimie', 'Anglais LLCE'],
    type: 'education' as const,
  },
  {
    period: 'Juin 2024 — Août 2024',
    title: 'Opérateur de production (Job d\'été)',
    subtitle: 'Elis Touraine, Loudun',
    description: 'Alimentation d\'une ligne de production et contrôle qualité en continu. Respect des consignes de sécurité et d\'hygiène.',
    tags: ['Production', 'Qualité', 'Rigueur'],
    type: 'work' as const,
  },
  {
    period: 'Jan 2019 — Fév 2019',
    title: 'Stage Développement Informatique',
    subtitle: 'Serli, Chasseneuil-du-Poitou',
    description: 'Création d\'une application mobile en JavaScript. Prise en main d\'une documentation détaillée pour faire évoluer l\'application.',
    tags: ['JavaScript', 'Mobile', 'Documentation'],
    type: 'work' as const,
  },
];

function TimelineItem({ item, index, total, color }: { item: typeof timeline[number]; index: number; total: number; color: 'primary' | 'accent' }) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      {index < total - 1 && (
        <div className="absolute left-[3px] top-3 bottom-0 w-px bg-border" />
      )}

      {/* Timeline dot */}
      <div className={`absolute left-0 top-2 w-[7px] h-[7px] rounded-full border-2 transition-colors duration-300 ${
        color === 'primary'
          ? 'border-primary bg-primary group-hover:shadow-[0_0_12px_rgba(167,139,250,0.5)]'
          : 'border-accent bg-accent group-hover:shadow-[0_0_12px_rgba(6,182,212,0.5)]'
      }`} />

      {/* Period */}
      <span className="text-xs font-mono text-text-tertiary tracking-wider mb-2 block">
        {item.period}
      </span>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold mb-1">
        {item.title}
      </h3>

      {/* Subtitle */}
      <p className={`text-sm mb-3 ${color === 'primary' ? 'text-primary' : 'text-accent'}`}>{item.subtitle}</p>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed text-sm mb-4">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/[0.03] text-text-tertiary border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const workItems = timeline.filter((item) => item.type === 'work');
  const educationItems = timeline.filter((item) => item.type === 'education');

  return (
    <section id="experience" className="py-32 md:py-40 relative">
      <div className="section-divider" />
      <div className="container mx-auto px-6 pt-16">
        <SectionHeading
          label="// Parcours"
          title="Expérience & formation."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Expérience column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-primary">
                Expérience
              </h3>
              <div className="flex-1 h-px bg-primary/20" />
            </motion.div>
            {workItems.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} total={workItems.length} color="primary" />
            ))}
          </div>

          {/* Formation column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent">
                Formation
              </h3>
              <div className="flex-1 h-px bg-accent/20" />
            </motion.div>
            {educationItems.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} total={educationItems.length} color="accent" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
