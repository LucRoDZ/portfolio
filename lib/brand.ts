/**
 * Raw colour values for places that cannot read CSS variables: generated OG images, icons and
 * <meta name="theme-color">. Must mirror app/tokens.css — the only other place colours live.
 */
export const brand = {
  light: { bg: '#f5f4ef', fg: '#171715', muted: '#55544e', rule: '#d6d4cb', accent: '#b4400b' },
  dark: { bg: '#121211', fg: '#ecebe5', muted: '#a6a59c', rule: '#2c2c29', accent: '#f27b3a' },
} as const;
