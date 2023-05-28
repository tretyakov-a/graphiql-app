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
    fetchedEndpoint: '',
  },
};

const storedQueryState = localStorage.getItem(STORAGE_KEY);

type GraphqlLocalStorage = {
  query: QueryType;
  endpoint: string;
};

if (storedQueryState !== null) {
  const { query, endpoint } = JSON.parse(storedQueryState) as GraphqlLocalStorage;
  initialState.query = { ...query, loading: Loading.IDLE };
  initialState.endpoint = endpoint;
}

export const saveQueryToLocalStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const res = next(action);
    const { query, endpoint } = getState().graphql;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        query,
        endpoint,
      })
    );
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
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
      state.query.loading = Loading.IDLE;
      state.schema.loading = Loading.IDLE;
    },
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
