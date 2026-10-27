import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/projects';
import { locales } from '@/lib/locale';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', ...caseStudies.map((p) => `/projects/${p.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])) },
    })),
  );
}
