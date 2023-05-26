import { useRef, useState } from 'react';
import { PopupContext } from '.';

const PopupContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isVisible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);

  const togglePopup = () => {
    // e.stopPropagation();

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
    <PopupContext.Provider value={{ anchorRef, isVisible, togglePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupContextProvider;
