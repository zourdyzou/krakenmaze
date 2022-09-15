import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import coinsReducer from "@/features/coinsSlice";
import coinsMarketChartListReducer from "@/features/marketChartSlice";
import themeReducer from "@/features/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    coins: coinsReducer,
    coinsMarketChartList: coinsMarketChartListReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
