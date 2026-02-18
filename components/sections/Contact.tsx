'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/LucRoDZ',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zivan-lucas-a057542a4',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:lucaszivanpro@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

const EMAIL = 'lucaszivanpro@gmail.com';

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold gradient-text hover:opacity-80 transition-opacity duration-300 cursor-pointer break-all sm:break-normal"
    >
      {EMAIL}
      <span className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0">
        {copied ? (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 relative">
      <div className="section-divider" />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.06)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-6 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="// Contact"
            title="Travaillons ensemble."
            description="Vous avez un projet intéressant ? Vous cherchez un développeur motivé pour un stage ou une alternance ? Parlons-en."
            align="center"
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <CopyEmail />
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-16"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 rounded-full glass hover:bg-white/[0.06] transition-all duration-300"
              >
                <span className="text-text-secondary group-hover:text-foreground transition-colors">
                  {social.icon}
                </span>
                <span className="text-sm text-text-secondary group-hover:text-foreground transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 relative">
      <div className="section-divider" />
      <div className="container mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold gradient-text">Lucas ZIVAN</span>
            <span className="text-xs text-text-tertiary font-mono">© 2026</span>
          </div>
          <p className="text-xs text-text-tertiary font-mono tracking-wider">
            Conçu & développé avec passion
          </p>
        </div>
      </div>
    </footer>
  );
}
