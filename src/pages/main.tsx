import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AccountBalanceRounded, DataUsageRounded, People, TrendingUpRounded } from "@material-ui/icons";

import { NavItem } from "@/components/screens/atoms/navigation-list-item";
import { PageLayout } from "@/components/screens/templates/page-layout";
import { CoinsPage } from "@/src/pages/analytics/coins";
import { ExchangesPage } from "@/src/pages/analytics/exchanges";
import { TrendsPage } from "@/src/pages/analytics/trends";
import { EventsPage } from "@/src/pages/information/events";

export const MainContainerPage: React.FunctionComponent = () => {
  const pages: NavItem[] = [
    {
      label: "Coins",
      path: "/",
      icon: <DataUsageRounded />,
      page: <CoinsPage />,
      index: 0,
    },
    {
      label: "Trends",
      path: "/trends",
      icon: <TrendingUpRounded />,
      page: <TrendsPage />,
      index: 1,
    },
    {
      label: "Exchanges",
      path: "/exchanges",
      icon: <AccountBalanceRounded />,
      page: <ExchangesPage />,
      index: 2,
    },
    {
      label: "Events",
      path: "/events",
      icon: <People />,
      page: <EventsPage />,
      index: 2,
    },
  ];

  return (
    <BrowserRouter>
      <PageLayout navItems={pages} />
    </BrowserRouter>
  );
};
