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
  const { setScroll } = useContext(ScrollContext);
  const [isMenuOpened, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isMenuOpenedPrev) => {
      setScroll(isMenuOpenedPrev);
      return !isMenuOpenedPrev;
    });
  }, [setScroll]);

  return (
    <BurgerMenuContext.Provider value={{ isMenuOpened, toggleMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};
