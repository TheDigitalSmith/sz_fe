import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.scss";
import "./App.css";

import { Login, Register } from "./components/login/index";
import { Dashboard } from "./components/dashboard/index";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </div>
  );
}

export default App;
