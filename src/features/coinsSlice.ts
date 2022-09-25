import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { coinGecko as API } from "@/common/endpoints";
import { cacheWithExpiry, retrieveCache } from "@/common/helpers/cache-storage-handler";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { Coin, GenericState } from "@/src/models";

const initialState: GenericState<Coin[]> = {
  value: [],
  status: "IDLE",
};

export const fetchCoins = createAsyncThunk("coins", async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: Coin[] | null = retrieveCache("coins");

  if (cachedData) {
    return cachedData as Coin[];
  } else {
    const response = await axios.request({
      ...config("coinGecko"),
      url: API.coins,
      cancelToken: canceler.token,
    });

    const normalizedResponse = toCamelCase(response.data);
    cacheWithExpiry("coins", normalizedResponse, 60000); // Cache Period: 1 minute

    return normalizedResponse as Coin[];
  }
});

const coinsSlice: Slice<GenericState<Coin[]>, {}, "coins"> = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectCoins: (state: RootState) => GenericState<Coin[]> = (state: RootState) => state.coins;

export default coinsSlice.reducer;
