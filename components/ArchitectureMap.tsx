import type { L, Locale } from '@/content/types';
import { t } from '@/lib/i18n';

/*
 * Asmodee platform architecture, redrawn by hand from the internship report at a public level of
 * detail: no internal product name, hostnames or data. `built` marks what Lucas delivered.
 */
type Node = { label: string; built?: boolean };
type Layer = { name: L; nodes: Node[]; link?: string };

const layers: Layer[] = [
  {
    name: { en: 'Client', fr: 'Client' },
    link: 'REST · SSE',
    nodes: [
      { label: 'Vue 3 · Pinia' },
      { label: 'Voice dictation', built: true },
      { label: 'Projects', built: true },
      { label: 'Responsive · i18n', built: true },
    ],
  },
  {
    name: { en: 'API', fr: 'API' },
    nodes: [
      { label: 'FastAPI' },
      { label: '/audio', built: true },
      { label: '/documents', built: true },
      { label: '/project', built: true },
      { label: '/translate' },
    ],
  },
  {
    name: { en: 'Orchestration', fr: 'Orchestration' },
    nodes: [
      { label: 'LangChain · LangGraph' },
      { label: 'docx / xlsx tools', built: true },
    ],
  },
  {
    name: { en: 'AI providers', fr: 'Fournisseurs IA' },
    nodes: [
      { label: 'GPT-4o' },
      { label: 'Gemini · JSON schema', built: true },
      { label: 'Mistral OCR', built: true },
      { label: 'Whisper', built: true },
      { label: 'DeepL', built: true },
    ],
  },
  {
    name: { en: 'Data', fr: 'Données' },
    nodes: [
      { label: 'PostgreSQL · pgvector' },
      { label: 'Files · 48 h links', built: true },
    ],
  },
];

const quality: Layer = {
  name: { en: 'Quality gate', fr: 'Qualité' },
  nodes: [
    { label: 'Pytest + mocks', built: true },
    { label: 'Tox', built: true },
    { label: 'GitHub Actions', built: true },
  ],
};

function Chip({ node }: { node: Node }) {
  return (
    <li
      className={`rounded-sm border px-2 py-1 font-mono text-[0.72rem] leading-tight ${
        node.built ? 'border-accent/40 bg-accent-soft text-accent' : 'border-rule bg-surface text-fg'
      }`}
    >
      {node.label}
    </li>
  );
}

function Row({ layer, locale }: { layer: Layer; locale: Locale }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-start gap-3 sm:grid-cols-[7rem_1fr]">
      <p className="pt-1 font-mono text-micro uppercase text-muted">{t(layer.name, locale)}</p>
      <ul className="flex flex-wrap gap-1.5">
        {layer.nodes.map((n) => (
          <Chip key={n.label} node={n} />
        ))}
      </ul>
    </div>
  );
}

export function ArchitectureMap({ locale, title, legend }: { locale: Locale; title: string; legend: string }) {
  return (
    <figure className="flex h-full flex-col gap-4" aria-label={title}>
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div key={layer.name.en}>
            <Row layer={layer} locale={locale} />
            {i < layers.length - 1 && (
              <p aria-hidden="true" className="my-1 grid grid-cols-[5.5rem_1fr] gap-3 sm:grid-cols-[7rem_1fr]">
                <span />
                <span className="flex items-center gap-2 font-mono text-micro text-muted">
                  <span className="h-3 w-px bg-rule-strong" />
                  {layer.link}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-dashed border-rule-strong pt-3">
        <Row layer={quality} locale={locale} />
      </div>
      <figcaption className="mt-auto flex items-center gap-2 font-mono text-micro text-muted">
        <span aria-hidden="true" className="size-2.5 rounded-[2px] border border-accent/40 bg-accent-soft" />
        {legend}
      </figcaption>
    </figure>
  );
}
