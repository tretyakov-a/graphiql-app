import classes from '../style.module.scss';
import React, { useContext, useRef } from 'react';
import { PopupContext } from '../popup-context';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import { classNames } from '@src/shared/utils';

const PopupContent = ({ children }: React.PropsWithChildren) => {
  const { anchorRef, isVisible, position } = useContext(PopupContext);

  const contentRef = useRef<HTMLDivElement>(null);
  useOpenCloseAnimation(contentRef, isVisible, {
    animationName: 'fade',
  });

  const rect = anchorRef?.current?.getBoundingClientRect();
  const contentRect = contentRef?.current?.getBoundingClientRect();

  const popupPosition: { top?: string; left?: string; right?: string } = rect
    ? {
        top: `${rect.y + rect.height}px`,
      }
    : {};

  if (rect && position === 'right') {
    popupPosition.right = `${document.body.clientWidth - rect.right}px`;
  }

  if (rect && contentRect && position === 'left') {
    const left = rect.left;
    popupPosition.left =
      left + contentRect.width > document.body.clientWidth ? 'var(--content-padding)' : `${left}px`;
  }

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
