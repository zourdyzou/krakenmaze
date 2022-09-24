import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import chroma from "chroma-js";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { shortenNumber } from "@/common/helpers/shorten-number";
import { useWindowSize } from "@/common/hooks/use-window-size";
import { selectCoins } from "@/features/coinsSlice";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(3),
    "& .recharts-surface": {
      cursor: "pointer",
      "& .recharts-tooltip-cursor": {
        fill: theme.palette.card.paper,
      },
    },
  },
  chartSkeleton: {
    margin: "0 16px",
    transform: "scale(1, 0.8)",
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
  },
}));

interface DataFormat {
  coinName: string;
  coinSymbol: string;
  value: number;
}

export const VolumeBarChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const windowSize = useWindowSize();
  const coinsToDisplay = windowSize.width / 250;

  const formatRawData = () => {
    const newData: DataFormat[] = [];

    const coinsValueDesc = [...coins.value];
    coinsValueDesc.sort((a: Coin, b: Coin) => b.totalVolume - a.totalVolume);

    const topCoins = coinsValueDesc.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.totalVolume,
      });
    });

    return newData;
  };

  return (
    <>
      {coins.value.length === 0 || coins.status === "LOADING" || globalCoinData.value === null ? (
        <Skeleton animation="wave" height="100%" className={classes.chartSkeleton} />
      ) : (
        <Box className={classes.container}>
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={formatRawData()} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="coinSymbol" />
              <YAxis tickFormatter={(tick) => shortenNumber(tick) as string} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Box className={classes.customTooltip}>
                        <Typography variant="body2">{payload[0].payload.coinName}</Typography>
                        <Typography variant="body2">
                          {`${label}: US$${shortenNumber(payload[0].payload.value)}`}
                        </Typography>
                      </Box>
                    );
                  } else {
                    return null;
                  }
                }}
              />
              <Bar dataKey="value" fill={theme.palette.secondary.main} animationDuration={2000}>
                {formatRawData().map((data: DataFormat, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      chroma
                        .scale([theme.palette.primary.main, theme.palette.secondary.main])
                        .gamma(0.4)
                        .colors(coinsToDisplay)[index]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
};
