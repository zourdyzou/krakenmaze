import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config, http } from "@/common/constants";
import { coinGecko as API } from "@/common/endpoints";
import { cacheWithExpiry, retrieveCache } from "@/common/helpers/cache-storage-handler";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { GenericState, GlobalCoinData, GlobalCoinDataRootObject } from "@/src/models";

const initialState: GenericState<GlobalCoinData | null> = {
  value: null,
  status: "IDLE",
};

export const fetchGlobalCoinData = createAsyncThunk("globalCoinData", async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: GlobalCoinDataRootObject | null = retrieveCache("globalCoinData");

  if (cachedData) {
    return cachedData.data as GlobalCoinData;
  } else {
    const response = await http.request({
      ...config("coinGecko"),
      url: API.global,
      cancelToken: canceler.token,
    });

    const normalizedResponse = toCamelCase(response.data) as GlobalCoinDataRootObject;
    cacheWithExpiry("globalCoinData", normalizedResponse, 1200000); // Cache Period: 20 minutes

    return normalizedResponse.data as GlobalCoinData;
  }
});

const globalCoinDataSlice: Slice<GenericState<GlobalCoinData | null>, {}, "globalCoinData"> = createSlice({
  name: "globalCoinData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalCoinData.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchGlobalCoinData.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchGlobalCoinData.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectGlobalCoinData: (state: RootState) => GenericState<GlobalCoinData | null> = (state: RootState) =>
  state.globalCoinData;

export default globalCoinDataSlice.reducer;
