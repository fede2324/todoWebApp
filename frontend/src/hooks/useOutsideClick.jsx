// useClickOutside.js
import { useEffect } from 'react';

export function useClickOutside(ref, handler,isEnable=true) {
  useEffect(() => {
    if (!isEnable) return;
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target) || event.target.closest('.btnSimple')) return;
      handler();
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, isEnable]);
}
