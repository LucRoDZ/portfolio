import type { Dictionary } from '@/content/dictionaries/en';
import { heroMetrics } from '@/content/projects';
import { cvFor, site } from '@/content/site';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { Download } from '../icons';

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict;
  const cv = cvFor(locale);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Dotted grid, faded towards the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--rule-strong)_1px,transparent_1px)] [background-size:22px_22px] opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_20%,black,transparent)]"
      />
      <div className="page relative pt-14 pb-20 md:pt-24 md:pb-28">
        <p className="flex max-w-prose items-start gap-2.5 text-meta font-medium animate-rise">
          <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 rounded-full bg-accent" />
          {hero.availability}
        </p>

        <h1
          id="hero-title"
          className="mt-7 max-w-5xl text-h2 font-strong text-balance animate-rise [animation-delay:60ms] sm:text-h1 lg:text-display"
        >
          {hero.headlineBefore}
          <span className="text-accent">{hero.headlineAccent}</span>
          {hero.headlineAfter}
        </h1>

        <p className="mt-7 max-w-prose text-lead text-muted animate-rise [animation-delay:120ms]">{hero.lead}</p>

        <div className="mt-9 flex flex-wrap gap-3 animate-rise [animation-delay:180ms]">
          <a href={`mailto:${site.email}`} className="btn-primary">
            {hero.ctaContact}
          </a>
          <a href="#projects" className="btn-secondary">
            {hero.ctaProjects}
          </a>
          <a href={cv.href} className="btn-ghost" download>
            <Download />
            {cv.fallback ? hero.ctaCvFallback : hero.ctaCv}
          </a>
          {site.calendarUrl && (
            <a href={site.calendarUrl} className="btn-ghost" rel="noopener noreferrer">
              {hero.ctaCall}
            </a>
          )}
        </div>

        <h2 className="sr-only">{hero.metricsLabel}</h2>
        <dl className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-4">
          {heroMetrics.map((m, i) => (
            <div
              key={m.value}
              className="card flex flex-col-reverse justify-end gap-2 p-5 animate-rise md:p-6"
              style={{ animationDelay: `${240 + i * 60}ms` }}
            >
              <dt className="text-meta text-muted">
                {t(m.caption, locale)}
                <span className="mt-3 block text-fg">{m.source}</span>
              </dt>
              <dd className="font-mono text-h2 font-medium tracking-tight text-accent">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
