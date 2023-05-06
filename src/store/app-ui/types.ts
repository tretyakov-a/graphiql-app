export type FlexState = {
  docs: number;
  editors: number;
  queryEditor: number;
};

export type VisibilityState = {
  docs: boolean;
  bottomEditors: boolean;
};

export interface AppUIState {
  flexValues: FlexState;
  visiblity: VisibilityState;
}
