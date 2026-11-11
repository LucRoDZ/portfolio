import type { LabCategory } from '@/content/types';

export const labCategoryOrder: readonly LabCategory[] = ['systems', 'web', 'data', 'ai'];

export type LabFilter = LabCategory | 'all';

/** Categories that have at least one project, in display order. */
export function labCategories(projects: readonly { category: LabCategory }[]): LabCategory[] {
  const present = new Set(projects.map((p) => p.category));
  return labCategoryOrder.filter((c) => present.has(c));
}

export function filterLab<T extends { category: LabCategory }>(projects: readonly T[], filter: LabFilter): T[] {
  return filter === 'all' ? [...projects] : projects.filter((p) => p.category === filter);
}
