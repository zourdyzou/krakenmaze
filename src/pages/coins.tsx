import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { TopCoinsCard } from "@/components/screens/organisms/top-coins-card";

const useStyles = makeStyles((theme: Theme) => ({
  rootWrapper: {
    padding: 24,
    height: "100%",
  },
  childWrapper: {
    height: "100%",
    "& > .MuiGrid-item": {
      height: "100%",
    },
  },
}));

export const CoinsPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.rootWrapper}>
      <Grid className={classes.childWrapper} container>
        <Grid item xs={4} xl={3}>
          <TopCoinsCard />
        </Grid>
        <Grid item xs={4}>
          &nbsp;
        </Grid>
        <Grid item xs={4} xl={5}>
          &nbsp;
        </Grid>
      </Grid>
    </div>
  );
};
