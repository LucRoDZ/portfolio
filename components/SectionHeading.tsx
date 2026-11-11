/** Section eyebrow + title (+ optional intro). The title is the section's accessible name via `id`. */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: number;
  label: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow flex items-center gap-3">
        <span>{String(index).padStart(2, '0')}</span>
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="mt-4 text-h3 font-strong text-balance md:text-h2">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-prose text-lead text-muted">{intro}</p>}
    </header>
  );
}
