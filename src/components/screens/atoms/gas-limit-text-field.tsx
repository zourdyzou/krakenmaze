import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { selectGasOracle, setGasLimit } from "@/features/gas-oracle-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  gasLimitField: {
    width: 100,
    margin: "12px 12px 0 0",
    "& .MuiOutlinedInput-input": {
      padding: "10px 12px",
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(10px, 12px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
  },
}));

export const GasLimitTextField: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const gasOracle = useAppSelector(selectGasOracle);

  return (
    <TextField
      className={classes.gasLimitField}
      label="Gas Limit"
      variant="outlined"
      defaultValue={gasOracle.gasLimit}
      onChange={(e) => dispatch(setGasLimit(Number(e.target.value)))}
      type="number"
    />
  );
};
