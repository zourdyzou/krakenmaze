import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import appStateReducer from "@/features/app-state-slice";
import coinsReducer from "@/features/coins-slice";
import dominanceChartListReducer from "@/features/dominance-chart-list-slice";
import fearGreedIndexReducer from "@/features/fear-greed-index-slice";
import gasOracleReducer from "@/features/gas-oracle-slice";
import globalCoinDataReducer from "@/features/global-coin-data-slice";
import coinsMarketChartListReducer from "@/features/market-chart-slice";
import trendingCoinsReducer from "@/features/trending-coins-slice";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    coins: coinsReducer,
    coinsMarketChartList: coinsMarketChartListReducer,
    dominanceChartList: dominanceChartListReducer,
    gasOracle: gasOracleReducer,
    trendingCoins: trendingCoinsReducer,
    globalCoinData: globalCoinDataReducer,
    fearGreedIndex: fearGreedIndexReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
