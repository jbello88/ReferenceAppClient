import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";

import { history } from "./_helpers";
import { accountService } from "./_services";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import { App } from "./app";

//import "./styles.less";

// setup fake backend
//import { configureFakeBackend } from "./_helpers";
//configureFakeBackend();

// attempt silent token refresh before startup
//accountService.refreshToken().finally(startApp);

//function startApp() {
/* ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router history={history}>
        <h1>This should show</h1>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("app")
); */
//}

ReactDOM.render(<h1>This should show</h1>, document.getElementById("app"));
