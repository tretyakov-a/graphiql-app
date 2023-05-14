import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { type GraphqlResponse, fetchQuery } from '@src/shared/api/graphql';
import type { AsyncThunkConfig } from '@src/store';
import { type GraphqlState, Loading } from '../types';

export const fetchGraphqlQuery = createAsyncThunk<GraphqlResponse, void, AsyncThunkConfig>(
  'graphql/fetchGraphqlQuery',
  async (_, { getState }) => {
    const {
      endpoint,
      editors: { query, variables },
    } = getState().graphql;
    const response = await fetchQuery(endpoint, { query, variables });
    return response;
  },
  {
    condition: (_: void, { getState }) => {
      const {
        editors: { query, variables },
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
    const { query, variables } = state.editors;
    state.query.executed = { query, variables };
  });
  builder.addCase(fetchGraphqlQuery.fulfilled, (state, action) => {
    state.query.loading = Loading.SUCCESS;
    state.query.data = action.payload;
    state.query.error = null;
    state.editors.response = JSON.stringify(action.payload, null, 2);
  });
  builder.addCase(fetchGraphqlQuery.rejected, (state, action) => {
    state.query.loading = Loading.ERROR;
    state.query.error = action.error.message || '';
  });
};
