import Editor from '../Editor';

export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    headerTitle: 'variables',
    component: <Editor value={'{}'} />,
  },
  {
    headerTitle: 'headers',
    component: <Editor />,
  },
];
