import React from "react";
import { CardHeader } from "@material-ui/core";

import { CardLayout } from "@/components/screens/molecules/card-layout";

export const MarketSentimentCard: React.FunctionComponent = () => {
  return (
    <CardLayout>
      <CardHeader
        title="Sentiment Analysis"
        titleTypographyProps={{ variant: "body1" }}
        subheader="Market Sentiment over last 30 days"
        subheaderTypographyProps={{ variant: "caption", color: "textSecondary" }}
      />
    </CardLayout>
  );
};
