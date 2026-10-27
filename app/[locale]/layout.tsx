import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Schibsted_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Analytics } from '@/components/Analytics';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { themeInitScript } from '@/components/ThemeToggle';
import { site } from '@/content/site';
import { brand } from '@/lib/brand';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import '../globals.css';

const text = Schibsted_Grotesk({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-text', display: 'swap' });
const meta = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-meta', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: brand.light.bg },
    { media: '(prefers-color-scheme: dark)', color: brand.dark.bg },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      siteName: site.name,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: locale === 'fr' ? 'en_GB' : 'fr_FR',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${text.variable} ${meta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SiteHeader locale={locale} dict={dict} />
        {children}
        <SiteFooter dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
