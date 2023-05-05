import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';

export interface AppUIState {
  isDocsVisible: boolean;
}

const initialState: AppUIState = {
  isDocsVisible: false,
};

export const appUISlice = createSlice({
  name: 'appUI',
  initialState,
  reducers: {
    // setSearch: (state, action: PayloadAction<string>) => {
    //   state.value = action.payload;
    // },
    toggleDocsVisibility: (state) => {
      state.isDocsVisible = !state.isDocsVisible;
    },
  },
});

export const { toggleDocsVisibility } = appUISlice.actions;

export const useAppUI = () => {
  const { actions } = appUISlice;
  return {
    ...useAppSelector((state) => state.appUI),
    actions,
  };
};

export default appUISlice.reducer;
