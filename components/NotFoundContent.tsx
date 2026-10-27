'use client';

import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/content/dictionaries/en';
import { defaultLocale, isLocale } from '@/lib/locale';

export function NotFoundContent({ copy }: { copy: Record<string, Dictionary['notFound']> }) {
  const first = usePathname().split('/')[1];
  const locale = isLocale(first) ? first : defaultLocale;
  const text = copy[locale];
  return (
    <main id="main" className="page-grid min-h-[60vh] content-center gap-y-6 py-24">
      <p className="col-label meta">404</p>
      <div className="col-body">
        <h1 className="text-h2 font-strong">{text.title}</h1>
        <p className="mt-4 text-lead text-muted">{text.body}</p>
        <a href={`/${locale}`} className="btn-secondary mt-8">
          {text.home}
        </a>
      </div>
    </main>
  );
}
