import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { coinGecko as API } from "@/common/endpoints";
import { cacheWithExpiry, retrieveCache } from "@/common/helpers/cache-storage-handler";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { GenericState, TrendingCoin, TrendingCoinItem, TrendingRootObject } from "@/src/models";

const initialState: GenericState<TrendingCoin[]> = {
  value: [],
  status: "IDLE",
};

export const fetchTrendingCoins = createAsyncThunk("trendingCoins", async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: TrendingRootObject | null = retrieveCache("trendingCoins");

  if (cachedData) {
    return cachedData.coins.map((trendingCoinItem: TrendingCoinItem) => trendingCoinItem.item) as TrendingCoin[];
  } else {
    const response = await axios.request({
      ...config("coinGecko"),
      url: API.trending,
      cancelToken: canceler.token,
    });

    const normalizedResponse = toCamelCase(response.data) as TrendingRootObject;
    cacheWithExpiry("trendingCoins", normalizedResponse, 1200000); // Cache Period: 20 minutes

    return normalizedResponse.coins.map(
      (trendingCoinItem: TrendingCoinItem) => trendingCoinItem.item
    ) as TrendingCoin[];
  }
});

const trendingCoinsSlice: Slice<GenericState<TrendingCoin[]>, {}, "trendingCoins"> = createSlice({
  name: "trendingCoins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectTrendingCoins: (state: RootState) => GenericState<TrendingCoin[]> = (state: RootState) =>
  state.trendingCoins;

export default trendingCoinsSlice.reducer;
