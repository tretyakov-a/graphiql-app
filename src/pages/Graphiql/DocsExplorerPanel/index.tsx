import classes from './style.module.scss';
import DragBar from '../DragBar';
import React, { useCallback, useContext, useState } from 'react';
import { useAppDispatch, useAppUI } from '@src/store';
import { DragContext } from '@src/shared/contexts/drag-context';

const MIN_WIDTH = 200;

const DocsExplorerPanel = () => {
  const { containerRef, setIsLimitMet } = useContext(DragContext);
  const {
    isDocsVisible,
    docsExplorerFlex,
    actions: { setDocsExplorerFlex, toggleDocsVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const [flex, setFlex] = useState(docsExplorerFlex);

  const handleDragBarPosChange = useCallback(
    (x: number) => {
      if (!containerRef!.current) return;
      const rect = containerRef!.current.getBoundingClientRect();
      const posPx = x - rect.x;
      if (posPx < MIN_WIDTH / 2) {
        setIsLimitMet(true);
        return dispatch(toggleDocsVisibility());
      }
      const posPercent = posPx / rect.width;
      setFlex(posPercent / (1 - posPercent));
    },
    [containerRef, setIsLimitMet, dispatch, toggleDocsVisibility]
  );

  const docsExplorerClasses = [
    classes.docsExplorerPanel,
    !isDocsVisible ? classes.docsExplorerPanelCollapsed : '',
  ].join(' ');

  const handleDragEnd = () => {
    dispatch(setDocsExplorerFlex(flex));
  };

  return (
    <div className={docsExplorerClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <section className={classes.docsExplorerContainer}>
        <h2>Docs</h2>
      </section>
      <DragBar onPositionChange={handleDragBarPosChange} onDragEnd={handleDragEnd} />
    </div>
  );
};

export default DocsExplorerPanel;
