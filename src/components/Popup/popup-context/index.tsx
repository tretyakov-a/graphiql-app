import React from 'react';

export type AnchorType = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLElement> & React.HTMLProps<HTMLElement> & { isActive?: boolean }
>;

export interface PopupContextProps {
  anchorRef: React.RefObject<HTMLElement> | null;
  isVisible: boolean;
  togglePopup: () => void;
}

export const PopupContext = React.createContext<PopupContextProps>({
  anchorRef: null,
  isVisible: false,
  togglePopup: () => {},
});

export { default as PopupContextProvider } from './PopupContextProvider';
