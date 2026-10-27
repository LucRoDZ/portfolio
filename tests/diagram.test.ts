import { describe, expect, it } from 'vitest';
import { caseStudies } from '@/content/projects';
import { DIAGRAM, layoutDiagram } from '@/lib/diagram';

describe('layoutDiagram', () => {
  const base = { title: { en: '', fr: '' }, cols: 2, rows: 2 };

  it('places nodes on the grid and sizes the canvas', () => {
    const l = layoutDiagram({ ...base, nodes: [{ id: 'a', label: 'A', col: 1, row: 1 }], edges: [] });
    expect(l.nodes[0]).toMatchObject({ x: DIAGRAM.pad + DIAGRAM.nodeW + DIAGRAM.gapX, y: DIAGRAM.pad + DIAGRAM.rowH });
    expect(l.width).toBe(2 * DIAGRAM.nodeW + DIAGRAM.gapX + 2 * DIAGRAM.pad);
  });

  it('draws straight, elbow and vertical connectors', () => {
    const l = layoutDiagram({
      ...base,
      nodes: [
        { id: 'a', label: 'A', col: 0, row: 0 },
        { id: 'b', label: 'B', col: 1, row: 0 },
        { id: 'c', label: 'C', col: 1, row: 1 },
      ],
      edges: [
        ['a', 'b'],
        ['a', 'c'],
        ['c', 'b'],
      ],
    });
    expect(l.paths[0].d).toMatch(/^M\d+ \d+ H\d+$/);
    expect(l.paths[1].d).toMatch(/^M\d+ \d+ H[\d.]+ V\d+ H\d+$/);
    expect(l.paths[2].d).toMatch(/^M\d+ \d+ V\d+$/);
  });

  it('rejects edges to unknown nodes', () => {
    expect(() => layoutDiagram({ ...base, nodes: [], edges: [['a', 'b']] })).toThrow(/unknown node/);
  });

  it('lays out every case-study diagram', () => {
    for (const p of caseStudies) expect(() => layoutDiagram(p.diagram)).not.toThrow();
  });
});
