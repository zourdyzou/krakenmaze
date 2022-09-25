import React, { Fragment, useEffect } from "react";
import { CardHeader, Divider, List } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import { getTodayDate } from "@/common/helpers/date-handler";
import { ListItemSkeleton } from "@/components/screens/atoms/list-item-skeleton";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { CoinItem } from "@/components/screens/molecules/coin-item";
import { fetchCoins, selectCoins } from "@/features/coinsSlice";
import { fetchCoinMarketChartList, selectCoinMarketChartList } from "@/features/marketChartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  coinList: {
    overflow: "scroll",
    paddingBottom: 8,
  },
}));

export const TopCoinsCard: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartLists = useAppSelector(selectCoinMarketChartList);

  const top15: Coin[] = coins.value.slice(0, 15);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === "IDLE") {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.value.length, coins.status]);

  useEffect(() => {
    if (
      top15.length === 15 &&
      Object.keys(coinMarketChartLists.value).length === 0 &&
      coinMarketChartLists.status === "IDLE"
    ) {
      dispatch(fetchCoinMarketChartList(top15.map((coin: Coin) => coin.id)));
    }
  }, [dispatch, top15, coinMarketChartLists.value, coinMarketChartLists.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Top Coins"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "caption" }}
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
        {top15.length === 0 || coins.status === "LOADING" ? (
          <ListItemSkeleton count={15} height={69} iconDimensions={theme.spacing(4)} />
        ) : (
          <Fragment>
            {top15.map((coin: Coin, index: number) => {
              return (
                <Fragment key={coin.id}>
                  <CoinItem coin={coin} />
                  {index < coins.value.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </List>
    </CardLayout>
  );
};
