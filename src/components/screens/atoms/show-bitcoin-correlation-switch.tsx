import React from "react";
import { Switch, Tooltip } from "@material-ui/core";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";

import { bitcoinOrange } from "@/components/screens/molecules/history-fear-greed-chart";
import { selectFearGreedIndex, setShowBitcoinCorrelation } from "@/features/fear-greed-index-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  bitcoinCorrelationSwitch: {
    margin: "12px 12px 0 0",
  },
}));

const CustomSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: bitcoinOrange,
    },
    "&$checked + $track": {
      backgroundColor: bitcoinOrange,
    },
  },
  checked: {},
  track: {},
})(Switch);

export const ShowBitcoinCorrelationSwitch: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  return (
    <Tooltip title={`${fearGreedIndex.showBitcoinCorrelation ? "Hide" : "Show"} Bitcoin Price`}>
      <CustomSwitch
        className={classes.bitcoinCorrelationSwitch}
        checked={fearGreedIndex.showBitcoinCorrelation}
        onChange={() => dispatch(setShowBitcoinCorrelation(!fearGreedIndex.showBitcoinCorrelation))}
      />
    </Tooltip>
  );
};
