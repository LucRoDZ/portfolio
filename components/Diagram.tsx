import type { Diagram as DiagramData } from '@/content/types';
import { DIAGRAM, layoutDiagram } from '@/lib/diagram';

/**
 * Architecture diagram drawn in the site palette. `compact` drops sub-labels and enlarges
 * labels so the diagram still reads as a thumbnail in the project index.
 */
export function Diagram({
  diagram,
  id,
  label,
  compact = false,
  className,
}: {
  diagram: DiagramData;
  id: string;
  label: string;
  compact?: boolean;
  className?: string;
}) {
  const { width, height, nodes, paths } = layoutDiagram(diagram);
  const { nodeW, nodeH } = DIAGRAM;
  const marker = `arrow-${id}${compact ? '-c' : ''}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-muted" />
        </marker>
      </defs>
      <g className="fill-none stroke-muted" strokeWidth={compact ? 2 : 1.25}>
        {paths.map((p) => (
          <path key={p.key} d={p.d} markerEnd={`url(#${marker})`} />
        ))}
      </g>
      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={nodeW}
            height={nodeH}
            rx={4}
            className="fill-bg stroke-fg"
            strokeWidth={compact ? 2 : 1}
          />
          {compact || !n.sub ? (
            <text
              x={n.x + 14}
              y={n.y + nodeH / 2}
              dominantBaseline="central"
              className="fill-fg font-sans font-strong"
              fontSize={compact ? 20 : 15}
            >
              {n.label}
            </text>
          ) : (
            <>
              <text x={n.x + 14} y={n.y + 23} className="fill-fg font-sans font-strong" fontSize={15}>
                {n.label}
              </text>
              <text x={n.x + 14} y={n.y + 42} className="fill-muted font-mono" fontSize={12}>
                {n.sub}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
