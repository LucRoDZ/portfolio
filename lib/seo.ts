import { site } from '@/content/site';
import { locales, type Locale } from '@/content/types';

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Canonical + hreflang alternates for a locale-independent path ('' for home, '/projects/x').
 * x-default points to EN, the fallback locale.
 */
export function alternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(`/${l}${path}`);
  languages['x-default'] = absoluteUrl(`/en${path}`);
  return { canonical: absoluteUrl(`/${locale}${path}`), languages };
}

export function personJsonLd(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: absoluteUrl(`/${locale}`),
    email: `mailto:${site.email}`,
    jobTitle: locale === 'fr' ? 'Élève ingénieur' : 'Engineering student',
    description,
    sameAs: [site.github, site.linkedin],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'EPITA' },
      { '@type': 'CollegeOrUniversity', name: 'Shibaura Institute of Technology' },
    ],
    knowsLanguage: ['fr', 'en'],
    knowsAbout: ['Python', 'FastAPI', 'LangChain', 'LLM integration', 'Docker', 'GitHub Actions', 'Vue.js', 'React'],
    address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
  };
}

/** Safe for `dangerouslySetInnerHTML` inside a <script>: escapes `<` so content cannot close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
