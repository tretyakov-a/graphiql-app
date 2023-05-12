import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import type { GraphqlState, EditorKey } from './types';

const initialState: GraphqlState = {
  endpoint: 'https://rickandmortyapi.com/graphql',
  editors: {
    query: 'query {}',
    variables: '',
    headers: '',
    response: '',
  },
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    setEditorValue: (state, action: PayloadAction<{ editorKey: EditorKey; value: string }>) => {
      const { editorKey, value } = action.payload;
      state.editors[editorKey] = value;
    },
  },
});

export const useGraphqlStore = () => {
  const { actions } = graphqlSlice;
  return {
    ...useAppSelector((state) => state.graphql),
    actions,
  };
};

export type { GraphqlState, EditorKey };

export default graphqlSlice.reducer;
