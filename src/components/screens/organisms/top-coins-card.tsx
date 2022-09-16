import React, { Fragment, useEffect } from "react";
import { CardHeader, Divider, List } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { getTodayDate } from "@/common/helpers/date-handler";
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
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinMarketChartLists = useAppSelector(selectCoinMarketChartList);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === "IDLE") {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.value.length, coins.status]);

  useEffect(() => {
    if (Object.keys(coinMarketChartLists.value).length === 0 && coinMarketChartLists.status === "IDLE") {
      dispatch(fetchCoinMarketChartList(coins.value.map((coin: Coin) => coin.id)));
    }
  }, [dispatch, coins.value, coinMarketChartLists.value, coinMarketChartLists.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Top Coins"
        subheader={getTodayDate()}
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{ variant: "caption" }}
      />
      <Divider />
      <List dense disablePadding className={classes.coinList}>
        {coins.status === "LOADING" ? (
          <span>Loading...</span>
        ) : (
          <Fragment>
            {coins.value.map((coin: Coin, index: number) => {
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
