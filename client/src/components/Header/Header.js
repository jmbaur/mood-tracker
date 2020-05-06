import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getSession,
  getMoods,
  setUser,
  logout,
  toggleMenu
} from "../../redux/reducer.js";
import hamburger from "./hamburger.svg";
import "./Header.css";

function Header(props) {
  const [titleColor, setTitleColor] = React.useState(props.titleColor);

  const { getMoods, getSession, loggedIn } = props;

  React.useEffect(() => {
    getSession();
  }, [getSession]);

  React.useEffect(() => {
    if (loggedIn) {
      getMoods();
    }
  }, [getMoods, loggedIn]);

  // React.useEffect(() => {
  //   setTitleColor(props.titleColor);
  // }, [props.titleColor]);

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
  getMoods,
  setUser,
  logout,
  toggleMenu
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
