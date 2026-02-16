'use client';

import { motion } from 'framer-motion';

const skills = [
  'React / Next.js',
  'TypeScript',
  'Three.js',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'Git',
];

export function About() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            À Propos
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Développeur passionné avec une expertise en développement web moderne et en visualisation 3D. 
              Je crée des expériences web interactives et performantes qui combinent design élégant et 
              technologies de pointe.
            </p>
            
            <h3 className="text-2xl font-bold mb-6">Compétences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-4 rounded-lg text-center hover:bg-primary/10 transition-colors duration-200"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
