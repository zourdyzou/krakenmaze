import React from "react";
import { Drawer as MuiDrawer, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { appBarHeight, drawerWidth } from "@/common/constants";
import { NavItem } from "@/components/screens/atoms/navigation-list-item";
import { DrawerItems } from "@/components/screens/molecules/drawer-items";

const useStyles = makeStyles((_theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiToolbar-root": {
      minHeight: appBarHeight,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
    background: "transparent",
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

interface Props {
  navItems?: NavItem[];
  anchor?: "bottom" | "left" | "right" | "top";
}

export const SidebarDrawer: React.FunctionComponent<Props> = ({ navItems, anchor }) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={anchor}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <DrawerItems navItems={navItems} />
      </div>
    </MuiDrawer>
  );
};
