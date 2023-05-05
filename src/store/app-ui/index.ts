import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';

export interface AppUIState {
  isDocsVisible: boolean;
  docsExplorerFlex: number;
  editorsLeftPanelFlex: number;
  queryEditorPanelFlex: number;
}

const initialState: AppUIState = {
  isDocsVisible: false,
  docsExplorerFlex: 0.3,
  editorsLeftPanelFlex: 1,
  queryEditorPanelFlex: 1,
};

export const appUISlice = createSlice({
  name: 'appUI',
  initialState,
  reducers: {
    toggleDocsVisibility: (state) => {
      state.isDocsVisible = !state.isDocsVisible;
    },
    setDocsExplorerFlex: (state, action: PayloadAction<number>) => {
      state.docsExplorerFlex = action.payload;
    },
    setEditorsLeftPanelFlex: (state, action: PayloadAction<number>) => {
      state.editorsLeftPanelFlex = action.payload;
    },
    setQueryEditorPanelFlex: (state, action: PayloadAction<number>) => {
      state.queryEditorPanelFlex = action.payload;
    },
  },
});

export const useAppUI = () => {
  const { actions } = appUISlice;
  return {
    ...useAppSelector((state) => state.appUI),
    actions,
  };
};

export default appUISlice.reducer;
