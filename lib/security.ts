/**
 * HTTP security headers, set by the app itself so they are identical behind Caddy (standalone mode)
 * and behind an existing reverse proxy (shared-proxy mode). Evaluated at build time from env vars.
 */
type Env = Record<string, string | undefined>;

/** Origin of the configured analytics script, if any (it must be allowed by the CSP). */
export function analyticsOrigin(env: Env): string | null {
  const provider = env.NEXT_PUBLIC_ANALYTICS?.trim().toLowerCase();
  const src =
    provider === 'plausible'
      ? env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js'
      : provider === 'umami'
        ? env.NEXT_PUBLIC_UMAMI_SRC
        : undefined;
  if (!src) return null;
  try {
    return new URL(src).origin;
  } catch {
    return null;
  }
}

export function contentSecurityPolicy(env: Env): string {
  const analytics = analyticsOrigin(env);
  const extra = analytics ? ` ${analytics}` : '';
  return [
    "default-src 'self'",
    // 'unsafe-inline' is required by the inline scripts Next.js emits in statically generated pages
    // (RSC payload, theme init). Nonces would force every page to render dynamically.
    `script-src 'self' 'unsafe-inline'${extra}`,
    `connect-src 'self'${extra}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}

export function securityHeaders(env: Env): { key: string; value: string }[] {
  return [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy(env) },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  ];
}
