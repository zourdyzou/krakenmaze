import React, { useEffect } from "react";
import { Avatar, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { LocalGasStationRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { roundDecimals } from "@/common/helpers/round-decimals";
import { GasLimitTextField } from "@/components/screens/atoms/gas-limit-text-field";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { GasIndicatorGroup } from "@/components/screens/molecules/gas-indicator-group";
import { selectCoins } from "@/features/coinsSlice";
import { fetchGasOracle, selectGasOracle } from "@/features/gas-oracle-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
}));

export const GasOracleCard: React.FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const gasOracle = useAppSelector(selectGasOracle);

  const ethereum: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === "ethereum";
  });

  const calculateTransactionFee = (ethereum: Coin) => {
    return 0.000000001 * ethereum.currentPrice * gasOracle.gasLimit * Number(gasOracle.selectedGasFee);
  };

  useEffect(() => {
    if (!gasOracle.value.lastBlock && gasOracle.status === "IDLE") {
      dispatch(fetchGasOracle());
    }
  }, [dispatch, gasOracle.value, gasOracle.status]);

  return (
    <CardLayout>
      <CardHeader
        title="ETH Gas Station"
        titleTypographyProps={{ variant: "caption", color: "textSecondary" }}
        subheader={
          ethereum && gasOracle.selectedGasFee ? (
            `Fee: US$${roundDecimals(calculateTransactionFee(ethereum))}`
          ) : (
            <Skeleton animation="wave" height={24} width={150} />
          )
        }
        subheaderTypographyProps={{ variant: "body1", color: "textPrimary" }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <LocalGasStationRounded />
          </Avatar>
        }
        action={<GasLimitTextField />}
      />
      <CardContent>
        <GasIndicatorGroup />
      </CardContent>
    </CardLayout>
  );
};
