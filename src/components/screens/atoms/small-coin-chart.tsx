import React from "react";
import { useTheme } from "@material-ui/core";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

import { selectCoinMarketChartList } from "@/features/marketChartSlice";
import { useAppSelector } from "@/hooks/*";
import { Coin, CoinMarketChart } from "@/src/models";

interface ChartDataFormat {
  date: number;
  value: number;
}

interface Props {
  coin: Coin;
  dataKey: keyof CoinMarketChart;
}

export const SmallCoinChart: React.FunctionComponent<Props> = ({ coin, dataKey }) => {
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);
  const theme = useTheme();
  const gain = coin.priceChangePercentage24H >= 0;

  const formatRawData = (coinId: string, dataKey: keyof CoinMarketChart) => {
    const formattedData: ChartDataFormat[] = [];

    // for (const dataPair of coinMarketChartList.value[coinId][dataKey]) {
    //   formattedData.push({ date: dataPair[0], value: dataPair[1] });
    // }

    coinMarketChartList.value[coinId][dataKey].forEach((dataPair: [number, number]) => {
      formattedData.push({ date: dataPair[0], value: dataPair[1] });
    });

    return formattedData;
  };

  return (
    <>
      {coinMarketChartList.value[coin.id] && (
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={formatRawData(coin.id, dataKey)} margin={{ top: 0, right: 8, left: 16, bottom: 0 }}>
            <defs>
              <linearGradient id={gain ? "gain" : "loss"} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                  stopOpacity={0.5}
                />
                <stop
                  offset="60%"
                  stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <YAxis domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} hide />
            <Area
              type="monotone"
              dataKey="value"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={gain ? theme.palette.success.main : theme.palette.error.main}
              fillOpacity={1}
              fill={`url(#${gain ? "gain" : "loss"})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
