import { NavItem, NavigationListItem } from "@components/screens/atoms/navigation-list-item";
import { List, ListSubheader } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import React from "react";

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
  navItems?: NavItem[];
}

export const DrawerItems: React.FunctionComponent<Props> = ({ navItems }) => {
  const classes = useStyles();

  return (
    <>
      {navItems ? (
        <div className={classes.navItemsWrapper}>
          <List subheader={<ListSubheader component="div">Analytics</ListSubheader>}>
            {navItems.map((item: NavItem) => {
              return <NavigationListItem navItem={item} key={item.path} />;
            })}
          </List>
        </div>
      ) : (
        <div className={classes.filterItemsWrapper}>
          <List subheader={<ListSubheader component="div">Filters</ListSubheader>}>&nbsp;</List>
        </div>
      )}
    </>
  );
};
