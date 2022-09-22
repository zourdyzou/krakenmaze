import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import { BannerCardSmall } from "@/components/screens/molecules/banner-card-small";
import { CoinDominanceCard } from "@/components/screens/organisms/coin-dominance-card";
import { GasOracleCard } from "@/components/screens/organisms/gas-indicator-card";
import { GlobalCoinDataCard } from "@/components/screens/organisms/global-coin-data-card";
import { TopCoinsCard } from "@/components/screens/organisms/top-coins-card";
import { TrendingCoinsCard } from "@/components/screens/organisms/trending-coins-card";
import { fetchGlobalCoinData, selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  rootWrapper: {
    height: "100%",
    "& > .MuiGrid-item": {
      maxHeight: "100%",
    },
  },
  innerWrapper: {
    height: "100%",
    "& > .MuiGrid-item:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
  },
}));

export const CoinsPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const globalCoinData = useAppSelector(selectGlobalCoinData);

  // fetch globalCoinData here as used in two cards (prevent fetching twice if dispatch in card)
  useEffect(() => {
    if (globalCoinData.value === null && globalCoinData.status === "IDLE") {
      dispatch(fetchGlobalCoinData());
    }
  }, [dispatch, globalCoinData.value, globalCoinData.status]);

  return (
    <Grid className={classes.rootWrapper} spacing={3} direction="row" justify="center" alignItems="stretch" container>
      <Grid item xs={6} md={6} lg={4}>
        <TopCoinsCard />
      </Grid>

      <Grid item xs={6} md={6} lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 275 }}>
            <CoinDominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 205 }}>
            <GasOracleCard />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(100% - ${275 + 205 + theme.spacing(3) * 2}px)` }}>
            <TrendingCoinsCard />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 85 }}>
            <BannerCardSmall />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}>
            <GlobalCoinDataCard type="marketcap" />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}>
            <GlobalCoinDataCard type="volume" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
