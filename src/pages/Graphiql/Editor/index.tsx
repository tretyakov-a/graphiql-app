import { memo, useContext, useMemo } from 'react';
import './codemirror.scss';
import classes from './style.module.scss';
import CodeMirror, { type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { EditorKey } from '@src/store/graphql';
import { useGraphqlStore } from '@src/store';
import { useCallback } from 'react';
import { EditableEditorKey, EditorsContext } from '@src/shared/contexts/editors';

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

const Editor = memo((props: EditorProps) => {
  const { codeMirrorProps, editorKey } = props;
  const { responseOutput } = useGraphqlStore();
  const editableEditorKey = editorKey as EditableEditorKey;
  const { editors, setEditorValue } = useContext(EditorsContext);

  const handleOnChange = useCallback(
    (value: string) => {
      setEditorValue(editableEditorKey, value);
    },
    [editableEditorKey, setEditorValue]
  );
  const isResponse = editorKey === 'response';
  const value = isResponse ? responseOutput : editors[editableEditorKey];
  const onChange = isResponse ? undefined : handleOnChange;

  const codeMirror = useMemo(
    () => (
      <CodeMirror
        {...codeMirrorProps}
        basicSetup={{ ...basicSetupOptions, ...(codeMirrorProps?.basicSetup as object) }}
        height="100%"
        value={value}
        onChange={onChange}
      />
    ),
    [codeMirrorProps, onChange, value]
  );
  return <div className={classes.editorContainer}>{codeMirror}</div>;
});

export default Editor;
