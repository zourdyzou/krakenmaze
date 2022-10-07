import React from "react";
import { Divider, Paper } from "@material-ui/core";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { selectCoinMarketChartList, setSelectedDataType, setSelectedDayRange } from "@/features/market-chart-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { AvailableDayRanges, CoinMarketChart } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    margin: "16px 16px 0 0",
    flexWrap: "wrap",
    border: `1px solid ${theme.palette.divider}`,
    "& #data-type .MuiToggleButton-root.Mui-selected": {
      backgroundColor: `${theme.palette.primary.main}25`,
      color: theme.palette.primary.main,
    },
    "& #date-range .MuiToggleButton-root.Mui-selected": {
      backgroundColor: `${theme.palette.secondary.main}25`,
      color: theme.palette.secondary.main,
    },
  },
  toggleButtonGroup: {
    height: 36,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export const HeatmapOptionToggleGroup: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup
        className={classes.toggleButtonGroup}
        id="data-type"
        value={coinMarketChartList.selectedDataType}
        exclusive
        onChange={(event: React.MouseEvent<HTMLElement>, newDataType: keyof CoinMarketChart | null): void => {
          if (newDataType !== null) {
            dispatch(setSelectedDataType(newDataType));
          }
        }}
      >
        <ToggleButton value="prices">Price</ToggleButton>
        <ToggleButton value="marketCaps">Market Cap</ToggleButton>
        <ToggleButton value="totalVolumes">Volume</ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup
        className={classes.toggleButtonGroup}
        id="date-range"
        value={coinMarketChartList.selectedDayRange}
        exclusive
        onChange={(event: React.MouseEvent<HTMLElement>, newDayRange: AvailableDayRanges | null): void => {
          if (newDayRange !== null) {
            dispatch(setSelectedDayRange(newDayRange));
          }
        }}
      >
        <ToggleButton value={1}>1D</ToggleButton>
        <ToggleButton value={7}>7D</ToggleButton>
        <ToggleButton value={30}>1M</ToggleButton>
        <ToggleButton value={90}>3M</ToggleButton>
        <ToggleButton value={365}>1Y</ToggleButton>
        <ToggleButton value={730}>2Y</ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};
