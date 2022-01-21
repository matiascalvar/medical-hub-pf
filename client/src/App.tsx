import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
