import React, { useCallback, useRef, useState } from 'react';

export interface ScrollContextProps {
  containerRef: React.RefObject<HTMLElement> | null;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
  registerOnClick: (cb: () => void) => () => void;
}

const noop = () => {};

export const ScrollContext = React.createContext<ScrollContextProps>({
  containerRef: null,
  setScroll: noop,
  registerOnClick: () => noop,
});

export const ScrollContextProvider = ({ children }: React.PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScroll, setScroll] = useState(true);

  const registerOnClick = useCallback((cb: () => void) => {
    containerRef.current?.addEventListener('click', cb);

    return () => {
      containerRef.current?.removeEventListener('click', cb);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ containerRef, setScroll, registerOnClick }}>
      <div id="scroll-container" className={!isScroll ? 'no-scroll' : ''} ref={containerRef}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
