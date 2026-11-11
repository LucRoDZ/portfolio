import type { Locale, Shot as ShotData } from '@/content/types';
import { t } from '@/lib/i18n';

/**
 * A pre-optimised WebP screenshot (see public/projects/). Plain <img> on purpose: the standalone
 * build ships without sharp, so next/image optimisation is not available at runtime.
 * Desktop captures get a light browser frame, phone captures a device frame.
 */
export function Shot({
  shot,
  locale,
  sizes,
  priority = false,
  className,
}: {
  shot: ShotData;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const mobile = shot.device === 'mobile';
  const srcSet = shot.width > 800 ? `${shot.src}-800.webp 800w, ${shot.src}.webp ${shot.width}w` : undefined;
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${shot.src}.webp`}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={shot.width}
      height={shot.height}
      alt={t(shot.alt, locale)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="block h-auto w-full"
    />
  );

  if (mobile) {
    return (
      <div className={`overflow-hidden rounded-[1.5rem] border-[5px] border-fg bg-surface shadow-lift ${className ?? ''}`}>
        {img}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-md border border-rule bg-surface shadow-card ${className ?? ''}`}>
      <div aria-hidden="true" className="flex h-6 items-center gap-1.5 border-b border-rule bg-sunken px-3">
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
        <span className="size-2 rounded-full bg-rule-strong" />
      </div>
      {img}
    </div>
  );
}
