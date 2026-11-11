import type { Dictionary } from '@/content/dictionaries/en';
import { heroMetrics } from '@/content/projects';
import { cvFor, site } from '@/content/site';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { ArrowRight, Check, Download } from '../icons';
import { MetricValue } from '../Metric';

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict;
  const cv = cvFor(locale);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Dotted grid, faded towards the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--rule-strong)_1px,transparent_1px)] [background-size:22px_22px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_20%,black,transparent)]"
      />
      <div className="page relative pt-14 pb-20 md:pt-24 md:pb-28">
        <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-rule bg-surface py-1.5 pr-4 pl-3 shadow-card animate-rise">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-micro font-medium uppercase text-fg">{hero.badge}</span>
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-5xl text-h2 font-strong text-balance animate-rise [animation-delay:60ms] sm:text-h1 lg:text-display"
        >
          {hero.headlineBefore}
          <span className="text-accent">{hero.headlineAccent}</span>
          {hero.headlineAfter}
        </h1>

        <p className="mt-6 max-w-prose text-lead text-muted animate-rise [animation-delay:120ms]">{hero.lead}</p>

        <p className="mt-6 flex max-w-prose items-start gap-2 text-meta font-medium animate-rise [animation-delay:160ms]">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          {hero.availability}
        </p>

        <div className="mt-9 flex flex-wrap gap-3 animate-rise [animation-delay:200ms]">
          <a href={`mailto:${site.email}`} className="btn-primary">
            {hero.ctaContact}
            <ArrowRight />
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
              className="card flex flex-col-reverse justify-end gap-3 p-5 animate-rise md:p-6"
              style={{ animationDelay: `${260 + i * 60}ms` }}
            >
              <dt className="flex flex-col gap-3">
                <span className="text-meta text-muted">{t(m.caption, locale)}</span>
                <span className="pill self-start">{m.source}</span>
              </dt>
              <dd>
                <MetricValue value={m.value} to={dict.common.to} className="text-h3 whitespace-nowrap text-accent lg:text-[2.125rem]" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
