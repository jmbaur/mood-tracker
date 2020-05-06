import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header/Header.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Main from "./components/Main/Main.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Settings from "./components/Settings/Settings.js";
import Data from "./components/Data/Data.js";
import Log from "./components/Log/Log.js";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      {props.hamburgerMenu ? <Sidebar /> : null}
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/data" component={Data} />
        <Route path="/log" component={Log} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
