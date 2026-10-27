import { locales, type Locale } from '@/content/types';

/** Dependency-free locale helpers, safe to import from proxy.ts. */
export { locales, type Locale };
export const defaultLocale: Locale = 'en';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * Choose a locale from an Accept-Language header, honouring q-values.
 * Falls back to `defaultLocale` (EN) when nothing matches.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { base: tag.toLowerCase().split('-')[0], quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((entry) => entry.base && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  return ranked.map((entry) => entry.base).find(isLocale) ?? defaultLocale;
}

/** Swap the locale prefix of a pathname, e.g. `/en/projects/x` → `/fr/projects/x`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  if (isLocale(segments[1])) {
    segments[1] = target;
    return segments.join('/');
  }
  return `/${target}${pathname === '/' ? '' : pathname}`;
}
