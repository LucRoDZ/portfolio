import { en, type Dictionary } from '@/content/dictionaries/en';
import { fr } from '@/content/dictionaries/fr';
import type { L, Locale } from '@/content/types';

export { defaultLocale, isLocale, locales, negotiateLocale, switchLocalePath, type Locale } from './locale';

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Pick the string for `locale` from a localized field. */
export function t(field: L, locale: Locale): string {
  return field[locale];
}

/** Replace `{name}` placeholders. Unknown placeholders are left as is. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

