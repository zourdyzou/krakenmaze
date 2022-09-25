import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { coinGecko as API } from "@/common/endpoints";
import { cacheWithExpiry, retrieveCache } from "@/common/helpers/cache-storage-handler";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";

import { CoinMarketChartList, GenericState } from "../models";

const initialState: GenericState<CoinMarketChartList> = {
  value: {},
  status: "IDLE",
  param: "key",
};

export const fetchCoinMarketChartList = createAsyncThunk("coinMarketChartList", async (coinIdList: string[]) => {
  const canceler = axios.CancelToken.source();

  const cachedData: CoinMarketChartList | null = retrieveCache("coinMarketChartList");

  if (cachedData) {
    return cachedData as CoinMarketChartList;
  } else {
    const normalizeResponseData = {} as any;

    for (let i = 0; i < coinIdList.length; i++) {
      const response = await axios.request({
        ...config("coinGecko"),
        url: API.coinMarketChart(coinIdList[i], 1),
        cancelToken: canceler.token,
      });

      normalizeResponseData[coinIdList[i]] = toCamelCase(response.data);
    }

    cacheWithExpiry("coinMarketChartList", normalizeResponseData, 3600000); // Cache Period: 1 hour

    return normalizeResponseData as CoinMarketChartList;
  }
});

const coinsMarketChartListSlice: Slice<GenericState<CoinMarketChartList>, {}, "coinMarketChartList"> = createSlice({
  name: "coinMarketChartList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinMarketChartList.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCoinMarketChartList.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchCoinMarketChartList.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectCoinMarketChartList: (state: RootState) => GenericState<CoinMarketChartList> = (state: RootState) =>
  state.coinsMarketChartList;

export default coinsMarketChartListSlice.reducer;
