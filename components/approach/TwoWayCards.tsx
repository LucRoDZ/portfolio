'use client';

import { useState } from 'react';

type Audience = 'business' | 'technical';

/** Already-localised card, so this client component ships no dictionary. */
export interface TwoWayCard {
  project: string;
  href?: string;
  topic: string;
  technical: string;
  business: string;
}

/** The same four decisions, switched between the management and the engineering version. */
export function TwoWayCards({
  cards,
  labels,
}: {
  cards: TwoWayCard[];
  labels: { group: string; technical: string; business: string; readMore: string };
}) {
  const [audience, setAudience] = useState<Audience>('business');
  const options: { id: Audience; label: string }[] = [
    { id: 'business', label: labels.business },
    { id: 'technical', label: labels.technical },
  ];

  return (
    <div>
      <div role="group" aria-label={labels.group} className="inline-flex rounded-full border border-rule bg-surface p-1 shadow-card">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={audience === o.id}
            onClick={() => setAudience(o.id)}
            className="min-h-10 rounded-full px-4 text-meta font-strong text-muted transition-colors hover:text-fg aria-pressed:bg-accent aria-pressed:text-on-accent sm:px-5"
          >
            {o.label}
          </button>
        ))}
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <li key={c.topic} className="card flex flex-col p-6 sm:p-8">
            <p className="text-meta font-strong text-accent">{c.project}</p>
            <h3 className="mt-2 text-h4 font-strong">{c.topic}</h3>
            <p className="mt-3 text-muted" aria-live="polite">
              {audience === 'business' ? c.business : c.technical}
            </p>
            {c.href && (
              <a href={c.href} className="link mt-auto self-start pt-5 text-meta font-medium">
                {labels.readMore}
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
