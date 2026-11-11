import { deliverables, explanations } from '@/content/approach';
import type { Dictionary } from '@/content/dictionaries/en';
import type { L, Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { TwoWayCards } from '../approach/TwoWayCards';
import { SectionHeading } from '../SectionHeading';

function DeliverableList({ title, items, locale }: { title: string; items: L[]; locale: Locale }) {
  return (
    <div>
      <h4 className="font-strong">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.en} className="flex gap-3 text-muted">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
            {t(item, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Approach({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { approach } = dict;
  const cards = explanations.map((e) => ({
    project: e.project,
    href: e.slug ? `/${locale}/projects/${e.slug}` : undefined,
    topic: t(e.topic, locale),
    technical: t(e.technical, locale),
    business: t(e.business, locale),
  }));

  return (
    <section id="approach" aria-labelledby="approach-title" className="section border-y border-rule bg-sunken/60">
      <div className="page">
        <SectionHeading id="approach-title" label={approach.label} title={approach.title} intro={approach.intro} />

        <div className="mt-10">
          <TwoWayCards
            cards={cards}
            labels={{ group: approach.toggleLabel, technical: approach.technical, business: approach.business, readMore: approach.readMore }}
          />
        </div>

        <div className="mt-14 border-t border-rule pt-10">
          <h3 className="text-h4 font-strong">{approach.deliverablesTitle}</h3>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <DeliverableList title={approach.businessDeliverables} items={deliverables.business} locale={locale} />
            <DeliverableList title={approach.technicalDeliverables} items={deliverables.technical} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
