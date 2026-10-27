import type { Dictionary } from '@/content/dictionaries/en';
import { languages } from '@/content/experience';
import { skillTiers, type SkillTier } from '@/content/skills';
import type { Locale } from '@/content/types';
import { t } from '@/lib/i18n';
import { SectionLabel } from '../SectionLabel';

const order: SkillTier[] = ['production', 'comfortable', 'familiar'];

export function Skills({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { skills } = dict;
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 md:py-24">
      <div className="page-grid gap-y-6">
        <div className="col-label">
          <SectionLabel index={3}>{skills.label}</SectionLabel>
        </div>
        <div className="col-body">
          <h2 id="skills-title" className="max-w-prose border-t border-rule-strong pt-3 text-h3 font-strong">
            {skills.title}
          </h2>
          <dl className="mt-10 border-b border-rule">
            {order.map((tier) => (
              <div key={tier} className="grid gap-x-6 gap-y-3 border-t border-rule py-5 md:grid-cols-9">
                <dt className="font-strong md:col-span-3">{skills.tiers[tier]}</dt>
                <dd className="md:col-span-6">
                  <ul className="flex flex-wrap gap-2">
                    {skillTiers[tier].map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
            <div className="grid gap-x-6 gap-y-3 border-t border-rule py-5 md:grid-cols-9">
              <dt className="font-strong md:col-span-3">{skills.languagesLabel}</dt>
              <dd className="meta md:col-span-6">{t(languages, locale)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
