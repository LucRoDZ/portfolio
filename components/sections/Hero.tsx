'use client';

import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.08)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-6 z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono tracking-wider text-text-secondary uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Disponible pour opportunités
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-8"
          >
            <span className="block gradient-text-subtle">Lucas</span>
            <span className="block gradient-text mt-2">ZIVAN</span>
          </motion.h1>
          
          {/* Role */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary" />
            <p className="text-lg md:text-xl text-text-secondary font-light tracking-wide">
              Full Stack Developer  ·  EPITA
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed mb-12"
          >
            Étudiant ingénieur à l'EPITA, passionné et curieux. Je conçois des applications et solutions modernes, performantes et bien architecturées.
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full transition-all duration-300 text-sm font-medium tracking-wide flex items-center gap-3 glow-sm hover:glow-md"
            >
              Voir mes projets
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass text-foreground hover:bg-white/5 transition-all duration-300 text-sm font-medium tracking-wide text-center"
            >
              Me contacter
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-text-tertiary tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
