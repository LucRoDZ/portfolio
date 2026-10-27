import { NotFoundContent } from '@/components/NotFoundContent';
import { getDictionary, locales } from '@/lib/i18n';

/** not-found receives no params, so both translations are passed down and the client picks one from the URL. */
export default function NotFound() {
  const copy = Object.fromEntries(locales.map((l) => [l, getDictionary(l).notFound]));
  return <NotFoundContent copy={copy} />;
}
