import React from 'react';

export type AnchorType = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLElement> & React.HTMLProps<HTMLElement> & { isActive?: boolean }
>;

export type PopupPosition = 'left' | 'right';

export interface PopupContextProps {
  anchorRef: React.RefObject<HTMLElement> | null;
  isVisible: boolean;
  togglePopup: () => void;
  position: PopupPosition;
}

export const PopupContext = React.createContext<PopupContextProps>({
  anchorRef: null,
  isVisible: false,
  togglePopup: () => {},
  position: 'right',
});

export { default as PopupContextProvider } from './PopupContextProvider';
