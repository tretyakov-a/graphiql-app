import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import type { AppUIState, FlexState } from './types';

const initialState: AppUIState = {
  isDocsVisible: false,
  flexValues: {
    docs: 0.3,
    editors: 1,
    queryEditor: 1,
  },
};

export const appUISlice = createSlice({
  name: 'appUI',
  initialState,
  reducers: {
    toggleDocsVisibility: (state) => {
      state.isDocsVisible = !state.isDocsVisible;
    },
    setFlex: (state, action: PayloadAction<Partial<FlexState>>) => {
      state.flexValues = { ...state.flexValues, ...action.payload };
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

export type { AppUIState, FlexState };

export default appUISlice.reducer;
