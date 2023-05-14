import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { type GraphqlState, type EditorKey, Loading } from './types';
import {
  fetchGraphqlQuery,
  fetchGraphqlQueryExtraReducers,
} from './async-actions/fetch-graphql-query';
import {
  fetchGraphqlSchema,
  fetchGraphqlSchemaExtraReducers,
} from './async-actions/fetch-graphql-schema';

const initialState: GraphqlState = {
  endpoint: 'https://rickandmortyapi.com/graphql',
  editors: {
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
    response: '',
  },
  query: {
    loading: Loading.IDLE,
    error: null,
    data: null,
    executed: {
      query: '',
      variables: '',
    },
  },
  schema: {
    loading: Loading.IDLE,
    error: null,
    data: null,
    fetched: false,
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
  extraReducers: (builder) => {
    fetchGraphqlQueryExtraReducers(builder);
    fetchGraphqlSchemaExtraReducers(builder);
  },
});

export const useGraphqlStore = () => {
  const { actions } = graphqlSlice;
  return {
    ...useAppSelector((state) => state.graphql),
    actions: { ...actions, fetchGraphqlQuery, fetchGraphqlSchema },
  };
};

export type { GraphqlState, EditorKey };

export default graphqlSlice.reducer;