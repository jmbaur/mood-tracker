import React from "react";
import { NavLink } from "react-router-dom";
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
import hamburger from "../../assets/hamburger.svg";
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
      <NavLink className="title-content" style={{ color: titleColor }} to="/">
        MOOD TRACKER
      </NavLink>
      <div className="user-portal">
        {!props.loggedIn ? (
          <>
            <NavLink className="desktop" to="/register">
              <button>Register</button>
            </NavLink>
            <NavLink className="desktop" to="/login">
              <button>Login</button>
            </NavLink>
            <img
              src={hamburger}
              alt="hamburger"
              className="hamburger-menu"
              onClick={() => props.toggleMenu(true)}
            />
          </>
        ) : (
          <>
            <h2 className="message desktop">Hi, {props.username || "User"}!</h2>
            <NavLink className="desktop" to="/data">
              <button>Data</button>
            </NavLink>
            <NavLink className="desktop" to="/log">
              <button>Log</button>
            </NavLink>
            <NavLink className="desktop" to="/settings">
              <button>Settings</button>
            </NavLink>
            <NavLink className="desktop" to="/">
              <button onClick={props.logout}>Logout</button>
            </NavLink>
            <img
              src={hamburger}
              alt="hamburger"
              className="hamburger-menu"
              onClick={() => props.toggleMenu(true)}
            />
          </>
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
