import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { CoinCorrelationCard } from "@/components/screens/organisms/coin-correlation-card";

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
      <Grid item xs={12}>
        <CoinCorrelationCard />
      </Grid>
    </Grid>
  );
};
