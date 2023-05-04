import btnClasses from '@src/styles/button.module.scss';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: IconDefinition;
  iconSize?: SizeProp;
  isActive?: boolean;
}

const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const { icon, iconSize, className, onClick, isActive } = props;

  const classes = [
    btnClasses.button,
    btnClasses.buttonIcon,
    isActive ? btnClasses.buttonActive : '',
    className,
  ].join(' ');

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={classes}>
      <FontAwesomeIcon icon={icon} size={iconSize || 'xl'} />
    </button>
  );
});

export default IconButton;
