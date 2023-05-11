import React, { useContext, useRef, useState } from 'react';
import classes from './style.module.scss';
import { classNames } from '@src/shared/utils';
import { DragBarProps } from './types';
import useOrientation from '../use-orientation';
import { DragContext } from '@src/shared/contexts/drag';

const DragBar = React.memo((props: DragBarProps) => {
  const {
    onPositionChange,
    onDragEnd,
    onDragStart,
    placing = 'left',
    orientation = 'vertical',
  } = props;
  const { containerRef } = useContext(DragContext);
  const [isDragged, setIsDragged] = useState(false);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const { getPosition, getDelta, getActiveCursor } = useOrientation(orientation, placing);

  const handleMouseMove =
    (delta: number, ...rest: [() => void, DOMRect?]) =>
    (e: MouseEvent) => {
      onPositionChange(getPosition(e, delta), ...rest);
    };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const delta = getDelta(e, rect);

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMoveWithParams);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      setIsDragged(false);
      onDragEnd?.();
    };
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const handleMouseMoveWithParams = handleMouseMove(delta, handleMouseUp, containerRect);

    document.addEventListener('mousemove', handleMouseMoveWithParams);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = getActiveCursor();
    setIsDragged(true);
    onDragStart?.();
  };

  const dragBarClasses = classNames([
    classes.dragbar,
    isDragged && classes.dragbarDragged,
    orientation === 'horizontal' && classes.dragbarHorizontal,
  ]);

  const wrapperClasses = classNames([
    classes.dragbarWrapper,
    placing === 'right' && classes.dragbarWrapperRight,
    placing === 'bottom' && classes.dragbarWrapperBottom,
  ]);

  return (
    <div className={dragBarClasses} onMouseDown={handleMouseDown} ref={dragBarRef}>
      <div className={wrapperClasses}>
        <div className={classes.dragbarThumb}></div>
      </div>
    </div>
  );
});

export default DragBar;
