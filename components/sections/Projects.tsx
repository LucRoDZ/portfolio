import type { Dictionary } from '@/content/dictionaries/en';
import { flagshipProjects, labProjects, productProjects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { presentAll } from '@/lib/todo';
import { FlagshipCard } from '../projects/FlagshipCard';
import { LabList, type LabRow } from '../projects/LabList';
import { ProductCard } from '../projects/ProductCard';
import { SectionHeading } from '../SectionHeading';

function TierLabel({ children, id }: { children: string; id: string }) {
  return (
    <h3 id={id} className="flex items-center gap-4 text-h4 font-strong">
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h3>
  );
}

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { projects } = dict;
  const lab = presentAll(labProjects, (p) => [t(p.title, locale), t(p.summary, locale), t(p.kind, locale)]);
  const rows: LabRow[] = lab.map((p) => ({
    title: t(p.title, locale),
    kind: t(p.kind, locale),
    summary: t(p.summary, locale),
    stack: p.stack,
    category: p.category,
    href: p.href,
    thumb: p.shot && { src: `${p.shot.src}-800.webp`, alt: t(p.shot.alt, locale) },
  }));

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="page">
        <SectionHeading id="projects-title" label={projects.label} title={projects.title} intro={projects.intro} />

        <div className="mt-14 space-y-6" role="group" aria-labelledby="tier-1">
          <TierLabel id="tier-1">{projects.tier1Label}</TierLabel>
          {flagshipProjects().map((p, i) => (
            <FlagshipCard key={p.slug} project={p} index={i} locale={locale} dict={dict} />
          ))}
        </div>

        <div className="mt-20 space-y-6" role="group" aria-labelledby="tier-2">
          <TierLabel id="tier-2">{projects.tier2Label}</TierLabel>
          <div className="grid gap-6 md:grid-cols-2">
            {productProjects.map((p) => (
              <ProductCard key={p.title.en} project={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>

        <div className="mt-20 space-y-6" role="group" aria-labelledby="tier-3">
          <TierLabel id="tier-3">{projects.tier3Label}</TierLabel>
          <LabList
            rows={rows}
            labels={{
              filter: projects.filterLabel,
              all: projects.filterAll,
              categories: projects.categories,
              project: projects.colProject,
              summary: projects.colSummary,
              stack: projects.colStack,
              live: projects.live,
              external: dict.common.external,
              count: projects.count,
            }}
          />
        </div>
      </div>
    </section>
  );
}
