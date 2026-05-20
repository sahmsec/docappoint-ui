'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Force scroll to top on reload/initial render
    window.scrollTo(0, 0);

    // Disable native browser scroll restoration behavior across reloads
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
}
