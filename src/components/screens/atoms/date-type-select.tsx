import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { selectCoinMarketChartList, setSelectedDataType } from "@/features/market-chart-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { CoinMarketChart } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  dataTypeSelect: {
    width: 120,
    margin: "12px 18px 0 0",
    borderRadius: 12,
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      "& .MuiOutlinedInput-input": {
        padding: "12px 26px",
      },
      "& .MuiSelect-select:focus": {
        borderRadius: 12,
      },
    },
  },
  menuPaper: {
    borderRadius: 12,
  },
}));

export const DateTypeSelect: React.FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  return (
    <FormControl variant="outlined" className={classes.dataTypeSelect}>
      <Select
        value={coinMarketChartList.selectedDataType}
        onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
          dispatch(setSelectedDataType(event.target.value as keyof CoinMarketChart))
        }
        MenuProps={{
          classes: { paper: classes.menuPaper },
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem value="prices">Price</MenuItem>
        <MenuItem value="marketCaps">Market Cap</MenuItem>
        <MenuItem value="totalVolumes">Total Volume</MenuItem>
      </Select>
    </FormControl>
  );
};
