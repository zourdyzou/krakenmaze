import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { convertTimestamp } from "@/common/helpers/date-handler";
import { ChartSkeleton } from "@/components/screens/atoms/chart-skeleton-loader";
import { selectFearGreedIndex } from "@/features/fear-greed-index-slice";
import { useAppSelector } from "@/hooks/*";
import { FearGreedIndex } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  responsiveContainer: {
    "& .recharts-surface": {
      cursor: "pointer",
    },
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
    "& .MuiTypography-root:not(:first-child)": {
      color: theme.palette.secondary.main,
    },
  },
}));

interface DataFormat {
  date: number;
  value: number;
  classification: string;
}

export const HistoricFearGreedIndexChart: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    fearGreedIndex.value.forEach((indexData: FearGreedIndex) => {
      chartData.push({
        date: Number(indexData.timestamp),
        value: Number(indexData.value),
        classification: indexData.valueClassification,
      });
    });
    return chartData;
  };

  return (
    <>
      {fearGreedIndex.value.length === 0 ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <AreaChart data={formatRawData()} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Box className={classes.customTooltip}>
                      <Typography variant="body1">{convertTimestamp(label * 1000, true)}</Typography>
                      <Typography variant="body2">
                        {payload[0].payload.classification} ({payload[0].value}%)
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
              dataKey="value"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill={`url(#chart-gradient)`}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
