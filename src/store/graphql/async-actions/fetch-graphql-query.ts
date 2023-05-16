import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { type GraphqlResponse, fetchQuery } from '@src/shared/api/graphql';
import type { AsyncThunkConfig } from '@src/store';
import { type GraphqlState, Loading } from '../types';
import { setExecuted } from '..';

export type FetchGraphqlQueryPayload = { query: string; variables: string };

export const fetchGraphqlQuery = createAsyncThunk<
  GraphqlResponse<unknown>,
  FetchGraphqlQueryPayload,
  AsyncThunkConfig
>(
  'graphql/fetchGraphqlQuery',
  async ({ query, variables }, { getState, dispatch }) => {
    const { endpoint } = getState().graphql;
    dispatch(setExecuted({ query, variables }));
    const response = await fetchQuery(endpoint, { query, variables });
    return response;
  },
  {
    condition: ({ query, variables }, { getState }) => {
      const {
        query: {
          executed: { query: prevQuery, variables: prevVariables },
          loading,
          error,
        },
      } = getState().graphql;
      if (
        (prevQuery === query &&
          prevVariables === variables &&
          error === null &&
          loading === Loading.SUCCESS) ||
        loading === Loading.PENDING
      ) {
        return false;
      }
    },
  }
);

export const fetchGraphqlQueryExtraReducers = (builder: ActionReducerMapBuilder<GraphqlState>) => {
  builder.addCase(fetchGraphqlQuery.pending, (state) => {
    state.query.loading = Loading.PENDING;
  });
  builder.addCase(fetchGraphqlQuery.fulfilled, (state, action) => {
    state.query.loading = Loading.SUCCESS;
    state.query.response = action.payload;
    state.query.error = null;
    state.responseOutput = JSON.stringify(action.payload, null, 2);
  });
  builder.addCase(fetchGraphqlQuery.rejected, (state, action) => {
    state.query.loading = Loading.ERROR;
    state.query.error = action.error.message || '';
  });
};
