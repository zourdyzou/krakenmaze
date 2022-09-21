import React from "react";
import { CardHeader } from "@material-ui/core";

import { CardLayout } from "@/components/screens/molecules/card-layout";

export const InstitutionHoldersCard: React.FunctionComponent = () => {
  return (
    <CardLayout>
      <CardHeader title="Institution Hodlers" titleTypographyProps={{ variant: "body1" }} />
    </CardLayout>
  );
};
