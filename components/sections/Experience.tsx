import type { Dictionary } from '@/content/dictionaries/en';
import { earlier, education, work } from '@/content/experience';
import type { Locale, TimelineEntry } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionLabel } from '../SectionLabel';

function Timeline({ title, entries, locale }: { title: string; entries: TimelineEntry[]; locale: Locale }) {
  return (
    <div>
      <h3 className="meta border-t border-rule-strong pt-3 text-fg">{title}</h3>
      <ol>
        {entries.map((e) => (
          <li key={e.org + t(e.period, locale)} className="grid gap-x-6 gap-y-2 border-t border-rule py-6 first:border-t-0 md:grid-cols-9">
            <p className="meta md:col-span-2">{t(e.period, locale)}</p>
            <div className="md:col-span-7">
              <p className="text-lead font-strong">
                {t(e.title, locale)} <span className="text-muted">· {e.org}</span>
              </p>
              <p className="meta">{t(e.place, locale)}</p>
              {e.bullets.length > 0 && (
                <ul className="mt-3 max-w-prose list-disc space-y-1 pl-5 marker:text-faint">
                  {e.bullets.map((b) => (
                    <li key={b.en}>{t(b, locale)}</li>
                  ))}
                </ul>
              )}
              {e.stack && <p className="meta mt-3">{e.stack.join(' · ')}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { experience } = dict;
  return (
    <section id="experience" aria-labelledby="experience-label" className="py-16 md:py-24">
      <div className="page-grid gap-y-6">
        <div className="col-label">
          <SectionLabel index={4} id="experience-label">
            {experience.label}
          </SectionLabel>
        </div>
        <div className="col-body space-y-12">
          <Timeline title={experience.work} entries={work} locale={locale} />
          <Timeline title={experience.education} entries={education} locale={locale} />
          <p className="meta border-t border-rule pt-3">
            <span className="text-fg">{experience.earlierLabel} — </span>
            {t(earlier, locale)}
          </p>
        </div>
      </div>
    </section>
  );
}
