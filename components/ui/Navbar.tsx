'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Accueil', href: '#home' },
  { name: 'À Propos', href: '#about' },
  { name: 'Projets', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            LucRoDZ
          </Link>
          
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
