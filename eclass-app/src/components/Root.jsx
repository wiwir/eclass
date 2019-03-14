import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // rr-v4
import App from "./App";
import Logging from "./Logging";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Logging} />
          <Route exact path="/top-result" component={App} />
          <Route path="/:page?/:item?" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default Root;
