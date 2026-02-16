'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Lucas ZIVAN
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Développeur Full Stack | Formation EPITA
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
            >
              Me contacter
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
