import type { Dictionary } from '@/content/dictionaries/en';
import { cvFor, site } from '@/content/site';
import type { Locale } from '@/content/types';
import { ArrowRight, ArrowUpRight, Download, GitHub, LinkedIn, Mail } from '../icons';

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contact, hero } = dict;
  const cv = cvFor(locale);
  const channels = [
    { href: `mailto:${site.email}`, label: contact.emailLabel, value: site.email, icon: Mail, external: false, download: false },
    { href: site.linkedin, label: 'LinkedIn', value: 'zivan-lucas', icon: LinkedIn, external: true, download: false },
    { href: site.github, label: 'GitHub', value: 'LucRoDZ', icon: GitHub, external: true, download: false },
    { href: cv.href, label: contact.cvLabel, value: cv.fallback ? hero.ctaCvFallback : hero.ctaCv, icon: Download, external: false, download: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 md:pb-28">
      <div className="page">
        <div className="card relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{contact.label}</p>
              <h2 id="contact-title" className="mt-4 text-h3 font-strong text-balance md:text-h1">
                {contact.title}
              </h2>
              <p className="mt-5 max-w-prose text-lead text-muted">{contact.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="btn-primary">
                  {contact.send}
                  <ArrowRight />
                </a>
                {site.calendarUrl && (
                  <a href={site.calendarUrl} className="btn-secondary" rel="noopener noreferrer">
                    {hero.ctaCall}
                  </a>
                )}
              </div>
            </div>

            <ul className="grid content-start gap-3 lg:col-span-5">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(c.download ? { download: true } : {})}
                    className="group flex min-h-16 items-center gap-4 rounded-md border border-rule bg-bg px-4 py-3 transition-colors hover:border-accent"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-accent shadow-card">
                      <c.icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-meta text-muted">{c.label}</span>
                      <span className="block truncate font-medium group-hover:text-accent">{c.value}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    {c.external && <span className="sr-only">({dict.common.external})</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
