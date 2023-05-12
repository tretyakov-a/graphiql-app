import { type PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, useAppSelector } from '..';
import { type GraphqlState, type EditorKey, Loading } from './types';
import { type GraphqlResponse, fetchQuery, fetchSchema } from '@src/shared/api/graphql';

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
  },
};

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
    builder.addCase(fetchGraphqlQuery.pending, (state) => {
      state.query.loading = Loading.PENDING;
      const { query, variables } = state.editors;
      state.query.executed = { query, variables };
    });
    builder.addCase(fetchGraphqlQuery.fulfilled, (state, action) => {
      state.query.loading = Loading.SUCCESS;
      state.query.data = action.payload;
      state.editors.response = JSON.stringify(action.payload, null, 2);
    });
    builder.addCase(fetchGraphqlQuery.rejected, (state, action) => {
      state.query.loading = Loading.ERROR;
      state.query.error = action.error.message || '';
      console.log(action.error);
    });
  },
});

export const useGraphqlStore = () => {
  const { actions } = graphqlSlice;
  return {
    ...useAppSelector((state) => state.graphql),
    actions: { ...actions, fetchGraphqlQuery },
  };
};

export type { GraphqlState, EditorKey };

export default graphqlSlice.reducer;
