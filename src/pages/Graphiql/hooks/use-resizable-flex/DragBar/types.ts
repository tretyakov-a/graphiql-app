export type DragBarOrientation = 'horizontal' | 'vertical';
export type DragbarPlacing = 'left' | 'right';

export interface DragBarProps {
  onPositionChange: (pos: number, stopDragging: () => void) => void;
  onDragEnd?: () => void;
  onDragStart?: () => void;
  placing?: DragbarPlacing;
  orientation?: DragBarOrientation;
}
