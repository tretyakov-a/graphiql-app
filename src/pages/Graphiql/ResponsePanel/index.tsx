import classes from './style.module.scss';
import Editor from '../Editor';
import { useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { json } from '@codemirror/lang-json';

const ResponsePanel = () => {
  const {
    query: { loading, error, data },
  } = useGraphqlStore();

  return (
    <div className={classes.responsePanel}>
      <section className={classes.response}>
        {loading === Loading.PENDING ? (
          <div>Loading...</div>
        ) : error === null && data !== null ? (
          <Editor
            editorKey="response"
            codeMirrorProps={{
              editable: false,
              basicSetup: { lineNumbers: false },
              extensions: [json()],
            }}
          />
        ) : (
          ''
        )}
      </section>
    </div>
  );
};

export default ResponsePanel;
