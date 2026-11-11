import type { L, Shot } from './types';

/** A screenshot in public/projects/<slug>/ (WebP, full size and `-800`). */
export function shot(slug: string, name: string, width: number, height: number, alt: L, device: Shot['device'] = 'desktop'): Shot {
  return { src: `/projects/${slug}/${name}`, width, height, alt, device };
}
