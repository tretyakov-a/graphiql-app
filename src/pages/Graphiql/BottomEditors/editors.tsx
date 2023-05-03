export enum EDITORS {
  VARIABLES,
  HEADERS,
}

export const editors = [
  {
    translationKey: 'variables',
    component: <div className="variablesEditor">variables editor</div>,
  },
  {
    translationKey: 'headers',
    component: <div className="headersEditor">header editor</div>,
  },
];
