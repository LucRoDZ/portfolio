import Script from 'next/script';
import { analyticsScript } from '@/lib/analytics';

/** Cookieless analytics, rendered only when configured through env vars (off by default). */
export function Analytics() {
  const script = analyticsScript({
    NEXT_PUBLIC_ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_PLAUSIBLE_SRC: process.env.NEXT_PUBLIC_PLAUSIBLE_SRC,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    NEXT_PUBLIC_UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC,
  });
  if (!script) return null;
  return <Script src={script.src} strategy="afterInteractive" {...script.attributes} />;
}
