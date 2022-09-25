import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AccountBalanceRounded,
  DataUsageRounded,
  People,
  SelectAllRounded,
  TollRounded,
  TrendingUpRounded,
} from "@material-ui/icons";

import { PageLayout } from "@/components/screens/templates/page-layout";
import { RootModule } from "@/src/models";
import { ExchangesPage } from "@/src/pages/analytics/exchanges";
import { OverviewPage } from "@/src/pages/analytics/overview";
import { TrendsPage } from "@/src/pages/analytics/trends";
import { CoinsPage } from "@/src/pages/explore/coins";
import { DeFiPage } from "@/src/pages/explore/deFi";
import { EventsPage } from "@/src/pages/explore/events";

export const MainContainerPage: React.FunctionComponent = () => {
  const rootModule: RootModule[] = [
    {
      moduleName: "Analytics",
      pages: [
        {
          label: "Overview",
          path: "/",
          icon: <DataUsageRounded />,
          page: <OverviewPage />,
          index: 0,
        },
        {
          label: "Trends",
          path: "/trends",
          icon: <TrendingUpRounded />,
          page: <TrendsPage />,
          index: 1,
        },
      ],
    },
    {
      moduleName: "Explore",
      pages: [
        {
          label: "Coins",
          path: "/coins",
          icon: <TollRounded />,
          page: <CoinsPage />,
          index: 2,
        },
        {
          label: "Exchanges",
          path: "/exchanges",
          icon: <AccountBalanceRounded />,
          page: <ExchangesPage />,
          index: 2,
        },
        {
          label: "DeFi",
          path: "/defi",
          icon: <SelectAllRounded />,
          page: <DeFiPage />,
          index: 2,
        },
        {
          label: "Events",
          path: "/events",
          icon: <People />,
          page: <EventsPage />,
          index: 2,
        },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <PageLayout rootModule={rootModule} />
    </BrowserRouter>
  );
};
