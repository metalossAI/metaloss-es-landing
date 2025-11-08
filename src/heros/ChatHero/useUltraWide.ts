import { useState, useEffect } from 'react';

export default function useUltraWide() {
  const [isUltraWide, setIsUltraWide] = useState(false);
  useEffect(() => {
    function check() {
      setIsUltraWide(window.innerWidth / window.innerHeight >= 3);
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isUltraWide;
}
