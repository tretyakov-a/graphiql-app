import { useCallback } from 'react';
import { DragBarOrientation, DragbarPlacing } from './DragBar/types';

const useOrientation = (orientation: DragBarOrientation, placing: DragbarPlacing) => {
  const isHorizontal = orientation === 'horizontal';

  const getPosition = (e: MouseEvent, delta: number) => {
    let pos = 0;
    if (isHorizontal) {
      pos = e.screenY + delta;
    } else {
      pos = placing === 'left' ? e.screenX + delta : e.screenX - delta;
    }
    return pos;
  };

  const getDelta = (e: React.MouseEvent, rect: DOMRect) => {
    let delta = 0;
    if (isHorizontal) {
      delta = rect.y + rect.height - e.screenY;
    } else {
      delta = placing === 'left' ? rect.x + rect.width - e.screenX : e.screenX - rect.x;
    }
    return delta;
  };

  const getActiveCursor = () => {
    return isHorizontal ? 'row-resize' : 'col-resize';
  };

  const getPosInContainer = useCallback(
    (pos: number, rect: DOMRect) => {
      const posInPx = pos - (isHorizontal ? rect.y : rect.x);
      const posInPercents = posInPx / (isHorizontal ? rect.height : rect.width);
      return [posInPx, posInPercents];
    },
    [isHorizontal]
  );

  return { getPosition, getDelta, getActiveCursor, getPosInContainer };
};

export default useOrientation;
