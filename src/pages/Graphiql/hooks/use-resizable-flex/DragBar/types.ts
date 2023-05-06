export type DragBarOrientation = 'horizontal' | 'vertical';
export type DragbarPosition = 'left' | 'right';

export interface DragBarProps {
  onPositionChange: (pos: number, stopDragging: () => void) => void;
  onDragEnd?: () => void;
  position?: DragbarPosition;
  orientation?: DragBarOrientation;
}
