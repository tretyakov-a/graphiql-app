import React, { useContext } from 'react';
import { AnchorType, PopupContext } from '../popup-context';

interface ToggleButtonProps {
  anchor: AnchorType;
}

const ToggleButton = ({ anchor: Anchor }: ToggleButtonProps) => {
  const { anchorRef, isVisible, togglePopup } = useContext(PopupContext);
  if (Anchor === null) return null;

  return <Anchor onClick={togglePopup} ref={anchorRef} isActive={isVisible} />;
};

export default ToggleButton;
