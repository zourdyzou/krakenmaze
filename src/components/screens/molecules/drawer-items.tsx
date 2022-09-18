import React from "react";
import { List, ListSubheader } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { NavigationListItem, NavItem } from "@/components/screens/atoms/navigation-list-item";

const useStyles = makeStyles((theme: Theme) => ({
  navItemsWrapper: {
    padding: "0 22px",
    "& .MuiListItem-root.Mui-selected": {
      color: theme.palette.secondary.main,
      backgroundColor: "rgba(33, 150, 243, 0.082)",
      "& .MuiListItemIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
  },
  filterItemsWrapper: {
    padding: "0 22px",
  },
}));

interface Props {
  navItems: NavItem[];
}

export const DrawerItems: React.FunctionComponent<Props> = ({ navItems }) => {
  const classes = useStyles();

  return (
    <div className={classes.navItemsWrapper}>
      <List subheader={<ListSubheader component="div">Analytics</ListSubheader>}>
        {navItems.slice(0, 3).map((item: NavItem) => {
          return <NavigationListItem navItem={item} key={item.path} />;
        })}
      </List>
      <List subheader={<ListSubheader component="div">Filters</ListSubheader>}>
        {navItems.slice(3).map((item: NavItem) => {
          return <NavigationListItem navItem={item} key={item.path} />;
        })}
      </List>
    </div>
  );
};
