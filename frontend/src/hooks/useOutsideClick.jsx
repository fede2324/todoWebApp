// useClickOutside.js
import { useEffect } from 'react';

export function useClickOutside(ref, handler,isEnable=true) {
  useEffect(() => {
    if (!isEnable) return;
    const listener = (event) => {
      console.log('Click target:', event.target);
      if (!ref.current || ref.current.contains(event.target) || event.target.closest('.btnHeader')) return;
      handler();
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, isEnable]);
}
