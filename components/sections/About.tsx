import type { Dictionary } from '@/content/dictionaries/en';
import { SectionLabel } from '../SectionLabel';

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" aria-labelledby="about-label" className="py-16 md:py-24">
      <div className="page-grid gap-y-6">
        <div className="col-label">
          <SectionLabel index={2} id="about-label">
            {dict.about.label}
          </SectionLabel>
        </div>
        <p className="col-body max-w-prose border-t border-rule-strong pt-3 text-lead">{dict.about.body}</p>
      </div>
    </section>
  );
}
