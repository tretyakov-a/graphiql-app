import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import DragBar from '../DragBar';
import { useCallback, useContext, useState } from 'react';
import { DragContext } from '@src/shared/contexts/drag-context';
import { useAppDispatch, useAppUI } from '@src/store';

const QueryEditor = () => {
  const { containerRef } = useContext(DragContext);
  const {
    queryEditorPanelFlex,
    actions: { setQueryEditorPanelFlex },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const [flex, setFlex] = useState(queryEditorPanelFlex);

  const handleDragBarPosChange = useCallback(
    (pos: number) => {
      if (!containerRef!.current) return;
      const rect = containerRef!.current.getBoundingClientRect();
      const posPx = pos - rect.y;
      const posPercent = posPx / rect.height;
      setFlex(posPercent / (1 - posPercent));
    },
    [containerRef]
  );

  const handleDragEnd = () => {
    dispatch(setQueryEditorPanelFlex(flex));
  };

  return (
    <div className={classes.queryEditorContainer} style={{ flex: flex }}>
      <section className={classes.queryEditor}>
        <div className={classes.queryEditorText}>
          <Editor value="query {}" />
        </div>
        <aside className={[classes.queryEditorToolbar, classes.verticalToolbar].join(' ')}>
          <IconButton icon={faPlay} className={classes.playButton} />
        </aside>
      </section>
      <DragBar
        onPositionChange={handleDragBarPosChange}
        onDragEnd={handleDragEnd}
        position="right"
        orientation="horizontal"
      />
    </div>
  );
};

export default QueryEditor;
