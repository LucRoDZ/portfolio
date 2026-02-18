'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'A propos', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projets', href: '#projects' },
  { name: 'Parcours', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="relative group">
              <span className="text-2xl font-bold tracking-tight">
                <span className="gradient-text">LZ</span>
              </span>
            </a>
            
            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm text-text-secondary hover:text-foreground transition-colors duration-200 rounded-full hover:bg-white/[0.04]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="ml-4">
                <a
                  href="/cv-lucas-zivan.pdf"
                  className="px-5 py-2 text-sm rounded-full glass text-foreground hover:bg-white/[0.06] transition-all duration-200 font-medium"
                >
                  CV ↓
                </a>
              </li>
            </ul>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-light text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
