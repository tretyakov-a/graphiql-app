import React, { useContext, useRef, useState } from 'react';
import classes from './style.module.scss';
import { classNames } from '@src/shared/utils';
import { DragBarProps } from './types';
import useOrientation from '../use-orientation';
import { DragContext } from '@src/shared/contexts/drag';
import { MouseActionsContext } from '@src/shared/contexts/mouse';

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
  const isDraggedRef = useRef(false);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const { getPosition, getDelta, getActiveCursor } = useOrientation(orientation, placing);
  const { setMouseMoveHandler, setMouseUpHandler } = useContext(MouseActionsContext);

  const setDragged = (value: boolean) => {
    setIsDragged(value);
    isDraggedRef.current = value;
  };

  const handleMouseMove =
    (delta: number, ...rest: [() => void, DOMRect?]) =>
    (e: React.MouseEvent) => {
      if (!isDraggedRef.current) return;
      onPositionChange(getPosition(e, delta), ...rest);
    };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const delta = getDelta(e, rect);

    const handleMouseUp = () => {
      setMouseMoveHandler(null);
      setMouseUpHandler(null);
      document.body.style.cursor = 'default';
      setDragged(false);
      onDragEnd?.();
    };
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const handleMouseMoveWithParams = handleMouseMove(delta, handleMouseUp, containerRect);

    setMouseMoveHandler(() => handleMouseMoveWithParams);
    setMouseUpHandler(() => handleMouseUp);
    document.body.style.cursor = getActiveCursor();
    setDragged(true);
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
