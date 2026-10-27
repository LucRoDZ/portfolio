import type { Dictionary } from '@/content/dictionaries/en';
import { caseStudies } from '@/content/projects';
import { cvFor, site } from '@/content/site';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { MetricValue } from '../Metric';

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict;
  const cv = cvFor(locale);
  const metrics = caseStudies[0].metrics;

  return (
    <section aria-labelledby="hero-title" className="pb-16 pt-12 md:pb-24 md:pt-24">
      <div className="page-grid gap-y-6">
        <p className="col-label meta animate-rise">{hero.role}</p>
        <div className="col-body">
          <h1 id="hero-title">
            <span className="block text-h4 font-strong animate-rise">{hero.name}</span>
            <span className="mt-4 block max-w-prose text-h3 font-strong text-balance animate-rise [animation-delay:50ms] sm:text-h2 lg:max-w-none lg:text-display">
              {hero.headlineBefore}
              <span className="text-accent">{hero.headlineAccent}</span>
              {hero.headlineAfter}
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-lead text-muted animate-rise [animation-delay:100ms]">{hero.lead}</p>
          <p className="meta mt-6 max-w-prose border-t border-rule pt-3 animate-rise [animation-delay:150ms]">
            <span className="text-fg">{hero.availabilityLabel} — </span>
            {hero.availability}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-rise [animation-delay:150ms]">
            <a href={`mailto:${site.email}`} className="btn-primary">
              {hero.ctaEmail}
            </a>
            <a href={cv.href} className="btn-secondary" download>
              {cv.fallback ? hero.ctaCvFallback : hero.ctaCv}
            </a>
            {site.calendarUrl && (
              <a href={site.calendarUrl} className="btn-secondary" rel="noopener noreferrer">
                {hero.ctaCall}
              </a>
            )}
          </div>
        </div>

        <p className="col-label meta mt-12 md:mt-20">{hero.metricsLabel}</p>
        <dl className="col-body grid border-t border-rule-strong md:mt-20 md:grid-cols-3">
          {metrics.map((m, i) => (
            <div
              key={m.value}
              className={`flex flex-col-reverse gap-2 border-b border-rule py-6 md:border-b-0 ${i > 0 ? 'md:border-l md:pl-6' : ''} md:pr-6`}
            >
              <dt className="meta">{t(m.caption, locale)}</dt>
              <dd>
                <MetricValue value={m.value} to={dict.common.to} className="whitespace-nowrap text-h2 lg:text-h1" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
