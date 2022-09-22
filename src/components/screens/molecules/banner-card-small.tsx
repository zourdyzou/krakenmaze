import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ArrowDownwardRounded, ArrowUpwardRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { roundDecimals } from "@/common/helpers/round-decimals";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";

const useStyles = makeStyles<Theme, { change: number }>((theme: Theme) => ({
  cardWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  content: {
    marginLeft: 8,
    "& .MuiTypography-h6": {
      color: (change: number) => (change >= 0 ? theme.palette.success.main : theme.palette.error.main),
    },
  },
  icon: {
    display: "flex",
    marginRight: 8,
    color: theme.palette.primary.main,
    backgroundColor: "#111936",
    borderRadius: 8,
    "& .MuiSvgIcon-root": {
      height: theme.spacing(5),
      width: theme.spacing(5),
      color: (change: number) => (change >= 0 ? theme.palette.success.main : theme.palette.error.main),
    },
  },
}));

export const BannerCardSmall: React.FunctionComponent = () => {
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const change: number = globalCoinData.value?.marketCapChangePercentage24HUsd || 0;
  const classes = useStyles({ change: change });

  return (
    <CardLayout>
      {globalCoinData.value === null ? (
        <>
          <Skeleton animation="wave" height={12} width="80%" />
          <Skeleton animation="wave" height={12} width="40%" />
        </>
      ) : (
        <Box className={classes.cardWrapper}>
          <Box className={classes.content}>
            <Typography variant="h6">{roundDecimals(change, 3)}%</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              24H Market Cap Change
            </Typography>
          </Box>
          <Box className={classes.icon}>{change > 0 ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}</Box>
        </Box>
      )}
    </CardLayout>
  );
};
