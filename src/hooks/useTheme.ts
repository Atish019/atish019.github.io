import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'aks-theme';

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * Reads the theme applied by the pre-paint script in index.html and lets the
 * UI flip it. The choice is remembered; until the visitor picks one we follow
 * the operating system preference.
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

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (stored) return;
      apply(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  return { theme, toggle };
}
