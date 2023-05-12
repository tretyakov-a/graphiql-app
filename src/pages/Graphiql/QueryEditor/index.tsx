import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';

const QueryEditor = () => {
  const {
    query: { loading },
    actions: { fetchGraphqlQuery },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  const handleRequestButtonClick = () => {
    dispatch(fetchGraphqlQuery());
  };

  return (
    <div className={classes.queryEditorContainer}>
      <section className={classes.queryEditor}>
        <div className={classes.queryEditorText}>
          <Editor editorKey="query" />
        </div>
        <aside className={classes.queryEditorToolbar}>
          <IconButton
            onClick={handleRequestButtonClick}
            icon={faPlay}
            className={classes.requestButton}
            disabled={loading === Loading.PENDING}
          />
        </aside>
      </section>
    </div>
  );
};

export default QueryEditor;
