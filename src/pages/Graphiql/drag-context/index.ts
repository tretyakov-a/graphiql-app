import React from 'react';

export interface DragContextProps {
  containerRef: React.RefObject<HTMLElement> | null;
}

export const DragContext = React.createContext<DragContextProps>({
  containerRef: null,
});

export { default as DragContextProvider } from './DragContextProvider';
