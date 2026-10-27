import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { brand } from './brand';

export const ogSize = { width: 1200, height: 630 };

const fontFiles = () =>
  Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SchibstedGrotesk-SemiBold.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/IBMPlexMono-Regular.ttf')),
  ]);

/** Shared 1200×630 card: label, title, subtitle and up to three metrics, in the light palette. */
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
  const c = brand.light;
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
          padding: 64,
          fontFamily: 'Sans',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 24, color: c.muted }}>
          <span style={{ fontFamily: 'Sans', color: c.fg, fontSize: 32 }}>LZ</span>
          <span>{label}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 1000 }}>{title}</div>
          <div style={{ fontFamily: 'Mono', fontSize: 24, color: c.muted, marginTop: 20, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', borderTop: `2px solid ${c.fg}` }}>
          {metrics.slice(0, 3).map((m, i) => (
            <div
              key={m.value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                paddingTop: 20,
                paddingLeft: i > 0 ? 24 : 0,
                borderLeft: i > 0 ? `1px solid ${c.rule}` : 'none',
              }}
            >
              <span style={{ fontSize: 52, color: c.fg }}>{m.value.replace('→', ' → ')}</span>
              <span style={{ fontFamily: 'Mono', fontSize: 20, color: c.muted, marginTop: 6 }}>{m.caption}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Sans', data: sans, weight: 600, style: 'normal' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
