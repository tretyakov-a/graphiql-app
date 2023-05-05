import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './style.module.scss';
import { DragContext } from '@src/shared/contexts/drag-context';
import { classNames } from '@src/shared/utils';

interface DragBarProps {
  onPositionChange: (pos: number) => void;
  onDragEnd?: () => void;
  position?: 'left' | 'right';
  orientation?: 'horizontal' | 'vertical';
}

const DragBar = (props: DragBarProps) => {
  const { onPositionChange, onDragEnd, position = 'left', orientation = 'vertical' } = props;
  const { isLimitMet, setIsLimitMet } = useContext(DragContext);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const [isDragged, setIsDragged] = useState(false);
  const [removeListeners, setRemoveListeners] = useState<() => void>(() => () => {});
  const isHorizontal = orientation === 'horizontal';

  const handleMouseMove = (delta: number) => (e: MouseEvent) => {
    let pos = 0;
    if (isHorizontal) {
      pos = e.screenY + delta;
    } else {
      pos = position === 'left' ? e.screenX + delta : e.screenX - delta;
    }
    onPositionChange(pos);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragged(true);
    setIsLimitMet(false);
    const rect = (e.target as HTMLElement).getBoundingClientRect();

    let delta = 0;
    if (isHorizontal) {
      delta = rect.y + rect.height - e.screenY;
    } else {
      delta = position === 'left' ? rect.x + rect.width - e.screenX : e.screenX - rect.x;
    }

    const handleMouseMoveWithX = handleMouseMove(delta);
    const handleMouseUp = () => {
      setIsDragged(false);
      document.removeEventListener('mousemove', handleMouseMoveWithX);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      onDragEnd?.();
    };

    document.addEventListener('mousemove', handleMouseMoveWithX);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = isHorizontal ? 'row-resize' : 'col-resize';
    setRemoveListeners(() => handleMouseUp);
  };

  useEffect(() => {
    if (isDragged === false || isLimitMet === true) {
      removeListeners();
    }
  }, [isDragged, removeListeners, isLimitMet]);

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
};

export default DragBar;
