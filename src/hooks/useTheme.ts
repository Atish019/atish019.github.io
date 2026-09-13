import { useCallback, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'aks-theme';

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * Reads the theme applied by the pre-paint script in index.html and lets the
 * UI flip it. The choice is remembered. New visitors always start dark — the
 * portfolio is built dark first — so the OS preference is deliberately not
 * consulted; switching is the visitor's call, not their system's.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const apply = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just won't survive a reload */
    }
    setTheme(next);
    window.setTimeout(() => root.classList.remove('theme-transition'), 460);
  }, []);

  const toggle = useCallback(() => {
    apply(currentTheme() === 'light' ? 'dark' : 'light');
  }, [apply]);

  return { theme, toggle };
}
