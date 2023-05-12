import { type ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { type GraphqlResponse, fetchSchema } from '@src/shared/api/graphql';
import type { AsyncThunkConfig } from '@src/store';
import { type GraphqlState, Loading } from '../types';

export const fetchGraphqlSchema = createAsyncThunk<
  GraphqlResponse,
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
        schema: { loading, fetched },
      } = getState().graphql;
      if (refetch) return true;
      if (fetched || loading === Loading.PENDING) {
        return false;
      }
    },
  }
);

export const fetchGraphqlSchemaExtraReducers = (builder: ActionReducerMapBuilder<GraphqlState>) => {
  builder.addCase(fetchGraphqlSchema.pending, (state) => {
    state.schema.loading = Loading.PENDING;
  });
  builder.addCase(fetchGraphqlSchema.fulfilled, (state, action) => {
    state.schema.loading = Loading.SUCCESS;
    state.schema.data = action.payload;
    state.schema.error = null;
    state.schema.fetched = true;
  });
  builder.addCase(fetchGraphqlSchema.rejected, (state, action) => {
    state.schema.loading = Loading.ERROR;
    state.schema.error = action.error.message || '';
    //TODO: show toast/popup with error message
    console.log(action.error.message);
  });
};
