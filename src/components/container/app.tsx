import React from "react";
import { createMuiTheme, CssBaseline, Theme, ThemeOptions, ThemeProvider } from "@material-ui/core";

import Gilroy from "@/assets/fonts/Gilroy-ExtraBold.woff";
import { selectTheme } from "@/features/themeSlice";
import { useAppSelector } from "@/hooks/*";
import { MainContainerPage } from "@/src/pages/main";

export const App: React.FunctionComponent = () => {
  const theme = useAppSelector(selectTheme);

  // fonts config
  const gilroy = {
    fontFamily: "Gilroy",
    fontStyle: "normal",
    fontDisplay: "swap" as const,
    fontWeight: 400,
    src: `
      local('Gilroy'),
      local('Gilroy-ExtraBold'),
      url(${Gilroy}) format('woff')
    `,
  };

  // global common styles
  const common: ThemeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: "'Gilroy', sans-serif !important",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [gilroy],
        },
      },
    },
  };

  const dark: Theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#913f9e",
      },
      secondary: {
        main: "#2196F3",
      },
      background: {
        default: "#121937",
        paper: "#1a223f",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#8492c4",
      },
      card: {
        main: "#212946", // #202940
      },
    },
    ...common,
  });

  const light: Theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#913f9e",
      },
      secondary: {
        main: "#240093",
      },
      background: {
        default: "rgb(17, 25, 54)",
        paper: "rgb(33, 41, 70)",
      },
      card: {
        main: "#212946",
      },
    },
    ...common,
  });

  return (
    <ThemeProvider theme={theme.darkMode ? dark : light}>
      <CssBaseline />
      <MainContainerPage />
    </ThemeProvider>
  );
};
