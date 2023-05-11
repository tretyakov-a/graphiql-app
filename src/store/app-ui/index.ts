import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import type { AppUIState, FlexState, VisibilityState } from './types';

const initialState: AppUIState = {
  visiblity: {
    docs: false,
    bottomEditors: true,
  },
  flexValues: {
    docs: 0.3,
    editors: 1,
    bottomEditors: 1,
  },
};

export const appUISlice = createSlice({
  name: 'appUI',
  initialState,
  reducers: {
    toggleVisibility: (state, action: PayloadAction<Partial<keyof VisibilityState>>) => {
      const prev = state.visiblity[action.payload];
      state.visiblity[action.payload] = !prev;
    },
    setVisiblity: (state, action: PayloadAction<Partial<VisibilityState>>) => {
      state.visiblity = { ...state.visiblity, ...action.payload };
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

export type { AppUIState, FlexState, VisibilityState };

export default appUISlice.reducer;
