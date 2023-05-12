import { GraphqlResponse } from '@src/shared/api/graphql';

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

export type GraphqlLoadingState = LoadingState & {
  data: GraphqlResponse | null;
};

export interface GraphqlState {
  editors: Record<EditorKey, string>;
  endpoint: string;
  query: GraphqlLoadingState & { executed: { query: string; variables: string } };
  schema: GraphqlLoadingState & { fetched: boolean };
}
