import type { Dictionary } from '@/content/dictionaries/en';
import type { Locale, ProductProject } from '@/content/types';
import { t } from '@/lib/i18n';
import { ArrowRight } from '../icons';
import { MetricValue } from '../Metric';
import { Shot } from '../Shot';
import { StackLine } from '../StackLine';

export function ProductCard({ project, locale, dict }: { project: ProductProject; locale: Locale; dict: Dictionary }) {
  return (
    <article className="card flex flex-col p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{t(project.kind, locale)}</p>
          <h4 className="mt-3 text-h4 font-strong">{t(project.title, locale)}</h4>
        </div>
        {project.figure && (
          <p className="shrink-0 text-right">
            <MetricValue value={project.figure.value} className="block text-h2 leading-none text-accent" />
            <span className="mt-1 block max-w-28 text-meta leading-snug text-muted">{t(project.figure.caption, locale)}</span>
          </p>
        )}
      </div>

      <p className="mt-3 text-muted">{t(project.summary, locale)}</p>

      {project.proof.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-rule pt-5">
          {project.proof.map((p) => (
            <li key={p.en} className="flex gap-3 text-meta">
              <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
              {t(p, locale)}
            </li>
          ))}
        </ul>
      )}

      {project.parts && (
        <div className="mt-5 grid gap-4 border-t border-rule pt-5 sm:grid-cols-2">
          {project.parts.map((part) => (
            <a
              key={part.slug}
              href={`/${locale}/projects/${part.slug}`}
              className="group flex flex-col gap-3 rounded-md p-1 transition-colors"
            >
              <Shot shot={part.shot} locale={locale} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw" />
              <span className="flex items-center gap-1.5 font-strong group-hover:text-accent">
                {part.title}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-meta text-muted">{t(part.summary, locale)}</span>
            </a>
          ))}
        </div>
      )}

      <StackLine items={project.stack} label={dict.caseStudy.stack} className="mt-auto pt-6" />
    </article>
  );
}
