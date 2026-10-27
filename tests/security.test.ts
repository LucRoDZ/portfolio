import { describe, expect, it } from 'vitest';
import { analyticsOrigin, contentSecurityPolicy, securityHeaders } from '@/lib/security';

describe('analyticsOrigin', () => {
  it('is null when analytics is off or misconfigured', () => {
    expect(analyticsOrigin({})).toBeNull();
    expect(analyticsOrigin({ NEXT_PUBLIC_ANALYTICS: 'umami' })).toBeNull();
    expect(analyticsOrigin({ NEXT_PUBLIC_ANALYTICS: 'umami', NEXT_PUBLIC_UMAMI_SRC: 'not a url' })).toBeNull();
  });
  it('derives the origin of the configured script', () => {
    expect(analyticsOrigin({ NEXT_PUBLIC_ANALYTICS: 'plausible' })).toBe('https://plausible.io');
    expect(
      analyticsOrigin({ NEXT_PUBLIC_ANALYTICS: 'umami', NEXT_PUBLIC_UMAMI_SRC: 'https://stats.lucaszivan.app/script.js' }),
    ).toBe('https://stats.lucaszivan.app');
  });
});

describe('contentSecurityPolicy', () => {
  it('allows only self by default', () => {
    const csp = contentSecurityPolicy({});
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toMatch(/https?:\/\//);
  });
  it('adds the analytics origin to script-src and connect-src only', () => {
    const csp = contentSecurityPolicy({ NEXT_PUBLIC_ANALYTICS: 'plausible' });
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://plausible.io");
    expect(csp).toContain("connect-src 'self' https://plausible.io");
    expect(csp.match(/plausible\.io/g)).toHaveLength(2);
  });
});

describe('securityHeaders', () => {
  it('includes HSTS, nosniff and a referrer policy', () => {
    const keys = securityHeaders({}).map((h) => h.key);
    expect(keys).toEqual(expect.arrayContaining(['Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy']));
  });
});
