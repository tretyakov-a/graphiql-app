import { GraphqlResponse, GraphqlSchema } from '@src/shared/api/graphql';

export type EditorKey = 'query' | 'variables' | 'headers' | 'response';

export enum Loading {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}

export type LoadingState = {
  loading: Loading;
  error: string | null;
};

export type GraphqlLoadingState<T> = LoadingState & {
  response: GraphqlResponse<T> | null;
};

export type QueryType = GraphqlLoadingState<unknown> & {
  executed: {
    query: string;
    variables: string;
  };
};

export interface GraphqlState {
  responseOutput: string;
  endpoint: string;
  query: QueryType;
  schema: GraphqlLoadingState<GraphqlSchema> & {
    fetched: boolean;
    fetchedEndpoint: string;
  };
}
