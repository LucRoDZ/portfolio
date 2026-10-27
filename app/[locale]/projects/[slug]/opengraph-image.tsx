import { caseStudies, getCaseStudy } from '@/content/projects';
import { getDictionary, isLocale, t } from '@/lib/i18n';
import { ogSize, renderOg } from '@/lib/og';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Case study — Lucas Zivan';

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : 'en';
  const project = getCaseStudy(slug) ?? caseStudies[0];
  const dict = getDictionary(locale);
  return renderOg({
    label: `${dict.caseStudy.breadcrumb} · Lucas Zivan`,
    title: project.title,
    subtitle: t(project.pitch, locale),
    metrics: project.metrics.map((m) => ({ value: m.value, caption: t(m.caption, locale) })),
  });
}
