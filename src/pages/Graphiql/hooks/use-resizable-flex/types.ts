import type { DragBarProps } from './DragBar/types';

export type LimitEntry = {
  value: number;
  onLimitMet: () => void;
};

export type DragLimits = {
  leftTop?: LimitEntry;
  rightBottom?: LimitEntry;
};

type DragBar = Omit<DragBarProps, 'onPositionChange'>;

export type DragOptions = {
  limits?: DragLimits | null;
  dragBar?: DragBar;
};

type MergedDragBar = DragBar & Required<Pick<DragBarProps, 'orientation' | 'placing'>>;

export type MergedDragOptions = Required<Pick<DragOptions, 'dragBar' | 'limits'>> & {
  dragBar: MergedDragBar;
};
