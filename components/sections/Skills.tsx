import type { Dictionary } from '@/content/dictionaries/en';
import { languages } from '@/content/experience';
import { familiar, skillGroups } from '@/content/skills';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionHeading } from '../SectionHeading';

export function Skills({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { skills } = dict;
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="page">
        <SectionHeading index={3} id="skills-title" label={skills.label} title={skills.title} />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const copy = skills.groups[g.id];
            return (
              <div key={g.id} className={`card flex flex-col p-6 sm:p-8 ${i === 0 ? 'ring-1 ring-accent/25' : ''}`}>
                <h3 className="flex items-center gap-2.5 text-h4 font-strong">
                  {i === 0 && <span aria-hidden="true" className="size-2 rounded-full bg-accent" />}
                  {copy.title}
                </h3>
                <p className="mt-1 text-meta text-muted">{copy.note}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((s) => {
                    const label = typeof s === 'string' ? s : t(s, locale);
                    return (
                      <li key={label} className="pill px-3 py-1">
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <dl className="mt-8 grid gap-4 border-t border-rule pt-6 text-meta sm:grid-cols-2">
          <div className="flex flex-wrap gap-x-3">
            <dt className="font-strong">{skills.familiarLabel}</dt>
            <dd className="text-muted">{familiar.join(' · ')}</dd>
          </div>
          <div className="flex flex-wrap gap-x-3">
            <dt className="font-strong">{skills.languagesLabel}</dt>
            <dd className="text-muted">{t(languages, locale)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
