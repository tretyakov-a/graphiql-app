import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { useAppDispatch, useAppUI } from '@src/store';

const QueryEditor = () => {
  const {
    visiblity,
    actions: { setVisiblity },
  } = useAppUI();
  const isBottomEditorsVisible = visiblity.bottomEditors;
  const dispatch = useAppDispatch();
  const { flex, dragBar } = useResizeableFlex('queryEditor', {
    dragBar: {
      orientation: 'horizontal',
      onDragStart: () => {
        if (!isBottomEditorsVisible) {
          dispatch(setVisiblity({ bottomEditors: true }));
        }
      },
    },
  });

  return (
    <div
      className={classes.queryEditorContainer}
      style={{ flex: isBottomEditorsVisible ? flex : 1 }}
    >
      <section className={classes.queryEditor}>
        <div className={classes.queryEditorText}>
          <Editor value="query {}" />
        </div>
        <aside className={[classes.queryEditorToolbar, classes.verticalToolbar].join(' ')}>
          <IconButton icon={faPlay} className={classes.playButton} />
        </aside>
      </section>
      {dragBar}
    </div>
  );
};

export default QueryEditor;
