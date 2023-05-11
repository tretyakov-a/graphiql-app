import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import appUiReducer from './app-ui';

export const store = configureStore({
  reducer: {
    appUI: appUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}

export { useAppUI } from './app-ui';
export type { AppUIState, FlexState, VisibilityState } from './app-ui';
