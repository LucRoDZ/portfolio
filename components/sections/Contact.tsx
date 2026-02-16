'use client';

import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Travaillons Ensemble
          </h2>
          
          <p className="text-lg text-foreground/80 mb-12">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@exemple.com"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
            >
              Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
      
      <footer className="mt-20 text-center text-foreground/60">
        <p>© 2026 Lucas ZIVAN. Tous droits réservés.</p>
      </footer>
    </section>
  );
}
