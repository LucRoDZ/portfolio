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
    <section aria-labelledby="hero-title">
      <div className="page pt-14 pb-20 md:pt-24 md:pb-28">
        <p className="text-meta font-medium text-muted animate-rise">{hero.availability}</p>

        <h1 id="hero-title" className="mt-6 text-h1 font-strong animate-rise [animation-delay:60ms] lg:text-display">
          {hero.name}
        </h1>
        <p className="mt-4 max-w-3xl text-h4 font-medium text-balance animate-rise [animation-delay:100ms] md:text-h3">
          {hero.subtitle}
        </p>

        <p className="mt-6 max-w-prose text-lead text-muted animate-rise [animation-delay:140ms]">{hero.lead}</p>

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
