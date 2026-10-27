/** Section number + name, set in the narrow label column. */
export function SectionLabel({ index, children, id }: { index: number; children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="meta flex gap-3 border-t border-rule-strong pt-3">
      <span className="text-accent">{String(index).padStart(2, '0')}</span>
      <span className="text-fg">{children}</span>
    </p>
  );
}
