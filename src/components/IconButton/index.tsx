import btnClasses from '@src/styles/button.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef } from 'react';

interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: IconDefinition;
}

const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const { icon, className, onClick } = props;
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={[btnClasses.button, btnClasses.buttonIcon, className].join(' ')}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
    </button>
  );
});

export default IconButton;
