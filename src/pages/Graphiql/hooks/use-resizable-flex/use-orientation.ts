import { useCallback } from 'react';
import { DragBarOrientation, DragbarPlacing } from './DragBar/types';
import { DragLimits } from './types';

const useOrientation = (orientation: DragBarOrientation, placing: DragbarPlacing) => {
  const isHorizontal = orientation === 'horizontal';

  const getPosition = (e: MouseEvent, delta: number) => {
    let pos = 0;
    if (isHorizontal) {
      pos = placing === 'top' ? e.screenY + delta : e.screenY - delta;
    } else {
      pos = placing === 'left' ? e.screenX + delta : e.screenX - delta;
    }
    return pos;
  };

  const getDelta = (e: React.MouseEvent, dragBarRect: DOMRect) => {
    const { x, y, width, height } = dragBarRect;
    let delta = 0;
    if (isHorizontal) {
      delta = placing === 'top' ? y + height - e.screenY : e.screenY - y;
    } else {
      delta = placing === 'left' ? x + width - e.screenX : e.screenX - x;
    }
    return delta;
  };

  const getActiveCursor = () => {
    return isHorizontal ? 'row-resize' : 'col-resize';
  };

  const withRect = useCallback(
    (rect: DOMRect) => {
      const getPosInContainer = (pos: number) => {
        const { height, width } = rect;
        const posInPx = pos - (isHorizontal ? rect.y : rect.x);
        const posInPercents = isHorizontal
          ? placing === 'top'
            ? (height - posInPx) / height
            : posInPx / height
          : posInPx / width;
        return [posInPx, posInPercents];
      };

      const isInBoundaries = (pos: number) => {
        if (isHorizontal) {
          return pos >= rect.y && pos <= rect.y + rect.height;
        } else {
          return pos >= rect.x && pos <= rect.x + rect.width;
        }
      };

      const checkLimits = (limits: DragLimits | null, posInPx: number) => {
        let result = true;
        if (limits !== null) {
          if (limits?.leftTop && posInPx < limits?.leftTop.value / 2) {
            limits?.leftTop.onLimitMet.call(null);
            result = false;
          }
          if (limits?.rightBottom && posInPx > rect.height - limits?.rightBottom.value / 2) {
            limits?.rightBottom.onLimitMet.call(null);
            result = false;
          }
        }
        return result;
      };

      return { getPosInContainer, isInBoundaries, checkLimits };
    },
    [isHorizontal, placing]
  );

  return {
    getPosition,
    getDelta,
    getActiveCursor,
    withRect,
  };
};

export default useOrientation;
