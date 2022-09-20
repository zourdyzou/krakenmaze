import { createSlice, Slice } from "@reduxjs/toolkit";

import { RootState } from "@/components/app/store";

interface Theme {
  darkMode: boolean;
}

const initialState: Theme = { darkMode: true };

const appStateSlice: Slice<Theme, { toggle: (state: Theme) => void }, "theme"> = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state: Theme) => {
      const currentValue = state.darkMode;
      state.darkMode = !currentValue;
    },
  },
});

export const { toggle } = appStateSlice.actions;

export const selectAppState: (state: RootState) => Theme = (state: RootState) => state.appState;

export default appStateSlice.reducer;
