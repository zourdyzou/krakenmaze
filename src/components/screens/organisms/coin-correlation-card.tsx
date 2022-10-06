import React, { useEffect } from "react";
import { CardHeader, Divider } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { getTodayDate } from "@/common/helpers/date-handler";
import { DayRangeSelect } from "@/components/screens/atoms/day-range-select";
import { GridIconLoadingState } from "@/components/screens/atoms/grid-icon-loading-state";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { CorrelationHeatmap } from "@/components/screens/molecules/correlation-heatmap-chart";
import { fetchCoins, selectCoins } from "@/features/coins-slice";
import { fetchCoinMarketChartList, selectCoinMarketChartList } from "@/features/market-chart-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: "calc(100% - 83px)",
    width: "100%",
  },
}));

export const CoinCorrelationCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  const top15: Coin[] = coins.value.slice(0, 15);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === "IDLE") {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.value.length, coins.status]);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartList.value[coinMarketChartList.selectedDayRange]).length === 0 &&
      coinMarketChartList.status === "IDLE"
    ) {
      dispatch(
        fetchCoinMarketChartList({
          coinIdList: top15.map((coin: Coin) => coin.id),
          dayRange: coinMarketChartList.selectedDayRange,
        })
      );
    }
  }, [dispatch, top15, coinMarketChartList.value, coinMarketChartList.status, coinMarketChartList.selectedDayRange]);

  return (
    <CardLayout>
      <CardHeader
        title="Coin Correlation Heatmap"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "caption" }}
        action={<DayRangeSelect />}
      />
      <Divider />
      <div className={classes.chartWrapper}>
        {top15.length === 0 ||
        coins.status === "LOADING" ||
        Object.keys(coinMarketChartList.value[coinMarketChartList.selectedDayRange]).length === 0 ? (
          <GridIconLoadingState />
        ) : (
          <CorrelationHeatmap />
        )}
      </div>
    </CardLayout>
  );
};
