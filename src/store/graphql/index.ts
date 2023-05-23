import { type PayloadAction, createSlice, Middleware } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { type GraphqlState, type EditorKey, Loading } from './types';
import {
  FetchGraphqlQueryPayload,
  fetchGraphqlQuery,
  fetchGraphqlQueryExtraReducers,
} from './async-actions/fetch-graphql-query';
import {
  fetchGraphqlSchema,
  fetchGraphqlSchemaExtraReducers,
} from './async-actions/fetch-graphql-schema';
import { toast } from 'react-toastify';

const initialState: GraphqlState = {
  endpoint: 'https://rickandmortyapi.com/graphql',
  responseOutput: '',
  query: {
    loading: Loading.IDLE,
    error: null,
    response: null,
    executed: {
      query: '',
      variables: '',
    },
  },
  schema: {
    loading: Loading.IDLE,
    error: null,
    response: null,
    fetched: false,
  },
};

export const showErrorMiddleware: Middleware = () => (next) => (action) => {
  if (action.type.includes('rejected')) {
    toast(action.error.message, { type: 'error' });
  }
  return next(action);
};

export const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    setExecuted: (state, action: PayloadAction<FetchGraphqlQueryPayload>) => {
      const { query, variables } = action.payload;
      state.query.executed = { query, variables };
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

export const { setExecuted } = graphqlSlice.actions;
export type { GraphqlState, EditorKey };

export default graphqlSlice.reducer;
