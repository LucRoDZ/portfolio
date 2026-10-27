import { describe, expect, it } from 'vitest';
import { en } from '@/content/dictionaries/en';
import { fr } from '@/content/dictionaries/fr';
import { caseStudies, minorProjects } from '@/content/projects';
import { cvFor } from '@/content/site';
import { locales } from '@/content/types';

type Tree = { [k: string]: string | Tree };

function leaves(tree: Tree, prefix = ''): [string, string][] {
  return Object.entries(tree).flatMap(([k, v]) =>
    typeof v === 'string' ? [[`${prefix}${k}`, v] as [string, string]] : leaves(v, `${prefix}${k}.`),
  );
}

/** Every `{ en, fr }` object anywhere in a value. */
function localized(value: unknown, path = ''): [string, Record<string, unknown>][] {
  if (Array.isArray(value)) return value.flatMap((v, i) => localized(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('en' in obj && 'fr' in obj) return [[path, obj]];
    return Object.entries(obj).flatMap(([k, v]) => localized(v, `${path}.${k}`));
  }
  return [];
}

describe('dictionaries', () => {
  it('have identical keys and no empty strings', () => {
    const enLeaves = leaves(en as unknown as Tree);
    const frLeaves = leaves(fr as unknown as Tree);
    expect(frLeaves.map(([k]) => k)).toEqual(enLeaves.map(([k]) => k));
    for (const [k, v] of [...enLeaves, ...frLeaves]) expect(v.trim(), k).not.toBe('');
  });
});

describe('project content', () => {
  it('has every localized field filled in both languages', () => {
    for (const [path, field] of localized({ caseStudies, minorProjects })) {
      for (const l of locales) expect(String(field[l] ?? '').trim(), `${path}.${l}`).not.toBe('');
    }
  });

  it('uses unique slugs and https links', () => {
    const slugs = caseStudies.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of caseStudies) for (const l of p.links) expect(l.href).toMatch(/^https:\/\//);
  });

  it('keeps metrics free of placeholders (numbers must trace to a source)', () => {
    for (const p of caseStudies) for (const m of p.metrics) expect(m.value).not.toContain('TODO');
  });
});

describe('cvFor', () => {
  it('returns the own-language CV or flags the fallback', () => {
    expect(cvFor('fr')).toEqual({ href: '/cv-lucas-zivan.pdf', fallback: false });
    expect(cvFor('en').href).toBe('/cv-lucas-zivan.pdf');
  });
});
