import classes from '../style.module.scss';
import React, { useContext, useRef } from 'react';
import { PopupContext } from '../popup-context';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import { classNames } from '@src/shared/utils';

const PopupContent = ({ children }: React.PropsWithChildren) => {
  const { anchorRef, isVisible } = useContext(PopupContext);

  const contentRef = useRef<HTMLDivElement>(null);
  useOpenCloseAnimation(contentRef, isVisible, {
    animationName: 'fade',
  });

  const rect = anchorRef?.current?.getBoundingClientRect();
  const popupPosition = rect
    ? {
        right: `${document.body.clientWidth - rect.right}px`,
        top: `${rect.y + rect.height}px`,
      }
    : {};

  const popupClasses = classNames([classes.popup, isVisible && classes.popupShow]);

  return (
    <div
      ref={contentRef}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      className={popupClasses}
      style={popupPosition}
    >
      {children}
    </div>
  );
};

export default PopupContent;
