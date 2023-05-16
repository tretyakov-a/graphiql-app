import btnClasses from '@src/styles/button.module.scss';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { classNames } from '@src/shared/utils';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition;
  iconSize?: SizeProp;
  isActive?: boolean;
}

const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const { icon, iconSize, className, onClick, disabled, isActive } = props;

  const classes = classNames([
    btnClasses.button,
    btnClasses.buttonIcon,
    isActive && btnClasses.buttonActive,
    className,
  ]);

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      {...{ onClick, disabled }}
      className={classes}
    >
      <FontAwesomeIcon icon={icon || faQuestion} size={iconSize || 'xl'} />
    </button>
  );
});

export default IconButton;
