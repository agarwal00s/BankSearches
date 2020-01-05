import React from "react";
import BankSearch from "./BankSearch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favourite from "./Favourite";

function App() {
  return (
    <Router>
      {/* <Link to="/">Bank Search</Link>
        <Link to="/favourite">Favourites</Link> */}

      <Switch>
        <Route exact path="/">
          <BankSearch />
        </Route>
        <Route path="/favourite">
          <Favourite />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
