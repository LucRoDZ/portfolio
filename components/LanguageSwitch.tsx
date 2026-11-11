'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLocalePath, type Locale } from '@/lib/locale';

export function LanguageSwitch({ target, name }: { target: Locale; name: string }) {
  const pathname = usePathname();
  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      lang={target}
      className="inline-flex min-h-11 items-center rounded-full px-3 font-mono text-micro uppercase text-muted transition-colors hover:text-fg"
    >
      {name}
    </Link>
  );
}
