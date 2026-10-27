import { describe, expect, it } from 'vitest';
import { analyticsScript } from '@/lib/analytics';
import { alternates, personJsonLd, serializeJsonLd } from '@/lib/seo';

describe('alternates', () => {
  it('builds canonical and hreflang URLs with x-default on EN', () => {
    const a = alternates('fr', '/projects/easyq');
    expect(a.canonical).toBe('https://lucaszivan.app/fr/projects/easyq');
    expect(a.languages).toEqual({
      en: 'https://lucaszivan.app/en/projects/easyq',
      fr: 'https://lucaszivan.app/fr/projects/easyq',
      'x-default': 'https://lucaszivan.app/en/projects/easyq',
    });
  });
});

describe('JSON-LD', () => {
  it('describes a Person and cannot break out of its script tag', () => {
    const data = personJsonLd('en', '</script><script>alert(1)</script>');
    expect(data['@type']).toBe('Person');
    const out = serializeJsonLd(data);
    expect(out).not.toContain('</script>');
    expect(JSON.parse(out).description).toBe('</script><script>alert(1)</script>');
  });
});

describe('analyticsScript', () => {
  it('is off by default', () => {
    expect(analyticsScript({})).toBeNull();
    expect(analyticsScript({ NEXT_PUBLIC_ANALYTICS: 'plausible' })).toBeNull();
    expect(analyticsScript({ NEXT_PUBLIC_ANALYTICS: 'umami', NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'id' })).toBeNull();
  });
  it('configures Plausible', () => {
    expect(analyticsScript({ NEXT_PUBLIC_ANALYTICS: 'Plausible', NEXT_PUBLIC_PLAUSIBLE_DOMAIN: 'lucaszivan.app' })).toEqual({
      src: 'https://plausible.io/js/script.js',
      attributes: { 'data-domain': 'lucaszivan.app' },
    });
  });
  it('configures Umami', () => {
    expect(
      analyticsScript({
        NEXT_PUBLIC_ANALYTICS: 'umami',
        NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'abc',
        NEXT_PUBLIC_UMAMI_SRC: 'https://u.example/script.js',
      }),
    ).toEqual({ src: 'https://u.example/script.js', attributes: { 'data-website-id': 'abc' } });
  });
});
