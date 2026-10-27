import { caseStudies } from '@/content/projects';
import { getDictionary, isLocale, locales, t } from '@/lib/i18n';
import { ogSize, renderOg } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Lucas Zivan';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : 'en';
  const { hero } = getDictionary(locale);
  return renderOg({
    label: 'lucaszivan.app',
    title: `${hero.name} — ${hero.headlineBefore}${hero.headlineAccent}${hero.headlineAfter}`,
    subtitle: hero.availability,
    metrics: caseStudies[0].metrics.map((m) => ({ value: m.value, caption: t(m.caption, locale) })),
  });
}
