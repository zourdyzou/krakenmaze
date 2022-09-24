import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { appBarHeight, drawerWidth } from "@/common/constants";
import { ApplicationBar } from "@/components/screens/organisms/application-bar";
import { SidebarDrawer } from "@/components/screens/organisms/sidebar-drawer";
import { Page, RootModule } from "@/src/models";

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
  rootModule: RootModule[];
}

export const PageLayout: React.FunctionComponent<Props> = ({ rootModule }) => {
  const classes = useStyles();

  const pages = rootModule
    .map((moduleObject: RootModule) => moduleObject.pages)
    .reduce((acc, page: Page[]) => acc.concat(page), []);

  return (
    <div className={classes.rootWrapper}>
      <ApplicationBar />
      <SidebarDrawer rootModule={rootModule} />
      <main className={classes.content}>
        <Switch>
          {pages
            .slice()
            .sort((a, b) => b.index - a.index)
            .map((page: Page) => {
              return <Route key={page.path} path={page.path} render={() => page.page} />;
            })}
        </Switch>
      </main>
    </div>
  );
};
