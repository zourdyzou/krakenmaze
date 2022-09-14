import React, { CSSProperties } from "react";

interface Props {
  className?: string;
  name?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  iconSource?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  [key: string]: any;
}

export const IconComponent: React.FunctionComponent<Props> = ({ iconSource: IconComponent, ...restProps }) => {
  return IconComponent ? <IconComponent {...restProps} /> : null;
};
