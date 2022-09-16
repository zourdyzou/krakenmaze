import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { DominanceCard } from "@/components/screens/organisms/dominance-card";
import { TopCoinsCard } from "@/components/screens/organisms/top-coins-card";

const useStyles = makeStyles((theme: Theme) => ({
  rootWrapper: {
    height: "100%",
    "& > .MuiGrid-item": {
      maxHeight: "100%",
    },
  },
}));

export const CoinsPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.rootWrapper} spacing={3} direction="row" justify="center" alignItems="stretch" container>
      <Grid item xs={6} md={5} lg={4} xl={3}>
        <TopCoinsCard />
      </Grid>

      <Grid item xs={6} md={3} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DominanceCard />
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>

          <Grid item xs={12}>
            &nbsp;
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xl={5}>
        &nbsp;
      </Grid>
    </Grid>
  );
};
