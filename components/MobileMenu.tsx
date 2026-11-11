'use client';

import { useEffect, useId, useState } from 'react';
import { Close, Menu } from './icons';

/** Disclosure menu for small screens. Closes on link click and on Escape. */
export function MobileMenu({
  links,
  cta,
  openLabel,
  closeLabel,
}: {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-rule bg-surface text-fg"
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        {open ? <Close className="size-5" /> : <Menu className="size-5" />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-bg shadow-card"
      >
        <ul className="page flex flex-col py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-rule text-body font-medium last:border-b-0 hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a href={cta.href} onClick={() => setOpen(false)} className="btn-primary w-full">
              {cta.label}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
