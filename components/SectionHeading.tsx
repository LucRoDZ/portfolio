/** Section label + title (+ optional intro). The title is the section's accessible name via `id`. */
export function SectionHeading({ label, title, intro, id }: { label: string; title: string; intro?: string; id: string }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{label}</p>
      <h2 id={id} className="mt-3 text-h3 font-strong text-balance md:text-h2">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-prose text-lead text-muted">{intro}</p>}
    </header>
  );
}
