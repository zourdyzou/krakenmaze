import { getTodayDate } from "@common/helpers/date-handler";
import { CoinItem } from "@components/screens/molecules/coin-item";
import { useAppDispatch, useAppSelector } from "@features/app/hooks";
import { fetchCoins, selectCoins } from "@features/coins/coins-slice";
import { fetchCoinMarketChartList, selectCoinMarketChartList } from "@features/coins/marketChartList-slice";
import { Card, CardHeader, Divider, List } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { Coin } from "@src/models";
import React, { Fragment, useEffect } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.palette.card.main,
    height: "100%",
    borderRadius: 12,
    "& ::-webkit-scrollbar": {
      display: "none",
    },
  },
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
    <Card className={classes.card}>
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
    </Card>
  );
};
