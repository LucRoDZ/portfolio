import type { Dictionary } from '@/content/dictionaries/en';
import { site } from '@/content/site';

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const links = [
    { href: site.github, label: 'GitHub' },
    { href: site.linkedin, label: 'LinkedIn' },
    { href: `${site.github}/portfolio`, label: dict.footer.source },
  ];
  return (
    <footer className="border-t border-rule">
      <div className="page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5 text-meta">
          <span className="font-strong">Lucas Zivan</span>
          <span className="text-muted">{new Date().getFullYear()}</span>
        </p>
        <ul className="flex flex-wrap gap-x-6">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link inline-flex min-h-11 items-center text-meta text-muted" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
