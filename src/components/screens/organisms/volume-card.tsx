import React from "react";
import { Avatar, CardHeader } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { BarChartRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { shortenNumber } from "@/common/helpers/shorten-number";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { VolumeBarChart } from "@/components/screens/molecules/volume-bar-chart";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: "calc(100% - 84px)",
    width: "100%",
    marginTop: -35,
  },
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
}));

export const VolumeCard: React.FunctionComponent = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);

  return (
    <CardLayout>
      <CardHeader
        title="Total Volume"
        titleTypographyProps={{ variant: "body2", color: "textSecondary" }}
        subheader={
          globalCoinData.value !== null ? (
            `US$${shortenNumber(globalCoinData.value.totalVolume.usd)}`
          ) : (
            <Skeleton animation="wave" height={32} width={150} />
          )
        }
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <BarChartRounded />
          </Avatar>
        }
        subheaderTypographyProps={{ variant: "h6", color: "textPrimary" }}
      />
      <div className={classes.chartWrapper}>
        <VolumeBarChart />
      </div>
    </CardLayout>
  );
};
