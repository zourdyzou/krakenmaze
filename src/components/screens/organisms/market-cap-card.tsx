import React, { useState } from "react";
import { CardHeader, Tooltip } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { DashboardRounded, DonutLargeRounded } from "@material-ui/icons";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { shortenNumber } from "@/common/helpers/shorten-number";
import { GlobalCoinDataDonutChart as MarketCapDonutChart } from "@/components/screens/atoms/market-cap-donut-chart";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { MarketCapTreemap } from "@/components/screens/molecules/market-cap-treemap";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: "calc(100% - 84px + 20px)",
    width: "100%",
    marginTop: -20,
  },
  chartToggleButtons: {
    margin: "12px 12px 0 0",
  },
}));

export const MarketCapCard: React.FunctionComponent = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);
  const [chartType, setChartType] = useState<"donut" | "treemap">("donut");

  return (
    <CardLayout>
      <CardHeader
        title="Market Cap"
        titleTypographyProps={{ variant: "body2", color: "textSecondary" }}
        subheader={
          globalCoinData.value !== null ? (
            `US$${shortenNumber(globalCoinData.value.totalMarketCap.usd)}`
          ) : (
            <Skeleton animation="wave" height={32} width={50} />
          )
        }
        action={
          <ToggleButtonGroup
            size="small"
            className={classes.chartToggleButtons}
            value={chartType}
            exclusive
            onChange={(event: React.MouseEvent<HTMLElement>, newChart: "donut" | "treemap"): void =>
              setChartType(newChart)
            }
          >
            <ToggleButton value="donut">
              <Tooltip title="Donut Chart" placement="top">
                <DonutLargeRounded />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="treemap">
              <Tooltip title="Treemap" placement="top">
                <DashboardRounded />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        }
        subheaderTypographyProps={{ variant: "h6", color: "textPrimary" }}
      />
      <div className={classes.chartWrapper}>
        {chartType === "donut" ? <MarketCapDonutChart /> : <MarketCapTreemap />}
      </div>
    </CardLayout>
  );
};