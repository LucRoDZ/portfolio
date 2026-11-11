import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { brand } from '@/lib/brand';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), 'assets/fonts/PlusJakartaSans-Bold.ttf'));
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brand.bg,
          color: brand.fg,
          fontFamily: 'Sans',
          fontSize: 92,
          letterSpacing: '-0.04em',
        }}
      >
        <span>LZ</span>
        <div style={{ width: 18, height: 18, borderRadius: 9, background: brand.accent, marginLeft: 4, marginTop: 44 }} />
      </div>
    ),
    { ...size, fonts: [{ name: 'Sans', data: font, weight: 700, style: 'normal' }] },
  );
}
