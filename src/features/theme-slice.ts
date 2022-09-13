import { RootState } from "@features/app/store";
import { Slice, createSlice } from "@reduxjs/toolkit";

interface Theme {
  darkMode: boolean;
}

const initialState: Theme = { darkMode: true };

export const selectTheme: (state: RootState) => Theme = (state: RootState) => state.theme;

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

export default themeSlice.reducer;
