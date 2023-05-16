import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import appUiReducer from './app-ui';
import graphqlReducer, { showErrorMiddleware } from './graphql';

const middlewares = [showErrorMiddleware];

export const store = configureStore({
  reducer: {
    appUI: appUiReducer,
    graphql: graphqlReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares as ReturnType<typeof getDefaultMiddleware>);
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
export { useGraphqlStore } from './graphql';
export type { AppUIState, FlexState, VisibilityState } from './app-ui';
