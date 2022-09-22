import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { AppBar as MuiAppBar, Box, CircularProgress, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { GitHub } from "@material-ui/icons";

import Logo from "@/assets/images/logo.svg";
import { appBarHeight, drawerWidth } from "@/common/constants";
import { IconComponent } from "@/components/icons";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    "& .MuiToolbar-root": {
      minHeight: appBarHeight,
      justifyContent: "space-between",
    },
  },
  logoWrapper: {
    width: `calc(${drawerWidth}px - 48px)`, // 240 - (24 * 2)
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      marginRight: 8,
    },
  },
  sideUtils: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTypography-root": {
      marginRight: theme.spacing(2),
    },
  },
  githubButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
  },
}));

export const ApplicationBar: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const store = useStore();

  const [allStates, setAllStates] = useState<any>(store.getState());
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  store.subscribe(() => {
    setAllStates(store.getState());
  });

  // loading state: to make sure that all data is fetched and page loaded successfully
  useEffect(() => {
    setGlobalLoading(!!Object.values(allStates).find((item: any) => item.status === "LOADING"));
  }, [allStates]);

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <Box className={classes.logoWrapper}>
          <IconComponent iconSource={Logo} height={28} width={28} alt="Krakenmaze Logo" />
          <Typography variant="h5" noWrap>
            Krakenmaze
          </Typography>
        </Box>

        <Box className={classes.sideUtils}>
          {globalLoading && (
            <>
              <Typography variant="caption" color="textSecondary">
                Fetching Data...
              </Typography>
              <CircularProgress size={theme.spacing(3)} />
            </>
          )}
          <IconButton
            className={classes.githubButton}
            href="https://github.com/zourdyzou/"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <GitHub />
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
