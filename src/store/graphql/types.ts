export type EditorKey = 'query' | 'variables' | 'headers' | 'response';

export interface GraphqlState {
  editors: Record<EditorKey, string>;
  endpoint: string;
}
