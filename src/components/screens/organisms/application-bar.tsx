import Logo from "@assets/images/logo.svg";
import { appBarHeight, drawerWidth } from "@common/constants";
import { IconComponent } from "@components/icons";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    "& .MuiToolbar-root": {
      minHeight: appBarHeight,
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
}));

export const ApplicationBar: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <div className={classes.logoWrapper}>
          <IconComponent iconSource={Logo} height={28} width={28} alt="Krakenmaze Logo" />
          <Typography variant="h5" noWrap>
            Krakenmaze
          </Typography>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
};
