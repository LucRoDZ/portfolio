/** A metric value set in mono, the way figures appear across the site. */
export function MetricValue({ value, className }: { value: string; className?: string }) {
  return <span className={`font-mono font-medium tabular-nums tracking-tight ${className ?? ''}`}>{value}</span>;
}
