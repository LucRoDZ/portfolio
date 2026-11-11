/** Technologies as a plain sentence-like line, not a row of badges. */
export function StackLine({ items, label, className }: { items: string[]; label?: string; className?: string }) {
  if (items.length === 0) return null;
  return (
    <p className={`font-mono text-meta text-on-pill ${className ?? ''}`}>
      {label && <span className="sr-only">{label}: </span>}
      {items.join(', ')}
    </p>
  );
}
