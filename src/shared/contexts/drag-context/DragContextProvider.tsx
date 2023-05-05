import { useState } from 'react';
import { DragContext, type DragLimits } from '.';

interface DragContextProvider extends React.PropsWithChildren {
  containerRef: React.RefObject<HTMLElement>;
}

const DragContextProvider = ({ children, containerRef }: DragContextProvider) => {
  const [limits, setLimits] = useState<DragLimits>({
    leftTop: 0,
    rightBottom: 0,
  });

  const [isLimitMet, setIsLimitMet] = useState(false);

  return (
    <DragContext.Provider value={{ containerRef, limits, setLimits, isLimitMet, setIsLimitMet }}>
      {children}
    </DragContext.Provider>
  );
};

export default DragContextProvider;
