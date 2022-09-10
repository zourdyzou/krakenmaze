import "@styles/styles.scss";
import "normalize.css/normalize.css";

import { App } from "@components/app";
import { store } from "@features/app/store";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
