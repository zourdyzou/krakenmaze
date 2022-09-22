import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { roundDecimals } from "@/common/helpers/round-decimals";
import { Coin } from "@/src/models";

import { SmallCoinChart } from "../atoms/small-coin-chart";

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  ranking: {
    textAlign: "center",
    width: 30,
  },
  listItemAvatar: {
    minWidth: 46,
  },
  avatarSmall: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  coinLabelText: {
    width: 80,
  },
  coinPrice: (_props) => ({
    width: 80,
    textAlign: "right",
    paddingRight: 12,
    "& .MuiTypography-subtitle2": {
      color: (styleProps: StyleProps) =>
        styleProps.change >= 0 ? theme.palette.success.main : theme.palette.error.main,
    },
  }),
}));

interface StyleProps {
  change: number;
}

interface Props {
  coin: Coin;
}

export const CoinItem: React.FunctionComponent<Props> = ({ coin }) => {
  const classes = useStyles({ change: coin.marketCapChangePercentage24H });

  return (
    <ListItem disableGutters>
      <div className={classes.ranking}>
        <Typography variant="body2">{coin.marketCapRank}</Typography>
      </div>

      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar src={coin.image} alt={coin.name} className={classes.avatarSmall} />
      </ListItemAvatar>

      <ListItemText
        className={classes.coinLabelText}
        primary={coin.name}
        secondary={`${coin.symbol.toUpperCase()}/USD`}
        primaryTypographyProps={{ variant: "subtitle1", noWrap: true }}
        secondaryTypographyProps={{ variant: "subtitle2" }}
      />
      <SmallCoinChart coin={coin} dataKey={"prices"} />
      <ListItemText
        className={classes.coinPrice}
        primary={`US$${roundDecimals(coin.currentPrice, 3)}`}
        secondary={`${coin.priceChangePercentage24H > 0 ? "+" : ""}${roundDecimals(coin.priceChangePercentage24H)}%`}
        primaryTypographyProps={{ variant: "subtitle1", noWrap: true }}
        secondaryTypographyProps={{ variant: "subtitle2" }}
      />
    </ListItem>
  );
};
