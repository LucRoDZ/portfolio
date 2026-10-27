import { describe, expect, it } from 'vitest';
import { format } from '@/lib/i18n';
import { isLocale, negotiateLocale, switchLocalePath } from '@/lib/locale';

describe('negotiateLocale', () => {
  it('falls back to EN without a header', () => {
    expect(negotiateLocale(null)).toBe('en');
    expect(negotiateLocale('')).toBe('en');
  });
  it('picks a supported language by region-less match', () => {
    expect(negotiateLocale('fr-FR,fr;q=0.9,en;q=0.8')).toBe('fr');
    expect(negotiateLocale('en-GB')).toBe('en');
  });
  it('honours q-values over order', () => {
    expect(negotiateLocale('en;q=0.5, fr;q=0.9')).toBe('fr');
  });
  it('skips unsupported languages and q=0', () => {
    expect(negotiateLocale('ja-JP, de;q=0.9, fr;q=0.2')).toBe('fr');
    expect(negotiateLocale('fr;q=0, ja')).toBe('en');
  });
  it('treats malformed q-values as zero', () => {
    expect(negotiateLocale('fr;q=abc, en;q=0.3')).toBe('en');
  });
});

describe('switchLocalePath', () => {
  it('swaps the locale prefix', () => {
    expect(switchLocalePath('/en', 'fr')).toBe('/fr');
    expect(switchLocalePath('/en/projects/easyq', 'fr')).toBe('/fr/projects/easyq');
  });
  it('adds a prefix to locale-less paths', () => {
    expect(switchLocalePath('/', 'fr')).toBe('/fr');
    expect(switchLocalePath('/projects/x', 'en')).toBe('/en/projects/x');
  });
});

describe('isLocale / format', () => {
  it('validates locales', () => {
    expect(isLocale('fr')).toBe(true);
    expect(isLocale('de')).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
  it('fills placeholders and keeps unknown ones', () => {
    expect(format('{title} — {x}', { title: 'EASY.Q' })).toBe('EASY.Q — {x}');
    expect(format('{count} projects', { count: 3 })).toBe('3 projects');
  });
});
