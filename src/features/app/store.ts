import themeReducer from "@features/theme-slice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import coinsReducer from "../coins/coins-slice";
import coinsMarketChartListReducer from "../coins/marketChartList-slice";
import counterReducer from "../counter/counter-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    coins: coinsReducer,
    coinsMarketChartList: coinsMarketChartListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
