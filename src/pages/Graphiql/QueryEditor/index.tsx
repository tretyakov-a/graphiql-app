import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { useAppDispatch, useAppUI } from '@src/store';
import { useMemo } from 'react';
import { DragOptions } from '../hooks/use-resizable-flex/types';

const QueryEditor = () => {
  const {
    visiblity,
    actions: { setVisiblity },
  } = useAppUI();
  const isBottomEditorsVisible = visiblity.bottomEditors;
  const dispatch = useAppDispatch();
  const dragOptions = useMemo<DragOptions>(
    () => ({
      dragBar: {
        orientation: 'horizontal',
        onDragStart: () => {
          if (!isBottomEditorsVisible) {
            dispatch(setVisiblity({ bottomEditors: true }));
          }
        },
      },
    }),
    [dispatch, setVisiblity, isBottomEditorsVisible]
  );
  const { flex, dragBar } = useResizeableFlex('queryEditor', dragOptions);

  return (
    <div
      className={classes.queryEditorContainer}
      style={{ flex: isBottomEditorsVisible ? flex : 1 }}
    >
      <section className={classes.queryEditor}>
        <div className={classes.queryEditorText}>
          <Editor value="query {}" />
        </div>
        <aside className={classes.queryEditorToolbar}>
          <IconButton icon={faPlay} className={classes.playButton} />
        </aside>
      </section>
      {dragBar}
    </div>
  );
};

export default QueryEditor;
