import classes from './style.module.scss';
import React, { useContext, useMemo, useRef } from 'react';
import QueryEditor from '../QueryEditor';
import BottomEditorsTabs from '../BottomEditorsTabs';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { DragContext } from '@src/shared/contexts/drag';
import { classNames } from '@src/shared/utils';

const MIN_WIDTH = 200;
const STORE_KEY = 'editors';

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
  const { flex, dragBar } = useResizeableFlex(STORE_KEY, dragOptions);
  const editorsContainerRef = useRef<HTMLDivElement>(null);

  const editorsLeftPanelClasses = classNames([
    classes.editorsLeftPanel,
    matchesXsBreakpoint && classes.editorsLeftPanelColumn,
  ]);

  return (
    <div className={editorsLeftPanelClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <div className={classes.editorsLeftPanelContainer} ref={editorsContainerRef}>
        <DragContext.Provider value={{ containerRef: editorsContainerRef }}>
          <QueryEditor />
          <BottomEditorsTabs />
        </DragContext.Provider>
      </div>
      {dragBar}
    </div>
  );
};

export default EditorsLeftPanel;
