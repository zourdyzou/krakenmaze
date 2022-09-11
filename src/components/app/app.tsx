import image from "@assets/images/yuri-gagarin.jpeg";
import classNames from "classnames";
import React from "react";

import { stylesContainer, stylesHeader, stylesImage, stylesLink } from "./app.module.scss";

export const App = (): React.ReactElement => (
  <div className={stylesContainer}>
    <div className={stylesHeader}>Gratuliere Comrades, It is working pretty well.</div>
    <img src={image} className={stylesImage} alt="yee-haw" />
    <div>
      <a className={classNames(stylesLink)} href="https://github.com/glook/webpack-typescript-react" target="_blank">
        &nbsp;
      </a>
    </div>
  </div>
);
