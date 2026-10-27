import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Copy } from '@/components/Copy';
import { Diagram } from '@/components/Diagram';
import { MetricValue } from '@/components/Metric';
import { caseStudies, getCaseStudy } from '@/content/projects';
import { format, getDictionary, isLocale, t } from '@/lib/i18n';
import { alternates } from '@/lib/seo';
import { present, presentAll } from '@/lib/todo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!isLocale(locale) || !project) return {};
  const dict = getDictionary(locale);
  const title = format(dict.meta.caseStudyTitle, { title: project.title });
  const description = t(project.pitch, locale);
  return {
    title,
    description,
    alternates: alternates(locale, `/projects/${slug}`),
    openGraph: { title, description, type: 'article', url: `/${locale}/projects/${slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule-strong pt-3">
      <h2 className="meta text-fg">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getCaseStudy(slug);
  if (!isLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const cs = dict.caseStudy;

  const index = caseStudies.indexOf(project);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const decisions = presentAll(project.decisions, (d) => [t(d.title, locale), t(d.body, locale)]);
  const results = presentAll(project.results, (r) => [t(r, locale)]);
  const context = present(t(project.context, locale));
  const differently = present(t(project.differently, locale));
  const facts = [
    { label: cs.period, value: t(project.period, locale) },
    { label: cs.role, value: t(project.role, locale) },
    { label: cs.team, value: t(project.team, locale) },
  ].filter((f) => present(f.value) !== null);

  return (
    <main id="main">
      <article>
        <header className="page-grid gap-y-6 pb-12 pt-10 md:pb-16 md:pt-16">
          <nav aria-label={cs.breadcrumb} className="col-label meta">
            <a href={`/${locale}#work`} className="link inline-flex min-h-11 items-center">
              ← {cs.back}
            </a>
            <span className="mt-1 block">
              {cs.breadcrumb} {String(index + 1).padStart(2, '0')}/{String(caseStudies.length).padStart(2, '0')}
            </span>
          </nav>
          <div className="col-body">
            <h1 className="text-h2 font-strong md:text-display">{project.title}</h1>
            <p className="mt-4 max-w-prose text-lead text-muted">{t(project.pitch, locale)}</p>
          </div>
          {project.metrics.length > 0 && (
            <dl className="col-body mt-6 grid border-t border-rule-strong md:col-start-4 md:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div
                  key={m.value}
                  className={`flex flex-col-reverse gap-2 border-b border-rule py-6 md:border-b-0 md:pr-6 ${i > 0 ? 'md:border-l md:pl-6' : ''}`}
                >
                  <dt className="meta">{t(m.caption, locale)}</dt>
                  <dd>
                    <MetricValue value={m.value} to={dict.common.to} className="whitespace-nowrap text-h2 lg:text-h1" />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <div className="page-grid gap-y-12">
          <aside className="col-label">
            <dl className="space-y-4 border-t border-rule-strong pt-3 md:sticky md:top-8">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="meta">{f.label}</dt>
                  <Copy text={f.value} as="dd" />
                </div>
              ))}
              <div>
                <dt className="meta">{cs.stack}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="meta">{cs.links}</dt>
                {project.links.length > 0 ? (
                  project.links.map((l) => (
                    <dd key={l.href}>
                      <a href={l.href} className="link inline-flex min-h-11 items-center" rel="noopener noreferrer">
                        {cs.linkLabels[l.kind]} ↗
                      </a>
                    </dd>
                  ))
                ) : (
                  <dd className="meta mt-1">{project.confidential ? cs.confidential : '—'}</dd>
                )}
              </div>
            </dl>
          </aside>

          <div className="col-body space-y-16">
            {context && (
              <Block title={cs.context}>
                <Copy text={context} as="p" className="max-w-prose text-lead" />
              </Block>
            )}

            {decisions.length > 0 && (
              <Block title={cs.decisions}>
                <ol className="divide-y divide-rule">
                  {decisions.map((d, i) => (
                    <li key={d.title.en} className="grid gap-x-6 gap-y-2 py-5 first:pt-0 md:grid-cols-9">
                      <span className="meta text-accent md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                      <div className="md:col-span-8">
                        <Copy text={t(d.title, locale)} as="h3" className="text-h4 font-strong" />
                        <Copy text={t(d.body, locale)} as="p" className="mt-2 max-w-prose text-muted" />
                      </div>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            <Block title={cs.architecture}>
              <figure>
                <div className="overflow-x-auto rounded-sm border border-rule bg-surface p-4 md:p-8">
                  <Diagram
                    diagram={project.diagram}
                    id={project.slug}
                    label={t(project.diagram.title, locale)}
                    className="h-auto w-full min-w-diagram"
                  />
                </div>
                <figcaption className="meta mt-3">{t(project.diagram.title, locale)}</figcaption>
              </figure>
            </Block>

            {results.length > 0 && (
              <Block title={cs.results}>
                <ul className="max-w-prose divide-y divide-rule">
                  {results.map((r) => (
                    <Copy key={r.en} text={t(r, locale)} as="li" className="py-3 first:pt-0" />
                  ))}
                </ul>
              </Block>
            )}

            {differently && (
              <Block title={cs.differently}>
                <Copy text={differently} as="p" className="max-w-prose text-lead" />
              </Block>
            )}

            <a
              href={`/${locale}/projects/${next.slug}`}
              className="group block border-t border-rule-strong pt-3"
            >
              <span className="meta block">{cs.next}</span>
              <span className="mt-2 block text-h3 font-strong transition-colors group-hover:text-accent">
                {next.title} →
              </span>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
