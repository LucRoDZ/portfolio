'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import Image from 'next/image';

interface Tech {
  name: string;
  icon: string;
  color: string;
  level: number;
}

interface Category {
  label: string;
  techs: Tech[];
}

const categories: Category[] = [
  {
    label: 'Frontend',
    techs: [
      { name: 'React',      icon: '/icons/react.svg',      color: '#61dafb', level: 80 },
      { name: 'Vue.js',     icon: '/icons/vuejs.svg',      color: '#42b883', level: 65 },
      { name: 'Streamlit',  icon: '/icons/streamlit.svg',  color: '#ff4b4b', level: 70 },
      { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178c6', level: 65 },
      { name: 'JavaScript', icon: '/icons/javascript.svg', color: '#f7df1e', level: 90 },
      { name: 'HTML',       icon: '/icons/html5.svg',      color: '#e34c26', level: 80 },
      { name: 'CSS',        icon: '/icons/css3.svg',       color: '#264de4', level: 70 },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'Java',       icon: '/icons/java.svg',       color: '#f89820', level: 75 },
      { name: 'Python',     icon: '/icons/python.svg',     color: '#4b8bbe', level: 85 },
      { name: 'C',          icon: '/icons/c.svg',          color: '#a8b9cc', level: 80 },
      { name: 'C++',        icon: '/icons/cplusplus.svg',  color: '#659ad2', level: 60 },
      { name: 'Kotlin',     icon: '/icons/kotlin.svg',     color: '#B125EA', level: 40 },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#336791', level: 80 },
      { name: 'MySQL',      icon: '/icons/mysql.svg',      color: '#00758f', level: 65 },
    ],
  },
  {
    label: 'DevOps & Tools',
    techs: [
      { name: 'Git',            icon: '/icons/git.svg',            color: '#f05032', level: 85 },
      { name: 'Docker',         icon: '/icons/docker.svg',         color: '#2496ed', level: 65 },
      { name: 'Kubernetes',     icon: '/icons/kubernetes.svg',     color: '#326CE5', level: 55 },
      { name: 'GitHub Actions', icon: '/icons/github-actions.svg', color: '#2088FF', level: 60 },
      { name: 'Power BI',       icon: '/icons/powerbi.svg',        color: '#F2C811', level: 60 },
      { name: 'Prometheus',     icon: '/icons/prometheus.svg',     color: '#E6522C', level: 55 },
      { name: 'Grafana',        icon: '/icons/grafana.svg',        color: '#F46800', level: 55 },
      { name: 'Loki',           icon: '/icons/loki.svg',           color: '#F9B730', level: 50 },
      { name: 'Linux',          icon: '/icons/linux.svg',          color: '#fcc624', level: 75 },
    ],
  },
];

function TechRow({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      viewport={{ once: true }}
      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Logo */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
        <Image
          src={tech.icon}
          alt={tech.name}
          width={28}
          height={28}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-foreground">{tech.name}</span>
          <span className="text-[11px] font-mono text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
            {tech.level}%
          </span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${tech.level}%` }}
            transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            viewport={{ once: true }}
            className="h-full rounded-full"
            style={{ backgroundColor: tech.color }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 relative">
      <div className="section-divider" />
      <div className="container mx-auto px-6 pt-16">
        <SectionHeading
          label="// Stack"
          title="Technologies."
          description="Les outils et langages que j'utilise au quotidien."
        />

        <div className="mt-16 space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-sm font-mono text-text-tertiary tracking-wider uppercase">
                {category.label}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.techs.map((tech, i) => (
                  <TechRow key={tech.name} tech={tech} index={catIndex * 5 + i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
