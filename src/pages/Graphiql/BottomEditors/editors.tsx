import Editor from '../Editor';

export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    translationKey: 'variables',
    component: <Editor value={'{}'} />,
  },
  {
    translationKey: 'headers',
    component: <Editor />,
  },
];
