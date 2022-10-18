import React, { useEffect } from "react";
import { Avatar, Box, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FaceRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { HelpIconHeader } from "@/components/screens/atoms/HelpIconHeader";
import { MappedSentimentIcon } from "@/components/screens/atoms/mapped-sentiment-icon";
import { ShowBitcoinCorrelationSwitch } from "@/components/screens/atoms/show-bitcoin-correlation-switch";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { FearGreedIndexGaugeChart } from "@/components/screens/molecules/fear-greed-index-gaugeChart";
import { HistoricFearGreedIndexChart } from "@/components/screens/molecules/history-fear-greed-chart";
import { fetchFearGreedIndex, selectFearGreedIndex } from "@/features/fear-greed-index-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
  contentWrapper: {
    height: "calc(100% - 84px) !important",
  },
}));

export const FearGreedIndexCard: React.FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  useEffect(() => {
    if (fearGreedIndex.value.length === 0 && fearGreedIndex.status === "IDLE") {
      dispatch(fetchFearGreedIndex());
    }
  }, [dispatch, fearGreedIndex.value, fearGreedIndex.status]);

  return (
    <CardLayout>
      <CardHeader
        title={
          <HelpIconHeader
            title="Fear & Greed Index"
            tooltipContent={
              <div>
                <Typography variant="subtitle1" color="secondary">
                  Data Sources Breakdown:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Price Volatility (25%)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Market Momentum / Volume (25%)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Social Media (15%)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Surveys (15%)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Bitcoin Dominance (10%)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  - Google Trends (10%)
                </Typography>
              </div>
            }
          />
        }
        subheader={
          fearGreedIndex.today === null ? (
            <Skeleton animation="wave" height={32} width={150} />
          ) : (
            `Now: ${fearGreedIndex.today.valueClassification}`
          )
        }
        subheaderTypographyProps={{ variant: "h6", color: "textPrimary" }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            {fearGreedIndex.value.length === 0 ? <FaceRounded /> : <MappedSentimentIcon />}
          </Avatar>
        }
        action={<ShowBitcoinCorrelationSwitch />}
      />
      <CardContent className={classes.contentWrapper}>
        <FearGreedIndexGaugeChart />
        <Box height="calc(100% - 96px)" width="100%">
          <HistoricFearGreedIndexChart />
        </Box>
      </CardContent>
    </CardLayout>
  );
};
