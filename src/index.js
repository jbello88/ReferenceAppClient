import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";

import { history } from "./_helpers";
import { accountService } from "./_services";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import { App } from "./app";

import "./styles.less";

// setup fake backend
//import { configureFakeBackend } from "./_helpers";
//configureFakeBackend();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <React.StrictMode>
      <StoreProvider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </StoreProvider>
    </React.StrictMode>,
    document.getElementById("app")
  );
}
