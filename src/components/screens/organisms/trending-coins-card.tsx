import React, { Fragment, useEffect } from "react";
import { Avatar, CardHeader, Divider, List } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { WhatshotRounded } from "@material-ui/icons";

import { ListItemSkeleton } from "@/components/screens/atoms/list-item-skeleton";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { TrendingCoinItem } from "@/components/screens/molecules/trending-coin-item";
import { fetchTrendingCoins, selectTrendingCoins } from "@/features/trending-coins-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { TrendingCoin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.card.paper,
  },
  trendingCoinList: {
    overflow: "scroll",
    paddingBottom: 8,
  },
}));

export const TrendingCoinsCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const trendingCoins = useAppSelector(selectTrendingCoins);

  useEffect(() => {
    if (trendingCoins.value.length === 0 && trendingCoins.status === "IDLE") {
      dispatch(fetchTrendingCoins());
    }
  }, [dispatch, trendingCoins.value.length, trendingCoins.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Trending"
        titleTypographyProps={{ variant: "body1", color: "textPrimary" }}
        subheader="Top-7 searched on CoinGecko"
        subheaderTypographyProps={{ variant: "caption", color: "textSecondary" }}
        avatar={
          <Avatar variant="circle" className={classes.avatarColor}>
            <WhatshotRounded />
          </Avatar>
        }
      />
      <Divider />
      <List dense disablePadding className={classes.trendingCoinList}>
        {trendingCoins.value.length === 0 || trendingCoins.status === "LOADING" ? (
          <ListItemSkeleton count={7} />
        ) : (
          <>
            {trendingCoins.value.map((trendingCoin: TrendingCoin, index: number) => {
              return (
                <Fragment key={trendingCoin.id}>
                  <TrendingCoinItem trendingCoin={trendingCoin} />
                  {index < trendingCoins.value.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </>
        )}
      </List>
    </CardLayout>
  );
};
