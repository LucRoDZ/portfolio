/**
 * Raw colour values for places that cannot read CSS variables: generated OG images, icons and
 * <meta name="theme-color">. Must mirror app/tokens.css — the only other place colours live.
 */
export const brand = {
  bg: '#f8f6f0',
  surface: '#ffffff',
  fg: '#1e1e1e',
  muted: '#6e6d67',
  rule: '#e6e1d7',
  accent: '#2563eb',
  pill: '#eff6ff',
  onPill: '#1e40af',
} as const;
