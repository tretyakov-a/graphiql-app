import { type PayloadAction, createSlice, Middleware } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { type GraphqlState, type EditorKey, Loading, QueryType } from './types';
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

const STORAGE_KEY = 'graphiql/query';

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

const storedQueryState = localStorage.getItem(STORAGE_KEY);

if (storedQueryState !== null) {
  initialState.query = JSON.parse(storedQueryState) as QueryType;
}

export const saveQueryToLocalStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const res = next(action);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState().graphql.query));
    return res;
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
