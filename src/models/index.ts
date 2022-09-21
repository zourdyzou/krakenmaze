import {
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface,
} from "@/src/models/api/coin-market-chart.model";
import { GenericState as GenericStateInterface } from "@/src/models/common/generic-state";
import { AppState as AppStateInterface } from "@/src/models/globals/app-state";

import { Coin as CoinInterface } from "./api/coin.model";

export type AppState = AppStateInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type Coin = CoinInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;

export * from "./api/trending-coin";
