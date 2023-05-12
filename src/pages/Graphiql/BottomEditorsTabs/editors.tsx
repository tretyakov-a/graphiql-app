import Editor from '../Editor';

export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    headerTitle: 'variables',
    component: <Editor editorKey="variables" />,
  },
  {
    headerTitle: 'headers',
    component: <Editor editorKey="headers" />,
  },
];
