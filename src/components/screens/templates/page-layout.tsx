import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { appBarHeight, drawerWidth } from "@/common/constants";
import { NavItem } from "@/components/screens/atoms/navigation-list-item";
import { ApplicationBar } from "@/components/screens/organisms/application-bar";
import { SidebarDrawer } from "@/components/screens/organisms/sidebar-drawer";

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
    padding: "24px 24px 0 24px",
    borderRadius: 12,
  },
}));

interface Props {
  navItems: NavItem[];
}

export const PageLayout: React.FunctionComponent<Props> = ({ navItems }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootWrapper}>
      <ApplicationBar />
      <SidebarDrawer navItems={navItems} />
      <main className={classes.content}>
        <Switch>
          {navItems
            .slice()
            .sort((a, b) => b.index - a.index)
            .map((item: NavItem) => {
              return <Route key={item.path} path={item.path} render={() => item.page} />;
            })}
        </Switch>
      </main>
    </div>
  );
};
