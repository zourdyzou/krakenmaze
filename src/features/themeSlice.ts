import { createSlice, Slice } from "@reduxjs/toolkit";

import { RootState } from "@/components/app/store";

interface Theme {
  darkMode: boolean;
}

const initialState: Theme = { darkMode: true };

const themeSlice: Slice<Theme, { toggle: (state: Theme) => void }, "theme"> = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state: Theme) => {
      const currentValue = state.darkMode;
      state.darkMode = !currentValue;
    },
  },
});

export const { toggle } = themeSlice.actions;

export const selectTheme: (state: RootState) => Theme = (state: RootState) => state.theme;

export default themeSlice.reducer;
