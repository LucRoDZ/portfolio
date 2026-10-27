import type { Dictionary } from '@/content/dictionaries/en';
import { caseStudies, minorProjects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { format, t } from '@/lib/i18n';
import { presentAll } from '@/lib/todo';
import { Copy } from '../Copy';
import { Diagram } from '../Diagram';
import { MetricValue } from '../Metric';
import { SectionLabel } from '../SectionLabel';

export function Work({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { work } = dict;
  const minor = presentAll(minorProjects, (p) => [p.title, t(p.summary, locale), t(p.kind, locale)]);

  return (
    <section id="work" aria-labelledby="work-title" className="py-16 md:py-24">
      <div className="page-grid gap-y-6">
        <div className="col-label">
          <SectionLabel index={1}>{work.label}</SectionLabel>
        </div>
        <div className="col-body">
          <h2 id="work-title" className="max-w-prose border-t border-rule-strong pt-3 text-h3 font-strong">
            {work.title}
          </h2>

          <ol className="mt-10 border-b border-rule">
            {caseStudies.map((p, i) => {
              const metric = p.metrics[0];
              return (
                <li key={p.slug} className="border-t border-rule">
                  <a href={`/${locale}/projects/${p.slug}`} className="group grid gap-x-6 gap-y-3 py-6 md:grid-cols-9">
                    <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                    <span className="md:col-span-5">
                      <span className="block text-h4 font-strong transition-colors group-hover:text-accent">
                        {p.title}
                      </span>
                      <span className="mt-2 block text-muted">{t(p.pitch, locale)}</span>
                      <span className="meta mt-3 block">{p.stack.slice(0, 5).join(' · ')}</span>
                    </span>
                    <span className="relative block min-h-16 md:col-span-3 md:min-h-32">
                      <span className="flex h-full flex-col justify-start transition-opacity duration-200 md:group-hover:opacity-0 md:group-focus-visible:opacity-0">
                        {metric ? (
                          <>
                            <MetricValue value={metric.value} to={dict.common.to} className="text-h3" />
                            <span className="meta mt-1">{t(metric.caption, locale)}</span>
                          </>
                        ) : (
                          <span className="meta text-fg">{work.caseStudy} →</span>
                        )}
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 hidden translate-y-1 rounded-sm border border-rule bg-surface p-2 opacity-0 transition duration-200 ease-out md:block md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100"
                      >
                        <Diagram diagram={p.diagram} id={p.slug} label="" compact className="h-full w-full" />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <details className="group/more mt-12">
            <summary className="flex min-h-11 cursor-pointer list-none items-baseline justify-between gap-4 border-t border-rule-strong pt-3 [&::-webkit-details-marker]:hidden">
              <span className="text-h4 font-strong">{work.moreTitle}</span>
              <span className="meta">
                {format(work.moreCount, { count: minor.length })}{' '}
                <span aria-hidden="true" className="inline-block text-accent transition-transform group-open/more:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <ul className="mt-4 border-b border-rule">
              {minor.map((p) => (
                <li key={p.title} className="grid gap-x-6 gap-y-1 border-t border-rule py-4 md:grid-cols-9">
                  <div className="md:col-span-3">
                    {p.href ? (
                      <a href={p.href} className="link inline-flex min-h-11 items-center font-strong" rel="noopener noreferrer" target="_blank">
                        {p.title}
                        <span className="sr-only"> ({work.external})</span>
                      </a>
                    ) : (
                      <span className="font-strong">{p.title}</span>
                    )}
                    <Copy text={t(p.kind, locale)} as="p" className="meta" />
                  </div>
                  <Copy text={t(p.summary, locale)} as="p" className="text-muted md:col-span-4" />
                  <p className="meta md:col-span-2">{p.stack.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
