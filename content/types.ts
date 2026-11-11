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

/** A headline number with where it comes from (hero band). */
export interface ProofMetric extends Metric {
  source: string;
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

/** A screenshot in public/projects/<slug>/. `src` has no extension; `-800` and full-size WebP files exist. */
export interface Shot {
  src: string;
  alt: L;
  width: number;
  height: number;
  /** Phone captures are framed and sized differently from desktop ones. */
  device?: 'desktop' | 'mobile';
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Short context line above the title, e.g. "Internship · Asmodee". */
  kind: L;
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
  /** Screenshots shown as proof on the case-study page. Empty for confidential work. */
  shots: Shot[];
  /** Client or employer work: no public code, screenshots or internal names. */
  confidential?: boolean;
  differently: L;
}

/** Tier 2: product, consulting and freelance work, shown as a two-column grid. */
export interface ProductProject {
  title: L;
  kind: L;
  summary: L;
  /** Two or three concrete facts that back the summary. */
  proof: L[];
  stack: string[];
  /** A big figure shown on cards without a screenshot. */
  figure?: Metric;
  /** Projects grouped in one card (e.g. NYOS APR & EcoMuni), each linking to its case study. */
  parts?: { slug: string; title: string; summary: L; shot: Shot }[];
}

export type LabCategory = 'systems' | 'web' | 'data' | 'ai';

/** Tier 3: systems and academic lab, shown as a compact filterable list. */
export interface LabProject {
  title: L;
  kind: L;
  summary: L;
  stack: string[];
  category: LabCategory;
  href?: string;
  shot?: Shot;
}

export interface TimelineEntry {
  /** ISO year-month, used to merge work and education in one chronological list. */
  start: string;
  type: 'work' | 'education';
  period: L;
  title: L;
  org: string;
  place: L;
  bullets: L[];
  stack?: string[];
}
