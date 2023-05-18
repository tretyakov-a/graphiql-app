import classes from './style.module.scss';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Editor from '../Editor';
import IconButton from '@src/components/IconButton';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { useContext } from 'react';
import { EditorsContext } from '@src/shared/contexts/editors';

const QueryEditor = () => {
  const {
    query: { loading },
    actions: { fetchGraphqlQuery },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  const {
    editors: { query, variables },
  } = useContext(EditorsContext);

  const handleRequestButtonClick = () => {
    dispatch(fetchGraphqlQuery({ query, variables }));
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
            tooltip={{ langKey: 'execute' }}
            className={classes.requestButton}
            disabled={loading === Loading.PENDING}
          />
        </aside>
      </section>
    </div>
  );
};

export default QueryEditor;
