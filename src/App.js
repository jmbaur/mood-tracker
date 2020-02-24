import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./components/Header/Header.js";
import Main from "./components/Main/Main.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Settings from "./components/Settings/Settings.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import "./App.css";

function App(props) {
    return (
        <div className="App">
            {props.user.hamburgerMenu ? <Sidebar /> : null}
            <Header />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

export default connect(mapStateToProps)(App);
