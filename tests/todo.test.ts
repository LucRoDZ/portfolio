import { describe, expect, it } from 'vitest';
import { isTodo, present, presentAll, showTodos } from '@/lib/todo';

describe('TODO placeholders', () => {
  it('detects the marker anywhere in a string', () => {
    expect(isTodo('TODO(lucas): team size')).toBe(true);
    expect(isTodo('2026 — TODO(lucas): start month')).toBe(true);
    expect(isTodo('Solo')).toBe(false);
    expect(isTodo(undefined)).toBe(false);
  });
  it('shows placeholders outside production only', () => {
    expect(showTodos('development')).toBe(true);
    expect(showTodos('test')).toBe(true);
    expect(showTodos('production')).toBe(false);
  });
  it('hides placeholders when not shown', () => {
    expect(present('TODO(lucas): x', false)).toBeNull();
    expect(present('TODO(lucas): x', true)).toBe('TODO(lucas): x');
    expect(present('real copy', false)).toBe('real copy');
  });
  it('filters list items that contain any placeholder', () => {
    const items = [{ a: 'ok', b: 'ok' }, { a: 'ok', b: 'TODO(lucas): b' }];
    expect(presentAll(items, (i) => [i.a, i.b], false)).toEqual([items[0]]);
    expect(presentAll(items, (i) => [i.a, i.b], true)).toEqual(items);
  });
});
