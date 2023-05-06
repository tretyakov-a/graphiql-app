import type { DragBarOrientation, DragbarPosition } from './DragBar/types';

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
  dragBar?: {
    position?: DragbarPosition;
    orientation?: DragBarOrientation;
  };
};
