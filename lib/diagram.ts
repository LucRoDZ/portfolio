import type { Diagram } from '@/content/types';

export const DIAGRAM = { nodeW: 200, nodeH: 56, gapX: 64, rowH: 80, pad: 2 } as const;

export interface PlacedNode {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
}

export interface Layout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  paths: { key: string; d: string }[];
}

/** Grid layout with orthogonal connectors. Pure, so it is unit-tested and runs at build time. */
export function layoutDiagram(diagram: Diagram): Layout {
  const { nodeW, nodeH, gapX, rowH, pad } = DIAGRAM;
  const width = diagram.cols * nodeW + (diagram.cols - 1) * gapX + pad * 2;
  const height = (diagram.rows - 1) * rowH + nodeH + pad * 2;

  const nodes: PlacedNode[] = diagram.nodes.map((n) => ({
    id: n.id,
    label: n.label,
    sub: n.sub,
    x: pad + n.col * (nodeW + gapX),
    y: pad + n.row * rowH,
  }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const paths = diagram.edges.map(([fromId, toId]) => {
    const from = byId.get(fromId);
    const to = byId.get(toId);
    if (!from || !to) throw new Error(`Diagram edge references unknown node: ${fromId} → ${toId}`);

    let d: string;
    if (from.x === to.x) {
      // Same column: vertical connector between facing edges.
      const x = from.x + nodeW / 2;
      const down = to.y > from.y;
      const y1 = down ? from.y + nodeH : from.y;
      const y2 = down ? to.y : to.y + nodeH;
      d = `M${x} ${y1} V${y2}`;
    } else {
      const rightward = to.x > from.x;
      const x1 = rightward ? from.x + nodeW : from.x;
      const x2 = rightward ? to.x : to.x + nodeW;
      const y1 = from.y + nodeH / 2;
      const y2 = to.y + nodeH / 2;
      const mid = (x1 + x2) / 2;
      d = y1 === y2 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mid} V${y2} H${x2}`;
    }
    return { key: `${fromId}-${toId}`, d };
  });

  return { width, height, nodes, paths };
}
