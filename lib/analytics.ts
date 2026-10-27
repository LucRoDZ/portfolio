/**
 * Cookieless analytics, off by default. Configure through env vars (see .env.example):
 *   NEXT_PUBLIC_ANALYTICS=plausible  + NEXT_PUBLIC_PLAUSIBLE_DOMAIN (+ optional NEXT_PUBLIC_PLAUSIBLE_SRC)
 *   NEXT_PUBLIC_ANALYTICS=umami      + NEXT_PUBLIC_UMAMI_WEBSITE_ID + NEXT_PUBLIC_UMAMI_SRC
 */
export interface AnalyticsScript {
  src: string;
  attributes: Record<string, string>;
}

type Env = Record<string, string | undefined>;

export function analyticsScript(env: Env): AnalyticsScript | null {
  const provider = env.NEXT_PUBLIC_ANALYTICS?.trim().toLowerCase();
  if (provider === 'plausible' && env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    return {
      src: env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js',
      attributes: { 'data-domain': env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN },
    };
  }
  if (provider === 'umami' && env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && env.NEXT_PUBLIC_UMAMI_SRC) {
    return {
      src: env.NEXT_PUBLIC_UMAMI_SRC,
      attributes: { 'data-website-id': env.NEXT_PUBLIC_UMAMI_WEBSITE_ID },
    };
  }
  return null;
}
