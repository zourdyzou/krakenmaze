import {
  AvailableDayRanges as AvailableDayRangesInterface,
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface,
  CoinMarketChartListState as CoinMarketChartListStateInterface,
  DominanceChartList as DominanceChartListInterface,
} from "@/src/models/api/coin-market-chart";
import { GenericState as GenericStateInterface } from "@/src/models/common/generic-state";
import { AppState as AppStateInterface } from "@/src/models/globals/app-state";

import { Coin as CoinInterface } from "./api/coin";
import {
  FearGreedIndex as FearGreedIndexInterface,
  FearGreedIndexMetadata as FearGreedIndexMetadataInterface,
  FearGreedIndexRootObject as FearGreedIndexRootObjectInterface,
} from "./api/fear-greed-index";
import {
  GasOracle as GasOracleInterface,
  GasOracleRootObject as GasOracleRootObjectInterface,
  GasOracleState as GasOracleStateInterface,
} from "./api/gas-oracle";
import {
  GlobalCoinData as GlobalCoinDataInterface,
  GlobalCoinDataRootObject as GlobalCoinDataRootObjectInterface,
  MarketCapPercentage as MarketCapPercentageInterface,
  TotalMarketCap as TotalMarketCapInterface,
  TotalVolume as TotalVolumeInterface,
} from "./api/global-coin-data";
import { Page as PageInterface, RootModule as RootModuleInterface } from "./common/root-module";

export type AppState = AppStateInterface;
export type AvailableDayRanges = AvailableDayRangesInterface;
export type DominanceChartList = DominanceChartListInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type Coin = CoinInterface;
export type GasOracle = GasOracleInterface;
export type GasOracleState = GasOracleStateInterface;
export type GasOracleRootObject = GasOracleRootObjectInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;
export type TotalMarketCap = TotalMarketCapInterface;
export type TotalVolume = TotalVolumeInterface;
export type MarketCapPercentage = MarketCapPercentageInterface;
export type CoinMarketChartListState = CoinMarketChartListStateInterface;
export type FearGreedIndex = FearGreedIndexInterface;
export type FearGreedIndexMetadata = FearGreedIndexMetadataInterface;
export type FearGreedIndexRootObject = FearGreedIndexRootObjectInterface;
export type Page = PageInterface;
export type RootModule = RootModuleInterface;
export type GlobalCoinData = GlobalCoinDataInterface;
export type GlobalCoinDataRootObject = GlobalCoinDataRootObjectInterface;

export * from "./api/trending-coin";
