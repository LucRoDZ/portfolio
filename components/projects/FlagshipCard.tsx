import type { Dictionary } from '@/content/dictionaries/en';
import type { CaseStudy, Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { ArchitectureMap } from '../ArchitectureMap';
import { Diagram } from '../Diagram';
import { ArrowRight, Lock } from '../icons';
import { MetricValue } from '../Metric';
import { Shot } from '../Shot';
import { StackLine } from '../StackLine';

/** The visual half of a flagship card: architecture for employer work, screenshots when they exist. */
function Visual({ project, locale, dict }: { project: CaseStudy; locale: Locale; dict: Dictionary }) {
  if (project.slug === 'asmodee-ai-platform') {
    return (
      <ArchitectureMap
        locale={locale}
        title={dict.projects.architectureTitle}
        legend={dict.projects.architectureLegend}
      />
    );
  }

  const desktop = project.shots.find((s) => s.device !== 'mobile');
  const phones = project.shots.filter((s) => s.device === 'mobile').slice(0, 2);
  if (desktop) {
    return (
      <div className="relative pb-6 sm:pr-10 sm:pb-10">
        <Shot shot={desktop} locale={locale} sizes="(min-width: 1024px) 40rem, 92vw" />
        {phones.length > 0 && (
          <div className="absolute right-0 bottom-0 flex w-[44%] items-end gap-2 sm:w-[38%]">
            {phones.map((p, i) => (
              <Shot key={p.src} shot={p} locale={locale} sizes="160px" className={i === 0 ? 'mb-6' : ''} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <figure className="flex h-full flex-col justify-center">
      <Diagram diagram={project.diagram} id={`card-${project.slug}`} label={t(project.diagram.title, locale)} className="h-auto w-full" />
      <figcaption className="meta mt-4">{t(project.diagram.title, locale)}</figcaption>
    </figure>
  );
}

export function FlagshipCard({
  project,
  index,
  locale,
  dict,
}: {
  project: CaseStudy;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const reversed = index % 2 === 1;
  const href = `/${locale}/projects/${project.slug}`;
  const titleId = `flagship-${project.slug}`;

  return (
    <article aria-labelledby={titleId} className="card group relative grid overflow-hidden transition-shadow hover:shadow-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent lg:grid-cols-12">
      <div className={`flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10 ${reversed ? 'lg:order-2' : ''}`}>
        <p className="eyebrow">{t(project.kind, locale)}</p>
        <h4 id={titleId} className="mt-4 text-h3 font-strong">
          <a href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </a>
        </h4>
        <p className="mt-3 text-muted">{t(project.pitch, locale)}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.value} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-meta leading-snug text-muted">{t(m.caption, locale)}</dt>
                <dd>
                  <MetricValue value={m.value} className="text-h4 whitespace-nowrap text-accent" />
                </dd>
              </div>
            ))}
          </dl>
        )}

        <StackLine items={project.stack.slice(0, 7)} label={dict.caseStudy.stack} className="mt-6" />

        <div className="mt-auto pt-8">
          {project.confidential && (
            <p className="mb-5 flex items-start gap-2 text-meta text-muted">
              <Lock className="mt-0.5 size-4 shrink-0" />
              {dict.projects.confidential}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-meta font-strong text-accent">
            {dict.projects.readCaseStudy}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      <div
        className={`border-rule bg-sunken p-5 sm:p-8 lg:col-span-7 lg:p-10 ${reversed ? 'border-b lg:order-1 lg:border-r lg:border-b-0' : 'border-t lg:border-t-0 lg:border-l'}`}
      >
        <Visual project={project} locale={locale} dict={dict} />
      </div>
    </article>
  );
}
