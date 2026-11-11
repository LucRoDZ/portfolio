import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { brand } from './brand';

export const ogSize = { width: 1200, height: 630 };

const fontFiles = () =>
  Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/PlusJakartaSans-Bold.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/JetBrainsMono-Regular.ttf')),
  ]);

/** Shared 1200×630 card: label, title, subtitle and up to three metrics, in the warm editorial palette. */
export async function renderOg({
  label,
  title,
  subtitle,
  metrics,
}: {
  label: string;
  title: string;
  subtitle: string;
  metrics: { value: string; caption: string }[];
}) {
  const [sans, mono] = await fontFiles();
  const c = brand;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: c.bg,
          color: c.fg,
          padding: '56px 64px',
          fontFamily: 'Sans',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 24, color: c.muted }}>
          <span style={{ display: 'flex', alignItems: 'center', fontFamily: 'Sans', color: c.fg, fontSize: 30 }}>
            <span style={{ width: 16, height: 16, borderRadius: 8, background: c.accent, marginRight: 14 }} />
            Lucas Zivan
          </span>
          <span>{label}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 56, lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: 1040 }}>{title}</div>
          <div style={{ fontFamily: 'Mono', fontSize: 20, color: c.muted, marginTop: 18, maxWidth: 1040 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', borderTop: `2px solid ${c.rule}` }}>
          {metrics.slice(0, 3).map((m, i) => (
            <div
              key={m.value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                paddingTop: 18,
                paddingLeft: i > 0 ? 24 : 0,
                borderLeft: i > 0 ? `1px solid ${c.rule}` : 'none',
              }}
            >
              <span style={{ fontFamily: 'Mono', fontSize: 40, color: c.accent }}>{m.value}</span>
              <span style={{ fontFamily: 'Mono', fontSize: 17, color: c.muted, marginTop: 6, paddingRight: 16 }}>{m.caption}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Sans', data: sans, weight: 700, style: 'normal' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
