import type { DragBarProps } from './DragBar/types';

export type LimitEntry = {
  value: number;
  onLimitMet: () => void;
};

export type DragLimits = {
  leftTop?: LimitEntry;
  rightBottom?: LimitEntry;
};

type DragBar = Pick<DragBarProps, 'orientation' | 'placing'>;

export type DragOptions = {
  limits?: DragLimits | null;
  dragBar?: DragBar;
};

type MergedDragBar = Required<DragBar>;

export type MergedDragOptions = Required<DragOptions> & {
  dragBar: MergedDragBar;
};
