import React from 'react';
import './codemirror.scss';
import classes from './style.module.scss';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { EditorKey } from '@src/store/graphql';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import { useCallback } from 'react';

interface EditorProps {
  editorKey: EditorKey;
  codeMirrorProps?: ReactCodeMirrorProps;
}

const basicSetupOptions = {
  foldGutter: true,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
  syntaxHighlighting: true,
  bracketMatching: true,
  closeBrackets: true,
  highlightSelectionMatches: true,
  indentOnInput: true,
};

const Editor = React.memo((props: EditorProps) => {
  const { codeMirrorProps, editorKey } = props;
  const {
    editors,
    actions: { setEditorValue },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  const onChange = useCallback((value: string) => {
    dispatch(setEditorValue({ editorKey, value }));
  }, []);

  return (
    <div className={classes.editorContainer}>
      <CodeMirror
        {...codeMirrorProps}
        basicSetup={{ ...basicSetupOptions, ...(codeMirrorProps?.basicSetup as object) }}
        height="100%"
        value={editors[editorKey]}
        onChange={onChange}
      />
    </div>
  );
});

export default Editor;
