import classes from './style.module.scss';
import React, { useContext, useMemo, useRef } from 'react';
import QueryEditor from '../QueryEditor';
import BottomEditorsTabs from '../BottomEditorsTabs';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { DragContext } from '@src/shared/contexts/drag';

const MIN_WIDTH = 200;

const EditorsLeftPanel = () => {
  const { matches } = useContext(MediaQueryContext);
  const matchesXsBreakpoint = matches![maxWidthQuery('xs')];
  const dragOptions = useMemo<DragOptions>(
    () => ({
      dragBar: {
        placing: matchesXsBreakpoint ? 'bottom' : 'right',
        orientation: matchesXsBreakpoint ? 'horizontal' : 'vertical',
      },
    }),
    [matchesXsBreakpoint]
  );
  const { flex, dragBar } = useResizeableFlex('editors', dragOptions);
  const editorsContainerRef = useRef<HTMLDivElement>(null);

  const editorsLeftPanelClasses = [
    classes.editorsLeftPanel,
    matchesXsBreakpoint && classes.editorsLeftPanelColumn,
  ].join(' ');

  return (
    <div className={editorsLeftPanelClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <div className={classes.editorsLeftPanelContainer} ref={editorsContainerRef}>
        <DragContext.Provider value={{ containerRef: editorsContainerRef }}>
          <QueryEditor />
        </DragContext.Provider>
        <BottomEditorsTabs />
      </div>
      {dragBar}
    </div>
  );
};

export default EditorsLeftPanel;
