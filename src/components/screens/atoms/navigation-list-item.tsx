import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Page } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  navListItem: {
    borderRadius: 12,
    marginBottom: 5,
  },
}));

interface Props {
  page: Page;
}

export const NavigationListItem: React.FunctionComponent<Props> = ({ page }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push(page.path);
  };

  return (
    <ListItem
      button
      className={classes.navListItem}
      key={page.index}
      onClick={handleClick}
      selected={page.path === location.pathname}
    >
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText primary={page.label} />
    </ListItem>
  );
};
