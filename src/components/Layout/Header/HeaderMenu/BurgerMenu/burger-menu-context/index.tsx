import { ScrollContext } from '@src/shared/contexts/scroll';
import React, { useCallback, useContext, useState } from 'react';

export interface BurgerMenuContextProps {
  isMenuOpened: boolean;
  toggleMenu: () => void;
}

export const BurgerMenuContext = React.createContext<BurgerMenuContextProps>({
  isMenuOpened: false,
  toggleMenu: () => {},
});

export const BurgerMenuContextProvider = ({ children }: React.PropsWithChildren) => {
  const { setScroll, registerOnClick } = useContext(ScrollContext);
  const [isMenuOpened, setIsMenuOpen] = useState(false);
  const [cleanup, setCleanUp] = useState<() => void>(() => {});

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isMenuOpenedPrev) => {
      setScroll(isMenuOpenedPrev);
      if (!isMenuOpenedPrev) {
        const cleanupFn = registerOnClick(() => {
          setIsMenuOpen(false);
          cleanupFn();
        });
        setCleanUp(() => cleanupFn);
      } else {
        if (cleanup) cleanup();
      }
      return !isMenuOpenedPrev;
    });
  }, [registerOnClick, setScroll, cleanup]);

  return (
    <BurgerMenuContext.Provider value={{ isMenuOpened, toggleMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};
