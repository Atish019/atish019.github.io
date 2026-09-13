import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  /** Extra classes for placement inside a given nav layout. */
  className?: string;
  /** Hover-state hook shared with the custom cursor in the hero. */
  onHoverChange?: (hovered: boolean) => void;
}

/**
 * Sun / moon switch. Two icons live in the same 16px box and cross-fade with a
 * quarter turn, so the swap reads as one object rotating rather than two icons
 * swapping places.
 */
export function ThemeToggle({ className = '', onHoverChange }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-sm border border-bronze/45 text-fg-3 hover:text-gold hover:border-gold/80 transition-colors duration-300 backdrop-blur-sm ${className}`}
    >
      <span className="relative block w-4 h-4">
        {/* Moon — shown while the site is dark */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-4 h-4"
          animate={{ opacity: isLight ? 0 : 1, rotate: isLight ? 90 : 0, scale: isLight ? 0.6 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>

        {/* Sun — shown while the site is light */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-4 h-4"
          animate={{ opacity: isLight ? 1 : 0, rotate: isLight ? 0 : -90, scale: isLight ? 1 : 0.6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </motion.svg>
      </span>

      {/* Corner tick, matching the crosshair language used across the site */}
      <span className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
      <span className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-300" />
    </button>
  );
}

/**
 * The header toggle scrolls away with the hero, so this pinned copy fades in
 * once the visitor is past it and stays reachable for the rest of the page.
 */
export function FloatingThemeToggle() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-50"
        >
          <ThemeToggle className="bg-surface-1/85 backdrop-blur-md shadow-[0_8px_28px_rgba(var(--p-shadow-rgb),0.55)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
