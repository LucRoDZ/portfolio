import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { brand } from '@/lib/brand';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const font = await readFile(join(process.cwd(), 'assets/fonts/SchibstedGrotesk-SemiBold.ttf'));
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brand.dark.bg,
          color: brand.dark.fg,
          fontFamily: 'Sans',
          fontSize: 92,
          letterSpacing: '-0.04em',
        }}
      >
        LZ
      </div>
    ),
    { ...size, fonts: [{ name: 'Sans', data: font, weight: 600, style: 'normal' }] },
  );
}
