import { useRef, useState } from 'react';
import { PopupContext, PopupPosition } from '.';

interface PopupContextProviderProps extends React.PropsWithChildren {
  position: PopupPosition;
}

const PopupContextProvider = ({ children, position }: PopupContextProviderProps) => {
  const [isVisible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);

  const togglePopup = () => {
    if (!isVisible) {
      const makeInvisible = () => {
        setVisible(false);
        document.removeEventListener('click', makeInvisible);
      };
      document.addEventListener('click', makeInvisible);
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
