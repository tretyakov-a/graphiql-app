import btnClasses from '@src/styles/button.module.scss';
import classes from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const QueryEditor = () => {
  return (
    <section className={classes.queryEditor}>
      <div className={classes.queryEditorText}>query editor</div>
      <aside className={[classes.queryEditorToolbar, classes.verticalToolbar].join(' ')}>
        <button
          className={[
            btnClasses.button,
            btnClasses.buttonIcon,
            classes.queryEditorToolbarPlay,
          ].join(' ')}
        >
          <FontAwesomeIcon icon={faPlay} size="xl" />
        </button>
      </aside>
    </section>
  );
};

export default QueryEditor;
