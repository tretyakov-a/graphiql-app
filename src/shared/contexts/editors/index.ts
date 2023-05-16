import { EditorKey } from '@src/store/graphql';
import { createContext, useCallback, useMemo, useState } from 'react';

export type EditableEditorKey = Exclude<EditorKey, 'response'>;
type Editors = Record<EditableEditorKey, string>;

type SetEditorValueFn = (editorKey: EditableEditorKey, value: string) => void;

export interface EditorsContextProps {
  editors: Editors;
  setEditorValue: SetEditorValueFn;
}

const editorsInitial: Editors = {
  query: `query char($id: ID!) {
  character(id: $id) {
    id
    name
    status
    species
    gender
    origin {
      name
    }
  }
}`,
  variables: `{
  "id": 1
}`,
  headers: '',
};

export const EditorsContext = createContext<EditorsContextProps>({
  editors: { ...editorsInitial },
  setEditorValue: () => {},
});

export const useEditors = (): { editors: Editors; setEditorValue: SetEditorValueFn } => {
  const [query, setQuery] = useState(editorsInitial.query);
  const [variables, setVariables] = useState(editorsInitial.variables);
  const [headers, setHeaders] = useState(editorsInitial.headers);

  const setters: Record<EditableEditorKey, typeof setQuery> = useMemo(
    () => ({
      query: setQuery,
      variables: setVariables,
      headers: setHeaders,
    }),
    []
  );

  const setEditorValue = useCallback(
    (editorKey: EditableEditorKey, value: string) => {
      setters[editorKey](value);
    },
    [setters]
  );

  return { editors: { query, variables, headers }, setEditorValue };
};

export { default as EditorsContextProvider } from './EditorsContextProvider';
