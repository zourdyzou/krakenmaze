import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  overlay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    transform: "translateY(-100%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 1,
    transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
}));

interface Props {
  loadingIcon: React.ReactNode;
}

export const Overlay: React.FunctionComponent<Props> = ({ loadingIcon, children }) => {
  const classes = useStyles();

  return (
    <>
      {children}
      <Box className={classes.overlay}>
        {loadingIcon}
        <div className={classes.backdrop} />
      </Box>
    </>
  );
};
