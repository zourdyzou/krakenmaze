import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
}));

export const CardLayout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <Card className={classes.card}>{children}</Card>;
};
