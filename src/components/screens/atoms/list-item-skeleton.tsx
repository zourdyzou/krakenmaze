import React, { Fragment } from "react";
import { Divider, ListItem } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  listItemSkeleton: {
    height: 69,
    "& .MuiSkeleton-circle": {
      margin: "0 20px",
    },
  },
  listTextSkeleton: {
    width: `calc(100% - 40px - ${theme.spacing(4)}px)`,
    "& .MuiSkeleton-text:first-child": {
      marginBottom: 6,
    },
  },
}));

interface Props {
  count: number;
}

export const ListItemSkeleton: React.FunctionComponent<Props> = ({ count }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {Array.from(Array(count).keys()).map((index: number) => (
        <Fragment key={index}>
          <ListItem className={classes.listItemSkeleton} disableGutters>
            <Skeleton animation="wave" variant="circle" height={theme.spacing(4)} width={theme.spacing(4)} />
            <div className={classes.listTextSkeleton}>
              <Skeleton animation="wave" height={12} width="80%" />
              <Skeleton animation="wave" height={12} width="40%" />
            </div>
          </ListItem>
          {index < count - 1 && <Divider />}
        </Fragment>
      ))}
    </>
  );
};
