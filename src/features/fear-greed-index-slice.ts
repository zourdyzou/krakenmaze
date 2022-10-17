import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { alternativeMe as API } from "@/common/endpoints";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { FearGreedIndex, FearGreedIndexRootObject, FearGreedIndexState } from "@/src/models";

const initialState: FearGreedIndexState = {
  value: [],
  today: null,
  status: "IDLE",
};

export const fetchFearGreedIndex = createAsyncThunk("fearGreedIndex", async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config("alternative.me"),
    url: API.fearGreedIndex(30),
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data) as FearGreedIndexRootObject;

  return normalizedResponse.data as FearGreedIndex[];
});

const fearGreedIndexSlice: Slice<FearGreedIndexState, {}, "fearGreedIndex"> = createSlice({
  name: "fearGreedIndex",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFearGreedIndex.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchFearGreedIndex.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchFearGreedIndex.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectFearGreedIndex: (state: RootState) => FearGreedIndexState = (state: RootState) =>
  state.fearGreedIndex;

export default fearGreedIndexSlice.reducer;
