'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const stats = [
  { value: '21', label: 'Ans' },
  { value: 'EPITA', label: 'Cycle Ingénieur (2024-2027)' },
  { value: 'Projets', label: '+10 Projets réalisés' },
  { value: 'Freelance', label: '2025-présent' },
];

export function About() {
  return (
    <section id="about" className="py-32 md:py-40 relative">
      <div className="section-divider" />
      <div className="container mx-auto px-6 pt-16">
        <SectionHeading
          label="// À propos"
          title="Passionné, curieux et motivé."
          description="Actuellement en deuxième année du cycle ingénieur à l'EPITA Paris (majeure Global IT Management), je renforce mes compétences en informatique et développe des applications."
        />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {/* Left column - text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-text-secondary leading-relaxed">
              Après une CPGE au Lycée Camille Guérin (Poitiers), j'ai intégré l'EPITA où je développe mes compétences en architecture logicielle, algorithmique et systèmes distribués.
            </p>
            <p className="text-text-secondary leading-relaxed">
              En parallèle, je suis développeur en freelance : conception d'applications web, de solutions SAAS, API et architectures backend, déploiement avec Docker et Portail Azure.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-300 text-sm font-medium group"
              >
                Me contacter
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl font-bold gradient-text block mb-2">{stat.value}</span>
                <span className="text-xs text-text-tertiary font-mono tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
