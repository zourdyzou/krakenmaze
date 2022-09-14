import { API_CONFIG as config } from "@common/constants";
import { endpoints as API } from "@common/endpoints";
import { toCamelCase } from "@common/helpers/case-transformer";
import { RootState } from "@features/app/store";
import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinMarketChartList, GenericState } from "@src/models";
import axios from "axios";

const initialState: GenericState<CoinMarketChartList> = {
  value: {},
  status: "IDLE",
  param: "key",
};

export const fetchCoinMarketChartList = createAsyncThunk("coinMarketChartList", async (coinIdList: string[]) => {
  const canceler = axios.CancelToken.source();

  const normalizeResponseData = {} as any;

  for (let i = 0; i < coinIdList.length; i++) {
    const response = await axios.request({
      ...config,
      url: API.coinMarketChart(coinIdList[i]),
      cancelToken: canceler.token,
    });

    normalizeResponseData[coinIdList[i]] = toCamelCase(response.data);
  }

  return normalizeResponseData as CoinMarketChartList;
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