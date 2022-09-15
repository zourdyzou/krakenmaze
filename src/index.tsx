import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import { store } from "@/components/app/store";
import { App } from "@/components/container";

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
