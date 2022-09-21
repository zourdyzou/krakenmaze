import { createSlice, Slice, SliceCaseReducers } from "@reduxjs/toolkit";

import { RootState } from "@/components/app/store";
import { AppState } from "@/src/models";

const initialState: AppState = { darkMode: true };

interface Reducers extends SliceCaseReducers<AppState> {
  toggle: (state: AppState) => void;
}

const appStateSlice: Slice<AppState, Reducers, "theme"> = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state: AppState) => {
      const currentValue = state.darkMode;
      state.darkMode = !currentValue;
    },
  },
});

export const { toggle } = appStateSlice.actions;

export const selectAppState: (state: RootState) => AppState = (state: RootState) => state.appState;

export default appStateSlice.reducer;
