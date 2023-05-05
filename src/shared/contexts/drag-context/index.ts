import React from 'react';

export type DragLimits = {
  leftTop?: number;
  rightBottom?: number;
};

export interface DragContextProps {
  containerRef: React.RefObject<HTMLElement> | null;
  limits: DragLimits;
  setLimits: React.Dispatch<React.SetStateAction<DragLimits>>;
  isLimitMet: boolean;
  setIsLimitMet: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DragContext = React.createContext<DragContextProps>({
  containerRef: null,
  limits: {
    leftTop: 0,
    rightBottom: 0,
  },
  setLimits: () => {},
  isLimitMet: false,
  setIsLimitMet: () => {},
});

export { default as DragContextProvider } from './DragContextProvider';
