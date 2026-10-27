import type { Dictionary } from '@/content/dictionaries/en';
import { cvFor } from '@/content/site';
import type { Locale } from '@/content/types';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { nav } = dict;
  const other: Locale = locale === 'en' ? 'fr' : 'en';
  const sections = [
    { href: '#work', label: nav.work },
    { href: '#skills', label: nav.skills },
    { href: '#experience', label: nav.experience },
    { href: '#contact', label: nav.contact },
  ];

  return (
    <header className="border-b border-rule">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bg focus:p-3"
      >
        {nav.skip}
      </a>
      <div className="page-grid items-center py-2">
        <a
          href={`/${locale}`}
          aria-label={nav.home}
          className="col-span-1 inline-flex min-h-11 items-center text-lead font-strong md:col-span-3"
        >
          LZ
        </a>
        <nav aria-label={nav.primary} className="order-last col-span-4 md:order-none md:col-span-6">
          <ul className="-ml-2 flex flex-wrap md:ml-0 md:gap-4">
            {sections.map((s) => (
              <li key={s.href}>
                <a href={`/${locale}${s.href}`} className="meta inline-flex min-h-11 items-center px-2 hover:text-fg md:px-0">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-3 -mr-2 flex items-center justify-end md:col-span-3">
          <a href={cvFor(locale).href} className="meta inline-flex min-h-11 items-center px-2 hover:text-fg" download>
            {nav.cv}
          </a>
          <LanguageSwitch target={other} name={nav.switchTo} />
          <ThemeToggle label={nav.theme} light={nav.themeLight} dark={nav.themeDark} />
        </div>
      </div>
    </header>
  );
}
