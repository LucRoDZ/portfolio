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
      className="meta inline-flex min-h-11 items-center px-2 hover:text-fg"
    >
      {name}
    </Link>
  );
}
