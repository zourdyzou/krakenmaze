import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { CoinCorrelationCard } from "@/components/screens/organisms/coin-correlation-card";
import { InstitutionHoldersCard } from "@/components/screens/organisms/institution-holders-card";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100%",
    "& > .MuiGrid-item": {
      height: "100%",
    },
  },
}));

export const TrendsPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper} spacing={3} direction="row" justify="center" alignItems="stretch">
      <Grid item xs={12} xl={9}>
        <CoinCorrelationCard />
      </Grid>

      <Hidden lgDown>
        <Grid item xl={3}>
          <InstitutionHoldersCard />
        </Grid>
      </Hidden>
    </Grid>
  );
};
