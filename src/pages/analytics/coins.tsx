import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import { DominanceCard } from "@/components/screens/organisms/dominance-card";
import { GasOracleCard } from "@/components/screens/organisms/gas-indicator-card";
import { InstitutionHoldersCard } from "@/components/screens/organisms/institution-holders-card";
import { TopCoinsCard } from "@/components/screens/organisms/top-coins-card";
import { TrendingCoinsCard } from "@/components/screens/organisms/trending-coins-card";

const useStyles = makeStyles((theme: Theme) => ({
  rootWrapper: {
    height: "100%",
    "& > .MuiGrid-item": {
      maxHeight: "100%",
    },
  },
  innerWrapper: {
    height: "100%",
  },
}));

export const CoinsPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid className={classes.rootWrapper} spacing={3} direction="row" justify="center" alignItems="stretch" container>
      <Grid item xs={6} md={6} lg={4} xl={3}>
        <TopCoinsCard />
      </Grid>

      <Grid item xs={6} md={6} lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 275, marginBottom: theme.spacing(3) }}>
            <DominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 205, marginBottom: theme.spacing(3) }}>
            <GasOracleCard />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(100% - ${275 + 205 + theme.spacing(3) * 2}px)` }}>
            <TrendingCoinsCard />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xl={5}>
        <InstitutionHoldersCard />
      </Grid>
    </Grid>
  );
};
