import DragBar from './DragBar';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@src/store';
import type { DragOptions } from './types';
import { FlexState, useAppUI } from '@src/store';
import { mergeOptions } from './utils';
import useOrientation from './use-orientation';

const defaultOptions: DragOptions = {
  limits: null,
  dragBar: { placing: 'left', orientation: 'vertical' },
};

export const useResizeableFlex = (flexStoreKey: keyof FlexState, options?: DragOptions) => {
  const {
    flexValues,
    actions: { setFlex },
  } = useAppUI();
  const storedFlexValue = flexValues[flexStoreKey];
  const [flex, setFlexCurrent] = useState(storedFlexValue);
  const flexRef = useRef(storedFlexValue);
  const dispatch = useAppDispatch();
  const mergedOptions = useMemo(() => mergeOptions(options || {}, defaultOptions), [options]);
  const { orientation, placing } = mergedOptions.dragBar;
  const { withRect } = useOrientation(orientation, placing);

  const handleDragBarPosChange = useCallback(
    (pos: number, stopDragging: () => void, rect?: DOMRect) => {
      const { limits } = mergedOptions;
      if (!rect) return;
      const { isInBoundaries, getPosInContainer, checkLimits } = withRect(rect);
      if (!isInBoundaries(pos)) return;
      const [posInPx, posInPercents] = getPosInContainer(pos);
      if (!checkLimits(limits, posInPx)) {
        return stopDragging();
      }
      setFlexCurrent(posInPercents / (1 - posInPercents));
    },
    [mergedOptions, withRect]
  );

  useEffect(() => {
    flexRef.current = flex;
  }, [flex]);

  const handleDragEnd = useCallback(() => {
    dispatch(setFlex({ [flexStoreKey]: flexRef.current }));
  }, [dispatch, flexRef, setFlex, flexStoreKey]);

  const dragBar = (
    <DragBar
      onPositionChange={handleDragBarPosChange}
      onDragEnd={handleDragEnd}
      {...mergedOptions.dragBar}
    />
  );

  return { flex, dragBar };
};
