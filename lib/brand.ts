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
  accent: '#c2410c',
  pill: '#f1ece1',
  onPill: '#78350f',
} as const;
