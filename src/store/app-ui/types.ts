export type FlexState = {
  docs: number;
  editors: number;
  queryEditor: number;
};

export interface AppUIState {
  isDocsVisible: boolean;
  flexValues: FlexState;
}
