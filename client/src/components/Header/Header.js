import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import formatMoods from "../../utils/formatMoods.js";
import { withRouter } from "react-router-dom";
import {
  getSession,
  setMoods,
  setUser,
  logout,
  toggleMenu
} from "../../redux/reducer.js";
import hamburger from "./hamburger.svg";
import "./Header.css";

function Header(props) {
  const { titleColor, setMoods, getSession, loggedIn } = props;

  React.useEffect(() => {
    getSession();
  }, [getSession]);

  React.useEffect(() => {
    if (loggedIn) {
      axios({ method: "get", url: "/api/moods" }).then(({ data }) => {
        let moods = formatMoods(data.moods);
        setMoods(moods);
      });
    }
  }, [setMoods, loggedIn]);

  return (
    <header>
      <Link to="/">
        <div className="title-container">
          <h1 className="title-content" style={{ color: titleColor }}>
            MOOD TRACKER
          </h1>
        </div>
      </Link>
      <div className="user-portal">
        {!props.loggedIn ? (
          <div className="not-logged-in">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <img
              src={hamburger}
              alt="hamburger"
              className="hamburger-menu"
              onClick={() => props.toggleMenu(true)}
            />
          </div>
        ) : (
          <div className="logged-in">
            <h1 className="welcome-message">
              Welcome {props.username || "User"}
            </h1>
            <Link to="/data">
              <button>Data</button>
            </Link>
            <Link to="/log">
              <button>Log</button>
            </Link>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
            <button onClick={() => props.logout() && props.history.push("/")}>
              Logout
            </button>
            <img
              src={hamburger}
              alt="hamburger"
              className="hamburger-menu"
              onClick={() => props.toggleMenu(true)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  getSession,
  setMoods,
  setUser,
  logout,
  toggleMenu
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
