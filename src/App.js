import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Main from "./components/Main/Main.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
}

export default App;
