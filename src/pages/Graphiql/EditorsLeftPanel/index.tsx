import classes from './style.module.scss';
import React, { useRef } from 'react';
import { DragContextProvider } from '@src/pages/Graphiql/drag-context';
import QueryEditor from '../QueryEditor';
import BottomEditorsTabs from '../BottomEditorsTabs';
import { useResizeableFlex } from '../hooks/use-resizable-flex';

const MIN_WIDTH = 200;

const EditorsLeftPanel = () => {
  const { flex, dragBar } = useResizeableFlex('editors', { dragBar: { position: 'right' } });
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
