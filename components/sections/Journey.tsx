import type { Dictionary } from '@/content/dictionaries/en';
import { earlier, timeline } from '@/content/experience';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionHeading } from '../SectionHeading';

export function Journey({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { journey } = dict;
  const pillars = [
    { title: journey.engineeringTitle, body: journey.engineeringBody, mark: '</>' },
    { title: journey.managementTitle, body: journey.managementBody, mark: '◇' },
  ];

  return (
    <section id="journey" aria-labelledby="journey-title" className="section border-y border-rule bg-sunken/60">
      <div className="page">
        <SectionHeading index={2} id="journey-title" label={journey.label} title={journey.title} />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="card p-6 sm:p-8">
              <p aria-hidden="true" className="font-mono text-h4 text-accent">
                {p.mark}
              </p>
              <h3 className="mt-4 text-h4 font-strong">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <ol className="relative mt-16 space-y-10 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-rule-strong md:before:left-[calc(14rem+5px)]">
          {timeline().map((e) => (
            <li key={e.org + e.start} className="relative grid gap-x-10 gap-y-2 pl-8 md:grid-cols-[14rem_1fr] md:pl-0">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 md:left-56 ${
                  e.type === 'work' ? 'border-accent bg-accent' : 'border-accent bg-surface'
                }`}
              />
              <div className="md:pr-8 md:text-right">
                <p className="font-mono text-meta text-fg">{t(e.period, locale)}</p>
                <p className="mt-1">
                  <span className="pill">{e.type === 'work' ? journey.work : journey.education}</span>
                </p>
              </div>
              <div className="md:pl-8">
                <h3 className="text-h4 font-strong">
                  {t(e.title, locale)} <span className="font-medium text-muted">· {e.org}</span>
                </h3>
                <p className="meta mt-1">{t(e.place, locale)}</p>
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
                {e.stack && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <li key={s} className="pill">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="meta mt-12 border-t border-rule pt-4">
          <span className="text-fg">{journey.earlierLabel} — </span>
          {t(earlier, locale)}
        </p>
      </div>
    </section>
  );
}
