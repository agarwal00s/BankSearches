import React from "react";
import BankSearch from "./BankSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favourite from "./Favourite";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={process.env.PUBLIC_URL + "/favourite"}>
          <Favourite />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/"}>
          <BankSearch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
