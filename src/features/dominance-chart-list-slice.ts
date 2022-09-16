import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { endpoints as API } from "@/common/endpoints";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { CoinMarketChartList, GenericState } from "@/src/models";

const initialState: GenericState<CoinMarketChartList> = {
  value: {},
  status: "IDLE",
  param: "key",
};

export const fetchDominanceChartList = createAsyncThunk("dominanceChartList", async (coinIdList: string[]) => {
  const canceler = axios.CancelToken.source();

  const normalizedResponse = {} as any;

  for (let i = 0; i < coinIdList.length; i++) {
    const response = await axios.request({
      ...config,
      url: API.coinMarketChart(coinIdList[i], 30),
      cancelToken: canceler.token,
    });

    normalizedResponse[coinIdList[i]] = toCamelCase(response.data);
  }

  return normalizedResponse as CoinMarketChartList;
});

const dominanceChartListSlice: Slice<GenericState<CoinMarketChartList>, {}, "dominanceChartList"> = createSlice({
  name: "dominanceChartList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDominanceChartList.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchDominanceChartList.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchDominanceChartList.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectDominanceChartList: (state: RootState) => GenericState<CoinMarketChartList> = (state: RootState) =>
  state.dominanceChartList;

export default dominanceChartListSlice.reducer;
