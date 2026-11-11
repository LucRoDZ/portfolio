import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { en } from '@/content/dictionaries/en';
import { fr } from '@/content/dictionaries/fr';
import { education, timeline, work } from '@/content/experience';
import { caseStudies, flagshipProjects, heroMetrics, labProjects, productProjects } from '@/content/projects';
import { cvFor } from '@/content/site';
import { skillGroups } from '@/content/skills';
import { locales, type Shot } from '@/content/types';

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

const allShots: Shot[] = [
  ...caseStudies.flatMap((p) => p.shots),
  ...productProjects.flatMap((p) => p.parts?.map((part) => part.shot) ?? []),
  ...labProjects.flatMap((p) => (p.shot ? [p.shot] : [])),
];

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
    const content = { caseStudies, productProjects, labProjects, heroMetrics, skillGroups, work, education };
    for (const [path, field] of localized(content)) {
      for (const l of locales) expect(String(field[l] ?? '').trim(), `${path}.${l}`).not.toBe('');
    }
  });

  it('uses unique slugs and https links', () => {
    const slugs = caseStudies.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of caseStudies) for (const l of p.links) expect(l.href).toMatch(/^https:\/\//);
    for (const p of labProjects) if (p.href) expect(p.href).toMatch(/^https:\/\//);
  });

  it('keeps metrics free of placeholders (numbers must trace to a source)', () => {
    const metrics = [...caseStudies.flatMap((p) => p.metrics), ...heroMetrics, ...productProjects.flatMap((p) => (p.figure ? [p.figure] : []))];
    for (const m of metrics) expect(m.value).not.toContain('TODO');
  });

  it('resolves the three flagship case studies in order', () => {
    expect(flagshipProjects().map((p) => p.slug)).toEqual(['asmodee-ai-platform', 'easyq', 'tinyx']);
  });

  it('links grouped product cards to existing case studies', () => {
    for (const p of productProjects) for (const part of p.parts ?? []) expect(caseStudies.map((c) => c.slug)).toContain(part.slug);
  });

  it('keeps confidential work free of public links', () => {
    for (const p of caseStudies.filter((c) => c.confidential)) expect(p.links).toEqual([]);
  });

  it('points every screenshot at both WebP sizes in public/', () => {
    for (const s of allShots) {
      for (const suffix of ['', '-800']) {
        expect(existsSync(join(process.cwd(), 'public', `${s.src}${suffix}.webp`)), `${s.src}${suffix}.webp`).toBe(true);
      }
    }
  });
});

describe('timeline', () => {
  it('merges work and education, most recent first', () => {
    const starts = timeline().map((e) => e.start);
    expect(starts).toEqual([...starts].sort().reverse());
    expect(timeline()).toHaveLength(work.length + education.length);
  });

  it('does not mutate its input', () => {
    const input = [...education].reverse();
    const copy = [...input];
    timeline(input);
    expect(input).toEqual(copy);
  });
});

describe('cvFor', () => {
  it('returns the own-language CV or flags the fallback', () => {
    expect(cvFor('fr')).toEqual({ href: '/cv-lucas-zivan.pdf', fallback: false });
    expect(cvFor('en').href).toBe('/cv-lucas-zivan.pdf');
  });
});
