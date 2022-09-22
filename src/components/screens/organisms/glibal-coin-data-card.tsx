import React from "react";
import { CardHeader } from "@material-ui/core";

import { CardLayout } from "@/components/screens/molecules/card-layout";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";

interface Props {
  type: "marketcap" | "volume";
}

export const GlobalCoinDataCard: React.FunctionComponent<Props> = ({ type }) => {
  const globalCoinData = useAppSelector(selectGlobalCoinData);
  console.log(globalCoinData);
  return (
    <CardLayout>
      <CardHeader title={type === "marketcap" ? "Market Cap" : "Volume"} titleTypographyProps={{ variant: "h6" }} />
    </CardLayout>
  );
};
