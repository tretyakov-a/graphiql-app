import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { type GraphqlResponse, fetchSchema, GraphqlSchema } from '@src/shared/api/graphql';
import type { AsyncThunkConfig } from '@src/store';
import { type GraphqlState, Loading } from '../types';

export const fetchGraphqlSchema = createAsyncThunk<
  GraphqlResponse<GraphqlSchema>,
  { refetch?: boolean },
  AsyncThunkConfig
>(
  'graphql/fetchGraphqlSchema',
  async (_, { getState }) => {
    const { endpoint } = getState().graphql;
    const response = await fetchSchema(endpoint);
    return response;
  },
  {
    condition: ({ refetch } = { refetch: false }, { getState }) => {
      const {
        endpoint,
        schema: { loading, fetched, fetchedEndpoint },
      } = getState().graphql;
      if (refetch || loading === Loading.IDLE) return true;
      if (fetched || loading === Loading.PENDING || endpoint === fetchedEndpoint) {
        return false;
      }
    },
  }
);

export const fetchGraphqlSchemaExtraReducers = (builder: ActionReducerMapBuilder<GraphqlState>) => {
  builder.addCase(fetchGraphqlSchema.pending, (state) => {
    state.schema.loading = Loading.PENDING;
    state.schema.error = null;
    state.schema.fetched = false;
  });
  builder.addCase(fetchGraphqlSchema.fulfilled, (state, action) => {
    state.schema.loading = Loading.SUCCESS;
    state.schema.response = action.payload;
    state.schema.error = null;
    state.schema.fetched = true;
    state.schema.fetchedEndpoint = state.endpoint;
  });
  builder.addCase(fetchGraphqlSchema.rejected, (state, action) => {
    state.schema.loading = Loading.ERROR;
    state.schema.error = action.error.message || '';
  });
};
