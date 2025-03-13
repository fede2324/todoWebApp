import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches); // matchear resolution of screen with 

  useEffect(() => {
    const media = window.matchMedia(query);

    const handler = () => setMatches(media.matches);
    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
