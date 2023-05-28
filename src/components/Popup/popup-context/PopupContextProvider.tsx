import { useContext, useRef, useState } from 'react';
import { PopupContext, PopupPosition } from '.';
import { MouseActionsContext } from '@src/shared/contexts/mouse';

interface PopupContextProviderProps extends React.PropsWithChildren {
  position: PopupPosition;
}

const PopupContextProvider = ({ children, position }: PopupContextProviderProps) => {
  const [isVisible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const { addClickHandler, removeClickHandler } = useContext(MouseActionsContext);

  const togglePopup = () => {
    if (!isVisible) {
      const cleanup = (e: React.MouseEvent) => {
        if (e.target === anchorRef.current) return;
        setVisible(false);
        removeClickHandler(cleanup);
      };
      addClickHandler(cleanup);
    }
    setVisible((prev) => !prev);
  };

  return (
    <PopupContext.Provider value={{ anchorRef, isVisible, togglePopup, position }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
