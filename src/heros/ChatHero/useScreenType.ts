import { useState, useEffect } from 'react';
export type ScreenType = 'mobile' | 'tablet' | 'laptop' | 'desktop';
export function useScreenType(): ScreenType {
  const [screen, setScreen] = useState<ScreenType>('desktop');
  useEffect(() => {
    function check() {
      const w = window.innerWidth;
      if (w < 640) setScreen('mobile');        // <640px
      else if (w < 1024) setScreen('tablet');  // 640px - 1023px
      else if (w < 1440) setScreen('laptop');  // 1024px - 1439px
      else setScreen('desktop');               // >=1440px
    }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return screen;
}
