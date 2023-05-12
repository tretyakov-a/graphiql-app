import classes from './style.module.scss';
import Editor from '../Editor';

const ResponsePanel = () => {
  return (
    <div className={classes.responsePanel}>
      <section className={classes.response}>
        <Editor
          editorKey="response"
          codeMirrorProps={{ editable: false, basicSetup: { lineNumbers: false } }}
        />
      </section>
    </div>
  );
};

export default ResponsePanel;
