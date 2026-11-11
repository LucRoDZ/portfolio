import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArchitectureMap } from '@/components/ArchitectureMap';
import { Copy } from '@/components/Copy';
import { Diagram } from '@/components/Diagram';
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from '@/components/icons';
import { MetricValue } from '@/components/Metric';
import { Shot } from '@/components/Shot';
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

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="eyebrow flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {title}
      </h2>
      <div className="mt-5">{children}</div>
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
  const desktopShots = project.shots.filter((s) => s.device !== 'mobile');
  const phoneShots = project.shots.filter((s) => s.device === 'mobile');

  return (
    <main id="main">
      <article>
        <header className="relative overflow-hidden border-b border-rule">
          <div className="page relative pt-10 pb-14 md:pt-14 md:pb-20">
            <nav aria-label={cs.breadcrumb} className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a href={`/${locale}#projects`} className="btn-ghost -ml-5 text-muted">
                <ArrowLeft />
                {cs.back}
              </a>
              <span className="meta">
                {cs.breadcrumb} {String(index + 1).padStart(2, '0')}/{String(caseStudies.length).padStart(2, '0')}
              </span>
            </nav>
            <p className="eyebrow mt-8">{t(project.kind, locale)}</p>
            <h1 className="mt-3 text-h1 font-strong md:text-display">{project.title}</h1>
            <p className="mt-5 max-w-prose text-lead text-muted">{t(project.pitch, locale)}</p>

            {project.metrics.length > 0 && (
              <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.value} className="card flex flex-col-reverse justify-end gap-2 p-5">
                    <dt className="text-meta text-muted">{t(m.caption, locale)}</dt>
                    <dd>
                      <MetricValue value={m.value} className="text-h3 whitespace-nowrap text-accent" />
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </header>

        <div className="page grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-4">
            <dl className="card space-y-5 p-6 lg:sticky lg:top-24">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-meta text-muted">{f.label}</dt>
                  <Copy text={f.value} as="dd" className="mt-1 font-medium" />
                </div>
              ))}
              <div>
                <dt className="text-meta text-muted">{cs.stack}</dt>
                <dd className="mt-1 font-mono text-meta text-on-pill">{project.stack.join(', ')}</dd>
              </div>
              {(project.links.length > 0 || project.confidential) && (
                <div>
                  <dt className="text-meta text-muted">{cs.links}</dt>
                  {project.links.length > 0 ? (
                    project.links.map((l) => (
                      <dd key={l.href}>
                        <a href={l.href} className="link inline-flex min-h-11 items-center gap-1.5 font-medium" rel="noopener noreferrer">
                          {cs.linkLabels[l.kind]}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      </dd>
                    ))
                  ) : (
                    <dd className="mt-1 flex gap-2 text-meta text-muted">
                      <Lock className="mt-0.5 size-4 shrink-0" />
                      {cs.confidential}
                    </dd>
                  )}
                </div>
              )}
            </dl>
          </aside>

          <div className="min-w-0 space-y-16 lg:col-span-8">
            {context && (
              <Block title={cs.context} id="cs-context">
                <Copy text={context} as="p" className="max-w-prose text-lead" />
              </Block>
            )}

            {decisions.length > 0 && (
              <Block title={cs.decisions} id="cs-decisions">
                <ol className="grid gap-4">
                  {decisions.map((d, i) => (
                    <li key={d.title.en} className="card flex gap-5 p-6">
                      <span className="font-mono text-meta font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <Copy text={t(d.title, locale)} as="h3" className="text-h4 font-strong" />
                        <Copy text={t(d.body, locale)} as="p" className="mt-2 max-w-prose text-muted" />
                      </div>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            <Block title={cs.architecture} id="cs-architecture">
              <div className="card bg-sunken p-5 md:p-8">
                {project.slug === 'asmodee-ai-platform' ? (
                  <ArchitectureMap locale={locale} title={dict.projects.architectureTitle} legend={dict.projects.architectureLegend} />
                ) : (
                  <figure>
                    <div className="overflow-x-auto">
                      <Diagram
                        diagram={project.diagram}
                        id={project.slug}
                        label={t(project.diagram.title, locale)}
                        className="h-auto w-full min-w-diagram"
                      />
                    </div>
                    <figcaption className="meta mt-4">{t(project.diagram.title, locale)}</figcaption>
                  </figure>
                )}
              </div>
            </Block>

            {project.shots.length > 0 && (
              <Block title={cs.gallery} id="cs-gallery">
                <div className="space-y-8">
                  {desktopShots.map((s) => (
                    <figure key={s.src}>
                      <a href={`${s.src}.webp`} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:-translate-y-0.5">
                        <Shot shot={s} locale={locale} sizes="(min-width: 1024px) 48rem, 92vw" />
                      </a>
                      <figcaption className="meta mt-3">{t(s.alt, locale)}</figcaption>
                    </figure>
                  ))}
                  {phoneShots.length > 0 && (
                    <div
                      className={`grid items-start gap-6 ${phoneShots.length > 2 ? 'grid-cols-2 sm:grid-cols-4' : 'max-w-2xl'}`}
                      // Two device captures: columns sized by aspect ratio so both frames share one height.
                      style={phoneShots.length > 2 ? undefined : { gridTemplateColumns: phoneShots.map((s) => `${(s.width / s.height).toFixed(3)}fr`).join(' ') }}
                    >
                      {phoneShots.map((s) => (
                        <figure key={s.src}>
                          <Shot shot={s} locale={locale} sizes={phoneShots.length > 2 ? '(min-width: 640px) 12rem, 45vw' : '(min-width: 640px) 20rem, 45vw'} />
                          <figcaption className="meta mt-3">{t(s.alt, locale)}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </Block>
            )}

            {results.length > 0 && (
              <Block title={cs.results} id="cs-results">
                <ul className="max-w-prose space-y-3">
                  {results.map((r) => (
                    <li key={r.en} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <Copy text={t(r, locale)} />
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {differently && (
              <Block title={cs.differently} id="cs-differently">
                <Copy text={differently} as="p" className="max-w-prose text-lead" />
              </Block>
            )}

            <a href={`/${locale}/projects/${next.slug}`} className="card group flex items-center justify-between gap-6 p-6 transition-shadow hover:shadow-lift">
              <span>
                <span className="text-meta text-muted">{cs.next}</span>
                <span className="mt-1 block text-h3 font-strong group-hover:text-accent">{next.title}</span>
              </span>
              <ArrowRight className="size-6 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
