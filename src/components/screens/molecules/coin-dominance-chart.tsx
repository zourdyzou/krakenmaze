import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { convertTimestamp } from "@/common/helpers/date-handler";
import { shortenNumber } from "@/common/helpers/shorten-number";
import { ChartSkeleton } from "@/components/screens/atoms/chart-skeleton-loader";
import { selectDominanceChartList } from "@/features/dominance-chart-list-slice";
import { useAppSelector } from "@/hooks/*";
import { Coin, CoinMarketChart } from "@/src/models";

interface DataFormat {
  date: number;
  top1: number;
  top2: number;
}

interface Props {
  coinList: Coin[];
  dataKey: keyof CoinMarketChart;
}

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
    "& .MuiTypography-root:nth-child(2)": {
      color: theme.palette.primary.main,
    },
    "& .MuiTypography-root:nth-child(3)": {
      color: theme.palette.secondary.main,
    },
  },
}));

export const CoinDominanceChart: React.FunctionComponent<Props> = ({ coinList, dataKey }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dominanceChartList = useAppSelector(selectDominanceChartList);

  const top1 = coinList[0];
  const top2 = coinList[1];

  const formatRawData = (top1: string, top2: string, dataKey: keyof CoinMarketChart) => {
    const newData: DataFormat[] = [];
    dominanceChartList.value[top1][dataKey].forEach((dataPair: [number, number], index: number) => {
      const correspondingDataPair = dominanceChartList.value[top2][dataKey][index];
      if (correspondingDataPair) {
        newData.push({
          date: dataPair[0],
          top1: dataPair[1],
          top2: correspondingDataPair[1],
        });
      }
    });
    return newData;
  };

  return (
    <>
      {coinList.length !== 2 || !dominanceChartList.value[top1.id] || !dominanceChartList.value[top2.id] ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart
            data={formatRawData(top1.id, top2.id, dataKey)}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="top1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                <stop offset="70%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="top2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.3} />
                <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickFormatter={(tick) => convertTimestamp(tick)} />
            <YAxis tickFormatter={(tick) => shortenNumber(tick) as string} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Box className={classes.customTooltip}>
                      <Typography variant="body1">{convertTimestamp(label, true)}</Typography>
                      <Typography variant="body2">
                        {`${top1.name}: US$${shortenNumber(payload[0].payload.top1)}`}
                      </Typography>
                      <Typography variant="body2">
                        {`${top2.name}: US$${shortenNumber(payload[1].payload.top2)}`}
                      </Typography>
                    </Box>
                  );
                } else {
                  return null;
                }
              }}
            />
            <Area
              type="monotone"
              dataKey="top1"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#top1)"
              cursor="pointer"
            />
            <Area
              type="monotone"
              dataKey="top2"
              dot={false}
              strokeWidth={2}
              animationDuration={3000}
              stroke={theme.palette.secondary.main}
              fillOpacity={1}
              fill="url(#top2)"
              cursor="pointer"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
