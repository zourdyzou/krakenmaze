import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  navListItem: {
    borderRadius: 12,
    marginBottom: 5,
  },
}));

export interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
  page: JSX.Element;
  index: number;
}

interface Props {
  navItem: NavItem;
}

export const NavigationListItem: React.FunctionComponent<Props> = ({ navItem }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push(navItem.path);
  };

  return (
    <ListItem>
      <ListItemIcon>{navItem.icon}</ListItemIcon>
      <ListItemText primary={navItem.label} />
    </ListItem>
  );
};
