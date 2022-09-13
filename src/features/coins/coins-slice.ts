import { API_CONFIG as config } from "@common/constants";
import { endpoints as API } from "@common/endpoints";
import { toCamelCase } from "@common/helpers/case-transformer";
import { RootState } from "@features/app/store";
import { Slice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coin, GenericState } from "@src/models";
import axios from "axios";

const initialState: GenericState<Coin[]> = {
  value: [],
  status: "IDLE",
};

export const fetchCoins = createAsyncThunk("coins", async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config,
    url: API.coins,
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data);

  return normalizedResponse as Coin[];
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
