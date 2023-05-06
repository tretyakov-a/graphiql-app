import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import { useResizeableFlex } from '../hooks/use-resizable-flex';

const QueryEditor = () => {
  const { flex, dragBar } = useResizeableFlex('queryEditor', {
    dragBar: { orientation: 'horizontal' },
  });

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
      {dragBar}
    </div>
  );
};

export default QueryEditor;
