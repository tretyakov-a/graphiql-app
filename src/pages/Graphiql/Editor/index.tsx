import './codemirror.scss';
import classes from './style.module.scss';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';

const basicSetupOptions = {
  foldGutter: true,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  syntaxHighlighting: true,
  bracketMatching: true,
  closeBrackets: true,
  highlightSelectionMatches: true,
};

const Editor = (props: ReactCodeMirrorProps) => {
  const { basicSetup } = props;
  return (
    <div className={classes.editorContainer}>
      <CodeMirror
        {...props}
        basicSetup={{ ...basicSetupOptions, ...(basicSetup as object) }}
        height="100%"
      />
    </div>
  );
};

export default Editor;
