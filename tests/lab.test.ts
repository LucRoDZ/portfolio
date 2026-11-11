import { describe, expect, it } from 'vitest';
import { labProjects } from '@/content/projects';
import { filterLab, labCategories, labCategoryOrder } from '@/lib/lab';

describe('labCategories', () => {
  it('lists only categories that have projects, in display order', () => {
    expect(labCategories([{ category: 'ai' }, { category: 'systems' }, { category: 'ai' }])).toEqual(['systems', 'ai']);
    expect(labCategories([])).toEqual([]);
  });

  it('covers every category used by the lab', () => {
    for (const p of labProjects) expect(labCategoryOrder).toContain(p.category);
  });
});

describe('filterLab', () => {
  const items = [
    { id: 1, category: 'web' as const },
    { id: 2, category: 'systems' as const },
    { id: 3, category: 'web' as const },
  ];

  it('returns a copy of everything for "all"', () => {
    const all = filterLab(items, 'all');
    expect(all).toEqual(items);
    expect(all).not.toBe(items);
  });

  it('keeps only the selected category, preserving order', () => {
    expect(filterLab(items, 'web').map((i) => i.id)).toEqual([1, 3]);
    expect(filterLab(items, 'data')).toEqual([]);
  });
});
