'use client';

import { useState } from 'react';
import type { LabCategory } from '@/content/types';
import { filterLab, labCategories, type LabFilter } from '@/lib/lab';
import { ArrowUpRight } from '../icons';

/** Already-localised row, so this client component ships no dictionary. */
export interface LabRow {
  title: string;
  kind: string;
  summary: string;
  stack: string[];
  category: LabCategory;
  href?: string;
  thumb?: { src: string; alt: string };
}

export interface LabLabels {
  filter: string;
  all: string;
  categories: Record<LabCategory, string>;
  project: string;
  summary: string;
  stack: string;
  live: string;
  external: string;
  /** Contains `{count}`. */
  count: string;
}

export function LabList({ rows, labels }: { rows: LabRow[]; labels: LabLabels }) {
  const [filter, setFilter] = useState<LabFilter>('all');
  const visible = filterLab(rows, filter);
  const options: LabFilter[] = ['all', ...labCategories(rows)];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={filter === o}
              onClick={() => setFilter(o)}
              className="min-h-9 rounded-full border border-rule bg-surface px-4 font-mono text-micro uppercase text-muted transition-colors hover:border-rule-strong hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
            >
              {o === 'all' ? labels.all : labels.categories[o]}
            </button>
          ))}
        </div>
        <p className="meta" aria-live="polite">
          {labels.count.replace('{count}', String(visible.length))}
        </p>
      </div>

      <div className="card mt-6 overflow-hidden">
        <div aria-hidden="true" className="hidden grid-cols-12 gap-6 border-b border-rule bg-sunken px-6 py-3 font-mono text-micro uppercase text-muted md:grid">
          <span className="col-span-3">{labels.project}</span>
          <span className="col-span-6">{labels.summary}</span>
          <span className="col-span-3">{labels.stack}</span>
        </div>
        <ul className="divide-y divide-rule">
          {visible.map((r) => (
            <li key={r.title} className="grid gap-x-6 gap-y-2 px-5 py-5 md:grid-cols-12 md:px-6">
              <div className="md:col-span-3">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 font-strong">
                    {r.title}
                    <ArrowUpRight className="size-3.5" />
                    <span className="sr-only">
                      {' '}
                      ({labels.live}, {labels.external})
                    </span>
                  </a>
                ) : (
                  <span className="font-strong">{r.title}</span>
                )}
                <p className="mt-1 font-mono text-micro text-muted">
                  {labels.categories[r.category]} · {r.kind}
                </p>
              </div>
              <div className="flex gap-4 md:col-span-6">
                {r.thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.thumb.src}
                    alt={r.thumb.alt}
                    width={96}
                    height={53}
                    loading="lazy"
                    decoding="async"
                    className="hidden h-[53px] w-24 shrink-0 rounded-sm border border-rule object-cover object-top sm:block"
                  />
                )}
                <p className="text-muted">{r.summary}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5 md:col-span-3">
                {r.stack.map((s) => (
                  <li key={s} className="pill">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
