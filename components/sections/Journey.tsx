import type { Dictionary } from '@/content/dictionaries/en';
import { earlier, education, timeline, work } from '@/content/experience';
import type { Locale, TimelineEntry } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionHeading } from '../SectionHeading';
import { StackLine } from '../StackLine';

function EntryList({ title, id, entries, locale }: { title: string; id: string; entries: TimelineEntry[]; locale: Locale }) {
  return (
    <div role="group" aria-labelledby={id}>
      <h3 id={id} className="text-h4 font-strong">
        {title}
      </h3>
      <ol className="mt-6 divide-y divide-rule border-y border-rule">
        {timeline(entries).map((e) => (
          <li key={e.org + e.start} className="grid gap-x-10 gap-y-1 py-8 md:grid-cols-[14rem_1fr]">
            <p className="font-mono text-meta text-fg">{t(e.period, locale)}</p>
            <div>
              <h4 className="text-h4 font-strong">
                {t(e.title, locale)}, <span className="font-medium text-muted">{e.org}</span>
              </h4>
              <p className="mt-1 text-meta text-muted">{t(e.place, locale)}</p>
              {e.bullets.length > 0 && (
                <ul className="mt-4 max-w-prose space-y-2">
                  {e.bullets.map((b) => (
                    <li key={b.en} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <span>{t(b, locale)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {e.stack && <StackLine items={e.stack} className="mt-4" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journey({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { journey } = dict;

  return (
    <section id="journey" aria-labelledby="journey-title" className="section border-y border-rule bg-sunken/60">
      <div className="page">
        <SectionHeading id="journey-title" label={journey.label} title={journey.title} />

        <div className="mt-12 space-y-16">
          <div>
            <EntryList title={journey.work} id="journey-work" entries={work} locale={locale} />
            <p className="mt-6 text-meta text-muted">
              <span className="font-strong text-fg">{journey.earlierLabel}.</span> {t(earlier, locale)}
            </p>
          </div>
          <EntryList title={journey.education} id="journey-education" entries={education} locale={locale} />
        </div>
      </div>
    </section>
  );
}
