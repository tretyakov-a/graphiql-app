import classes from './style.module.scss';

const BottomEditors = () => {
  return (
    <>
      <div className="bottomEditorsHeader dragBar dragBarHorizontal">
        <div className="editorTabHeader">Variables</div>
        <div className="editorTabHeader">Headers</div>
      </div>
      <div className={classes.bottomEditors}>
        <div className="bottomEditorsTabs">
          <section className="variablesEditor editorTab">headers editor</section>
          <section className="headersEditor editorTab">variables editor</section>
        </div>
      </div>
    </>
  );
};

export default BottomEditors;
