export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

/** A string that exists in every locale. */
export type L = Record<Locale, string>;

/**
 * Copy that is not known yet is written as `TODO(lucas): …`.
 * It is highlighted in development and left out of production builds (see lib/todo.ts).
 */
export type Copy = string;

export interface Metric {
  value: string;
  caption: L;
}

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
}

export interface Diagram {
  title: L;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: [from: string, to: string][];
}

export interface ProjectLink {
  kind: 'live' | 'demo' | 'github';
  href: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  pitch: L;
  period: L;
  role: L;
  team: L;
  context: L;
  decisions: { title: L; body: L }[];
  results: L[];
  metrics: Metric[];
  diagram: Diagram;
  stack: string[];
  links: ProjectLink[];
  /** Client or employer work: no public code, screenshots or internal names. */
  confidential?: boolean;
  differently: L;
}

export interface MinorProject {
  title: string;
  kind: L;
  summary: L;
  stack: string[];
  href?: string;
}

export interface TimelineEntry {
  period: L;
  title: L;
  org: string;
  place: L;
  bullets: L[];
  stack?: string[];
}
