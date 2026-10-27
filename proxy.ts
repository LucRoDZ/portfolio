import { NextResponse, type NextRequest } from 'next/server';
import { isLocale, negotiateLocale } from '@/lib/locale';

/** Redirects locale-less URLs (`/`, `/projects/x`) to the visitor's language, EN by default. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split('/')[1])) return NextResponse.next();

  const url = request.nextUrl.clone();
  const locale = negotiateLocale(request.headers.get('accept-language'));
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Vary', 'Accept-Language');
  return response;
}

export const config = {
  // Skip Next internals and any path with a file extension (icons, PDFs, sitemap.xml, robots.txt…).
  matcher: ['/((?!_next|apple-icon|.*\\..*).*)'],
};
