import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';

const QueryEditor = () => {
  return (
    <div className={classes.queryEditorContainer}>
      <section className={classes.queryEditor}>
        <div className={classes.queryEditorText}>
          <Editor value="query {}" />
        </div>
        <aside className={classes.queryEditorToolbar}>
          <IconButton icon={faPlay} className={classes.playButton} />
        </aside>
      </section>
    </div>
  );
};

export default QueryEditor;
