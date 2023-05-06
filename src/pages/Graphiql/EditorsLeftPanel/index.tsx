import classes from './style.module.scss';
import React, { useMemo, useRef } from 'react';
import { DragContextProvider } from '@src/pages/Graphiql/drag-context';
import QueryEditor from '../QueryEditor';
import BottomEditorsTabs from '../BottomEditorsTabs';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { DragOptions } from '../hooks/use-resizable-flex/types';

const MIN_WIDTH = 200;

const EditorsLeftPanel = () => {
  const dragOptions = useMemo<DragOptions>(() => ({ dragBar: { position: 'right' } }), []);
  const { flex, dragBar } = useResizeableFlex('editors', dragOptions);
  const editorsContainerRef = useRef<HTMLDivElement>(null);

  const editorsLeftPanelClasses = [classes.editorsLeftPanel].join(' ');

  return (
    <div className={editorsLeftPanelClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <div className={classes.editorsLeftPanelContainer} ref={editorsContainerRef}>
        <DragContextProvider containerRef={editorsContainerRef}>
          <QueryEditor />
        </DragContextProvider>
        <BottomEditorsTabs />
      </div>
      {dragBar}
    </div>
  );
};

export default EditorsLeftPanel;
