import { type PayloadAction, createSlice, Middleware } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import type { AppUIState, FlexState, VisibilityState } from './types';

export const STORAGE_KEY = 'graphiql/ui';

const defaultState: AppUIState = {
  visiblity: {
    docs: false,
    bottomEditors: true,
  },
  flexValues: {
    docs: 0.3,
    editors: 1,
    bottomEditors: 1,
  },
  language: 'us',
};

const storedState = localStorage.getItem(STORAGE_KEY);

const initialState = storedState !== null ? (JSON.parse(storedState) as AppUIState) : defaultState;

export const saveUIToLocalStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    const res = next(action);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getState().appUI));
    return res;
  };

export const appUISlice = createSlice({
  name: 'appUI',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
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
