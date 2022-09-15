import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AccountBalanceRounded, DataUsageRounded, TrendingUpRounded } from "@material-ui/icons";

import { NavItem } from "@/components/screens/atoms/navigation-list-item";
import { PageLayout } from "@/components/screens/templates/page-layout";
import { CoinsPage } from "@/src/pages/coins";
import { ExchangesPage } from "@/src/pages/exchanges";
import { TrendsPage } from "@/src/pages/trends";

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
  ];

  return (
    <BrowserRouter>
      <PageLayout navItems={pages} />
    </BrowserRouter>
  );
};
