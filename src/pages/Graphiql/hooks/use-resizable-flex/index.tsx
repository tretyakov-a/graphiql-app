import DragBar from './DragBar';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@src/store';
import { DragContext } from '@src/pages/Graphiql/drag-context';
import type { DragOptions } from './types';
import { FlexState, useAppUI } from '@src/store';
import { mergeOptions } from './utils';

// const isInBoundaries = (orientation: DragBarOrientation, pos: number, rect: DOMRect) => {
//   if (orientation == 'horizontal') {

//   } else {

//   }
// }

const defaultOptions: DragOptions = {
  limits: null,
  dragBar: { position: 'left', orientation: 'vertical' },
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

  const { dragBar: dragBarOptions, limits } = useMemo(
    () => mergeOptions(options || {}, defaultOptions),
    [options]
  );

  const handleDragBarPosChange = useCallback(
    (pos: number, stopDragging: () => void) => {
      if (!containerRef!.current) return;
      const rect = containerRef!.current.getBoundingClientRect();
      const posPx = pos - (dragBarOptions?.orientation === 'horizontal' ? rect.y : rect.x);
      if (limits !== null) {
        if (limits?.leftTop && posPx < limits?.leftTop.value / 2) {
          stopDragging();
          return limits?.leftTop.onLimitMet.call(null);
        }
      }
      const posPercent =
        posPx / (dragBarOptions?.orientation === 'horizontal' ? rect.height : rect.width);
      setFlexCurrent(posPercent / (1 - posPercent));
    },
    [containerRef, dragBarOptions, limits]
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
      {...dragBarOptions}
    />
  );

  return { flex, dragBar };
};
