import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import type { DocsExplorerState, DocsElement } from './types';

const initialState: DocsExplorerState = {
  docsExplorer: [],
};

export const docsExplorerSlice = createSlice({
  name: 'docsExplorer',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<Partial<DocsElement>>) => {
      state.docsExplorer = [...state.docsExplorer, action.payload];
    },
    deliteLast: (state) => {
      const newState =
        state.docsExplorer.length > 0
          ? state.docsExplorer.slice(0, state.docsExplorer.length - 1)
          : state.docsExplorer;
      state.docsExplorer = newState;
    },
    clearDocs: (state) => {
      state.docsExplorer = [];
    },
  },
});

export const useDocsExplorer = () => {
  const { actions } = docsExplorerSlice;
  return {
    ...useAppSelector((state) => state.docsExplorer),
    actions,
  };
};

export default docsExplorerSlice.reducer;
