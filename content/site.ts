import type { Locale } from './types';

/** Locale-independent facts. Every user-facing sentence lives in content/dictionaries. */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lucaszivan.app').replace(/\/$/, ''),
  name: 'Lucas Zivan',
  email: 'lucaszivanpro@gmail.com',
  github: 'https://github.com/LucRoDZ',
  linkedin: 'https://www.linkedin.com/in/zivan-lucas-a057542a4',
  /** Optional booking link (Cal.com, Calendly…). The "Book a call" button is hidden when unset. */
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL || null,
  /**
   * CV per locale. `null` falls back to the other language and says so in the label.
   * The current CV is in English (Lucas's own PDF, 9 Nov 2026). TODO(lucas): add a French version if needed.
   */
  cv: { en: '/cv-lucas-zivan.pdf', fr: null } as Record<Locale, string | null>,
} as const;

export function cvFor(locale: Locale): { href: string; fallback: boolean } {
  const own = site.cv[locale];
  if (own) return { href: own, fallback: false };
  const other = Object.values(site.cv).find(Boolean);
  if (!other) throw new Error('No CV file configured');
  return { href: other, fallback: true };
}
