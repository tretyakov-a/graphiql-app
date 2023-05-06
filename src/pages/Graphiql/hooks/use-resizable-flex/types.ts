import type { DragBarProps } from './DragBar/types';

export type LimitEntry = {
  value: number;
  onLimitMet: () => void;
};

export type DragLimits = {
  leftTop?: LimitEntry;
  rightBottom?: LimitEntry;
};

export type DragOptions = {
  limits?: DragLimits | null;
  dragBar?: Omit<DragBarProps, 'onPositionChange'>;
};
