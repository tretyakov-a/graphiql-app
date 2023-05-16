import Editor from '../Editor';
import { json } from '@codemirror/lang-json';

export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    headerTitle: 'variables',
    component: (
      <Editor
        editorKey="variables"
        codeMirrorProps={{
          extensions: [json()],
        }}
      />
    ),
  },
  {
    headerTitle: 'headers',
    component: (
      <Editor
        editorKey="headers"
        codeMirrorProps={{
          extensions: [json()],
        }}
      />
    ),
  },
];
