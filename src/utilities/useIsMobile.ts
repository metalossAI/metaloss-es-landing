import { useEffect, useState } from 'react';

/**
 * Returns true if the viewport matches Tailwind's `sm` breakpoint (mobile: <=640px).
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Match Tailwind's sm breakpoint
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    // Set initial value
    setIsMobile(mediaQuery.matches);
    // Handler for changes
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
