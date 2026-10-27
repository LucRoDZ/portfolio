import type { Dictionary } from '@/content/dictionaries/en';
import { site } from '@/content/site';

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const links = [
    { href: site.github, label: 'GitHub' },
    { href: site.linkedin, label: 'LinkedIn' },
    { href: `${site.github}/portfolio`, label: dict.footer.source },
  ];
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="page-grid gap-y-4 py-8">
        <p className="col-label meta">
          <span className="font-sans font-strong text-fg">LZ</span> © 2026
        </p>
        <div className="col-body flex flex-col gap-4 md:flex-row md:justify-between">
          <p className="meta">
            {dict.footer.location}
            <br />
            {dict.footer.timezone}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="meta link inline-flex min-h-11 items-center" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
