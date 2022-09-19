import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.palette.card.default,
    height: "100%",
    borderRadius: 12,
    "& ::-webkit-scrollbar": {
      display: "none",
    },
    "& .MuiCardHeader-avatar": {
      marginRight: 8,
    },
  },
}));

export const CardLayout: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      {children}
    </Card>
  );
};
