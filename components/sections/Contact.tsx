import type { Dictionary } from '@/content/dictionaries/en';
import { cvFor, site } from '@/content/site';
import type { Locale } from '@/content/types';
import { SectionLabel } from '../SectionLabel';

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contact, hero } = dict;
  const cv = cvFor(locale);
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="page-grid gap-y-6">
        <div className="col-label">
          <SectionLabel index={5}>{contact.label}</SectionLabel>
        </div>
        <div className="col-body">
          <h2 id="contact-title" className="max-w-prose border-t border-rule-strong pt-3 text-h2 font-strong text-balance md:text-h1">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-prose text-lead text-muted">{contact.body}</p>
          <p className="mt-8">
            <span className="meta block">{contact.emailLabel}</span>
            <a href={`mailto:${site.email}`} className="link break-all text-h4 font-strong md:text-h3">
              {site.email}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn-primary">
              {hero.ctaEmail}
            </a>
            <a href={cv.href} className="btn-secondary" download>
              {cv.fallback ? hero.ctaCvFallback : hero.ctaCv}
            </a>
            {site.calendarUrl && (
              <a href={site.calendarUrl} className="btn-secondary" rel="noopener noreferrer">
                {hero.ctaCall}
              </a>
            )}
          </div>
          <p className="meta mt-10">
            {contact.elsewhere} —{' '}
            <a href={site.github} className="link" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            ·{' '}
            <a href={site.linkedin} className="link" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
