/** A metric value with the "→" of before/after figures picked out in the accent colour. */
export function MetricValue({ value, to, className }: { value: string; to: string; className?: string }) {
  const [before, after] = value.split('→');
  return (
    <span className={`font-strong tabular-nums ${className ?? ''}`}>
      {after === undefined ? (
        value
      ) : (
        <>
          {before}
          <span className="text-accent" aria-hidden="true">→</span>
          <span className="sr-only"> {to} </span>
          {after}
        </>
      )}
    </span>
  );
}
