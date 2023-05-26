import Portal from '../Portal';
import React from 'react';
import { AnchorType, PopupContextProvider } from './popup-context';
import ToggleButton from './ToggleButton';
import PopupContent from './PopupContent';

interface PopupProps extends React.PropsWithChildren {
  anchor: AnchorType;
}

const Popup = (props: PopupProps) => {
  const { anchor, children } = props;

  return (
    <PopupContextProvider>
      <ToggleButton anchor={anchor} />
      <Portal>
        <PopupContent>{children}</PopupContent>
      </Portal>
    </PopupContextProvider>
  );
};

export default Popup;
