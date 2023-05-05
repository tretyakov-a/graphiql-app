import classes from './style.module.scss';
import DragBar from '../DragBar';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { useAppDispatch, useAppUI } from '@src/store';
import { DragContext, DragContextProvider } from '@src/shared/contexts/drag-context';
import QueryEditor from '../QueryEditor';
import BottomEditorsTabs from '../BottomEditorsTabs';

const MIN_WIDTH = 200;

const EditorsLeftPanel = () => {
  const { containerRef } = useContext(DragContext);
  const {
    editorsLeftPanelFlex,
    actions: { setEditorsLeftPanelFlex },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const [flex, setFlex] = useState(editorsLeftPanelFlex);
  const editorsContainerRef = useRef<HTMLDivElement>(null);

  const handleDragBarPosChange = useCallback(
    (x: number) => {
      if (!containerRef!.current) return;
      const rect = containerRef!.current.getBoundingClientRect();
      const posPx = x - rect.x;
      const posPercent = posPx / rect.width;
      setFlex(posPercent / (1 - posPercent));
    },
    [containerRef]
  );

  const editorsLeftPanelClasses = [classes.editorsLeftPanel].join(' ');

  const handleDragEnd = () => {
    dispatch(setEditorsLeftPanelFlex(flex));
  };

  return (
    <div className={editorsLeftPanelClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <div className={classes.editorsLeftPanelContainer} ref={editorsContainerRef}>
        <DragContextProvider containerRef={editorsContainerRef}>
          <QueryEditor />
        </DragContextProvider>
        <BottomEditorsTabs />
      </div>
      <DragBar
        onPositionChange={handleDragBarPosChange}
        onDragEnd={handleDragEnd}
        position="right"
      />
    </div>
  );
};

export default EditorsLeftPanel;
