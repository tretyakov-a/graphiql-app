import React, { useRef, useState } from 'react';
import classes from './style.module.scss';
import { classNames } from '@src/shared/utils';
import { DragBarProps } from './types';

const DragBar = React.memo((props: DragBarProps) => {
  const {
    onPositionChange,
    onDragEnd,
    onDragStart,
    position = 'left',
    orientation = 'vertical',
  } = props;
  const [isDragged, setIsDragged] = useState(false);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const isHorizontal = orientation === 'horizontal';

  const handleMouseMove = (delta: number, stopDragging: () => void) => (e: MouseEvent) => {
    let pos = 0;
    if (isHorizontal) {
      pos = e.screenY + delta;
    } else {
      pos = position === 'left' ? e.screenX + delta : e.screenX - delta;
    }
    onPositionChange(pos, stopDragging);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    let delta = 0;
    if (isHorizontal) {
      delta = rect.y + rect.height - e.screenY;
    } else {
      delta = position === 'left' ? rect.x + rect.width - e.screenX : e.screenX - rect.x;
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMoveWithX);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      setIsDragged(false);
      onDragEnd?.();
    };

    const handleMouseMoveWithX = handleMouseMove(delta, handleMouseUp);

    document.addEventListener('mousemove', handleMouseMoveWithX);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = isHorizontal ? 'row-resize' : 'col-resize';
    setIsDragged(true);
    onDragStart?.();
  };

  const dragBarClasses = classNames([
    classes.dragbar,
    isDragged && classes.dragbarDragged,
    isHorizontal && classes.dragbarHorizontal,
  ]);

  const wrapperClasses = classNames([
    classes.dragbarWrapper,
    position === 'right' && classes.dragbarWrapperRight,
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
