import classes from './style.module.scss';
import Editor from '../Editor';
import { useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { json } from '@codemirror/lang-json';
import Loader from '@src/components/Loader';

const ResponsePanel = () => {
  const {
    query: { loading, error, response },
  } = useGraphqlStore();

  return (
    <div className={classes.responsePanel}>
      <section className={classes.response}>
        {loading === Loading.PENDING ? (
          <Loader />
        ) : error === null && response !== null ? (
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
