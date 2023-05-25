import React, { useCallback, useRef, useState } from 'react';

export interface ScrollContextProps {
  containerRef: React.RefObject<HTMLElement> | null;
  setScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const noop = () => {};

export const ScrollContext = React.createContext<ScrollContextProps>({
  containerRef: null,
  setScroll: noop,
});

export const ScrollContextProvider = ({ children }: React.PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScroll, setScroll] = useState(true);

  return (
    <ScrollContext.Provider value={{ containerRef, setScroll }}>
      <div id="scroll-container" className={!isScroll ? 'no-scroll' : ''} ref={containerRef}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
};
