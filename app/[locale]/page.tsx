import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Approach } from '@/components/sections/Approach';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Journey } from '@/components/sections/Journey';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { getDictionary, isLocale } from '@/lib/i18n';
import { alternates, personJsonLd, serializeJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    alternates: alternates(locale, ''),
    openGraph: { title: dict.meta.title, description: dict.meta.description, url: `/${locale}` },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(locale, dict.meta.description)) }}
      />
      <Hero locale={locale} dict={dict} />
      <Approach locale={locale} dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Journey locale={locale} dict={dict} />
      <Skills locale={locale} dict={dict} />
      <Contact locale={locale} dict={dict} />
    </main>
  );
}
