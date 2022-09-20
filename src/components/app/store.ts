import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import appStateReducer from "@/features/app-state-slice";
import coinsReducer from "@/features/coinsSlice";
import dominanceChartListReducer from "@/features/dominance-chart-list-slice";
import gasOracleSlice from "@/features/gas-oracle-slice";
import coinsMarketChartListReducer from "@/features/marketChartSlice";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    coins: coinsReducer,
    coinsMarketChartList: coinsMarketChartListReducer,
    dominanceChartList: dominanceChartListReducer,
    gasOracle: gasOracleSlice,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
