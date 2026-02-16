'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Projet 1',
    description: 'Description de votre premier projet avec les technologies utilisées.',
    tags: ['Next.js', 'TypeScript', 'Three.js'],
    link: '#',
  },
  {
    title: 'Projet 2',
    description: 'Description de votre deuxième projet avec les technologies utilisées.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Projet 3',
    description: 'Description de votre troisième projet avec les technologies utilisées.',
    tags: ['Python', 'Docker', 'API'],
    link: '#',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Mes Projets
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted p-6 rounded-lg hover:bg-muted/80 transition-colors duration-200 group"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-primary hover:text-primary-dark transition-colors duration-200"
                >
                  Voir le projet →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
