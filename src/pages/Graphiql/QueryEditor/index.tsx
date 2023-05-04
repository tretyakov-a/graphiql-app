import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';

const QueryEditor = () => {
  return (
    <section className={classes.queryEditor}>
      <div className={classes.queryEditorText}>
        <Editor value="query {}" />
      </div>
      <aside className={[classes.queryEditorToolbar, classes.verticalToolbar].join(' ')}>
        <IconButton icon={faPlay} className={classes.playButton} />
      </aside>
    </section>
  );
};

export default QueryEditor;
