import HeadersEditor from './HeadersEditor';
import VariablesEditor from './VariablesEditor';

export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    headerTitle: 'variables',
    component: <VariablesEditor />,
  },
  {
    headerTitle: 'headers',
    component: <HeadersEditor />,
  },
];
