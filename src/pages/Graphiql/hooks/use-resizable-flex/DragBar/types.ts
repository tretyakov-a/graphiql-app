export type DragBarOrientation = 'horizontal' | 'vertical';
export type DragbarPlacing = 'left' | 'right' | 'top' | 'bottom';

export type PositionChangeHandler = (pos: number, stopDragging: () => void, rect?: DOMRect) => void;

export interface DragBarProps {
  onPositionChange: PositionChangeHandler;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  placing?: DragbarPlacing;
  orientation?: DragBarOrientation;
}
