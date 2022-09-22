import React from "react";
import { CardHeader } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

import { shortenNumber } from "@/common/helpers/shorten-number";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: "100%",
    width: "100%",
    marginTop: -35,
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
            <Skeleton animation="wave" height={32} width={50} />
          )
        }
        subheaderTypographyProps={{ variant: "h6", color: "textPrimary" }}
      />
      <div className={classes.chartWrapper}>&nbsp;</div>
    </CardLayout>
  );
};
