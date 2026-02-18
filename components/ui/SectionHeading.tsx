'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ label, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-primary mb-4"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
