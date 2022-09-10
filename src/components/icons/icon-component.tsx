import React, { CSSProperties } from "react";

interface Props {
  className?: string;
  name?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
  iconSource?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const Icon: React.FunctionComponent<Props> = ({ iconSource: IconComponent, ...restProps }) => {
  return IconComponent ? <IconComponent {...restProps} /> : null;
};
