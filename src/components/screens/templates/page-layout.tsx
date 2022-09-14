import { appBarHeight, drawerWidth } from "@common/constants";
import { NavItem } from "@components/screens/atoms/navigation-list-item";
import { ApplicationBar } from "@components/screens/organisms/application-bar";
import { SidebarDrawer } from "@components/screens/organisms/sidebar-drawer";
import { Theme, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  rootWrapper: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - ${appBarHeight}px)`,
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: theme.palette.background.paper,
    marginTop: appBarHeight,
    marginRight: 20,
    borderRadius: 12,
  },
}));

interface Props {
  navItems: NavItem[];
}

export const PageLayout: React.FunctionComponent<Props> = ({ navItems }) => {
  const classes = useStyles();

  return <div className={classes.rootWrapper}>adwhdoh</div>;
};
