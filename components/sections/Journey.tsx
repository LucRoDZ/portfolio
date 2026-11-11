import type { Dictionary } from '@/content/dictionaries/en';
import { earlier, timeline } from '@/content/experience';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionHeading } from '../SectionHeading';
import { StackLine } from '../StackLine';

export function Journey({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { journey } = dict;

  return (
    <section id="journey" aria-labelledby="journey-title" className="section border-y border-rule bg-sunken/60">
      <div className="page">
        <SectionHeading id="journey-title" label={journey.label} title={journey.title} />

        <ol className="mt-12 divide-y divide-rule border-y border-rule">
          {timeline().map((e) => (
            <li key={e.org + e.start} className="grid gap-x-10 gap-y-1 py-8 md:grid-cols-[14rem_1fr]">
              <div>
                <p className="font-mono text-meta text-fg">{t(e.period, locale)}</p>
                <p className="text-meta text-muted">{e.type === 'work' ? journey.work : journey.education}</p>
              </div>
              <div>
                <h3 className="text-h4 font-strong">
                  {t(e.title, locale)}, <span className="font-medium text-muted">{e.org}</span>
                </h3>
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

        <p className="mt-12 border-t border-rule pt-4 text-meta text-muted">
          <span className="font-strong text-fg">{journey.earlierLabel}. </span>
          {t(earlier, locale)}
        </p>
      </div>
    </section>
  );
}
