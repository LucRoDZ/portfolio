export const TODO_MARKER = 'TODO(lucas)';

export function isTodo(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.includes(TODO_MARKER);
}

/**
 * Placeholders stay visible in development (so they get filled) and are dropped from
 * production builds (so a half-finished case study never shows "TODO" to a recruiter).
 */
export function showTodos(env: string | undefined = process.env.NODE_ENV): boolean {
  return env !== 'production';
}

/** Returns the value, or `null` when it is a placeholder that should be hidden. */
export function present(value: string, show = showTodos()): string | null {
  return isTodo(value) && !show ? null : value;
}

/** Filters a list, keeping only items whose relevant strings are all real copy. */
export function presentAll<T>(items: T[], pick: (item: T) => string[], show = showTodos()): T[] {
  return show ? items : items.filter((item) => !pick(item).some(isTodo));
}
