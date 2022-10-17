import React from "react";
import GaugeChart from "react-gauge-chart";
import { Box } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import { selectFearGreedIndex } from "@/features/fear-greed-index-slice";
import { useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& #fear-greed-index-gauge": {
      height: "100%",
      width: "200px !important",
      "& svg": {
        height: "100%",
        width: "100%",
      },
    },
  },
}));

export const FearGreedIndexGaugeChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  return (
    <Box className={classes.container}>
      <GaugeChart
        id="fear-greed-index-gauge"
        nrOfLevels={20}
        colors={[theme.palette.error.main, theme.palette.success.main]}
        percent={fearGreedIndex.today === null ? 0 : Number(fearGreedIndex.today.value) / 100}
      />
    </Box>
  );
};
