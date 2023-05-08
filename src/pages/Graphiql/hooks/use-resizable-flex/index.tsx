import DragBar from './DragBar';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@src/store';
import { DragContext } from '@src/shared/contexts/drag';
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
  const { containerRef } = useContext(DragContext);
  const [flex, setFlexCurrent] = useState(storedFlexValue);
  const flexRef = useRef(storedFlexValue);
  const dispatch = useAppDispatch();
  const mergedOptions = useMemo(() => mergeOptions(options || {}, defaultOptions), [options]);
  const { orientation, placing } = mergedOptions.dragBar;
  const { getPosInContainer, isInBoundaries } = useOrientation(orientation, placing);

  const handleDragBarPosChange = useCallback(
    (pos: number, stopDragging: () => void) => {
      const { limits } = mergedOptions;
      if (!containerRef!.current) return;
      const rect = containerRef!.current.getBoundingClientRect();
      if (!isInBoundaries(pos, rect)) return;
      const [posInPx, posInPercents] = getPosInContainer(pos, rect);
      if (limits !== null) {
        if (limits?.leftTop && posInPx < limits?.leftTop.value / 2) {
          stopDragging();
          return limits?.leftTop.onLimitMet.call(null);
        }
      }
      setFlexCurrent(posInPercents / (1 - posInPercents));
    },
    [containerRef, mergedOptions, getPosInContainer]
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
