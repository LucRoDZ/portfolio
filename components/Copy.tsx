import { isTodo, present } from '@/lib/todo';

type Tag = 'span' | 'p' | 'li' | 'dd' | 'h3';

/** Renders a copy string; TODO(lucas) placeholders are outlined in dev and omitted in production. */
export function Copy({ text, as: Component = 'span', className }: { text: string; as?: Tag; className?: string }) {
  const value = present(text);
  if (value === null) return null;
  const classes = [className, isTodo(value) ? 'todo' : null].filter(Boolean).join(' ');
  return <Component className={classes || undefined}>{value}</Component>;
}
