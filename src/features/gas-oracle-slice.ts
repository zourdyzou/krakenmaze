import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { etherscan as API } from "@/common/endpoints";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { GenericState } from "@/src/models";
import { GasOracle } from "@/src/models/api/gas-oracle";

const initialState: GenericState<GasOracle> = {
  value: {
    lastBlock: "",
    safeGasPrice: "",
    proposeGasPrice: "",
    fastGasPrice: "",
  },
  status: "IDLE",
};

export const fetchGasOracle = createAsyncThunk("gasOracle", async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config("etherscan"),
    url: API.gasOracle,
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data.result);

  return normalizedResponse as GasOracle;
});

const gasOracleSlice: Slice<GenericState<GasOracle>, {}, "gasOracle"> = createSlice({
  name: "gasOracle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasOracle.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchGasOracle.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchGasOracle.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectGasOracle: (state: RootState) => GenericState<GasOracle> = (state: RootState) => state.gasOracle;

export default gasOracleSlice.reducer;
