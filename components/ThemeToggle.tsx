'use client';

/** Runs in <head> before paint so a stored preference never flashes the wrong theme. */
export const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeToggle({ label, light, dark }: { label: string; light: string; dark: string }) {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked: the choice still applies for this page view.
    }
  }

  return (
    <button type="button" onClick={toggle} className="meta inline-flex min-h-11 items-center px-2 hover:text-fg">
      <span className="sr-only">{label}: </span>
      <span className="when-light">{light}</span>
      <span className="when-dark">{dark}</span>
    </button>
  );
}
