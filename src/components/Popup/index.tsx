import Portal from '../Portal';
import React from 'react';
import { AnchorType, PopupContextProvider, PopupPosition } from './popup-context';
import ToggleButton from './ToggleButton';
import PopupContent from './PopupContent';

interface PopupProps extends React.PropsWithChildren {
  anchor: AnchorType;
  position?: PopupPosition;
}

const Popup = (props: PopupProps) => {
  const { anchor, children, position = 'right' } = props;

  return (
    <PopupContextProvider position={position}>
      <ToggleButton anchor={anchor} />
      <Portal>
        <PopupContent>{children}</PopupContent>
      </Portal>
    </PopupContextProvider>
  );
};

export default Popup;
