import type { Dictionary } from '@/content/dictionaries/en';
import type { Locale } from '@/content/types';
import { LanguageSwitch } from './LanguageSwitch';
import { MobileMenu } from './MobileMenu';

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav } = dict;
  const other: Locale = locale === 'en' ? 'fr' : 'en';
  const links = [
    { href: `/${locale}#approach`, label: nav.approach },
    { href: `/${locale}#projects`, label: nav.projects },
    { href: `/${locale}#journey`, label: nav.journey },
    { href: `/${locale}#skills`, label: nav.skills },
    { href: `/${locale}#contact`, label: nav.contact },
  ];
  const cta = { href: `/${locale}#contact`, label: nav.cta };

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-surface focus:p-3"
      >
        {nav.skip}
      </a>
      <div className="page relative flex h-16 items-center justify-between gap-4">
        <a href={`/${locale}`} aria-label={nav.home} className="inline-flex min-h-11 items-center font-strong tracking-tight">
          Lucas Zivan
        </a>

        <nav aria-label={nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-meta font-medium text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch target={other} name={nav.switchTo} />
          <a href={cta.href} className="btn-primary hidden sm:inline-flex">
            {cta.label}
          </a>
          <MobileMenu links={links} cta={cta} openLabel={nav.menuOpen} closeLabel={nav.menuClose} />
        </div>
      </div>
    </header>
  );
}
