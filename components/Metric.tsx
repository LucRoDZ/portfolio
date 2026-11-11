/** A metric value in mono, with the "→" of before/after figures set apart and read as "to". */
export function MetricValue({ value, to, className }: { value: string; to: string; className?: string }) {
  const [before, after] = value.split('→');
  return (
    <span className={`font-mono font-medium tabular-nums tracking-tight ${className ?? ''}`}>
      {after === undefined ? (
        value
      ) : (
        <>
          {before.trim()}
          <span className="mx-[0.2em] text-muted" aria-hidden="true">
            →
          </span>
          <span className="sr-only"> {to} </span>
          {after.trim()}
        </>
      )}
    </span>
  );
}
