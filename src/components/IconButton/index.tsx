import btnClasses from '@src/styles/button.module.scss';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import { classNames } from '@src/shared/utils';
import { Tooltip, PlacesType } from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition;
  iconSize?: SizeProp;
  isActive?: boolean;
  isLoading?: boolean;
  tooltip?: {
    langKey: string;
    notShowOnActive?: boolean;
  };
}

const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const { icon, iconSize, className, onClick, isActive, isLoading, tooltip } = props;
  const { t } = useTranslation();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const classes = classNames([
    btnClasses.button,
    btnClasses.buttonIcon,
    isActive && btnClasses.buttonActive,
    className,
  ]);

  const tooltipProps = {
    'data-tooltip-id': tooltip?.langKey,
    'data-tooltip-content': t(`tooltips.${tooltip?.langKey}` || ''),
    'data-tooltip-place': 'bottom' as PlacesType,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    setIsTooltipOpen(false);
  };

  const handleMouseEnter = () => {
    if (tooltip?.notShowOnActive && isActive) return;
    setIsTooltipOpen(true);
  };

  return (
    <>
      <button
        {...(tooltip && tooltipProps)}
        ref={ref as React.RefObject<HTMLButtonElement>}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsTooltipOpen(false)}
        className={classes}
      >
        {isLoading ? (
          <Loader size="xs" />
        ) : (
          <FontAwesomeIcon icon={icon || faQuestion} size={iconSize || 'xl'} />
        )}
      </button>
      {tooltip !== undefined && (
        <Tooltip isOpen={isTooltipOpen} id={tooltip?.langKey} className={btnClasses.tooltip} />
      )}
    </>
  );
});

export default IconButton;
