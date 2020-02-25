import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, toggleMenu } from "../../redux/userReducer.js";
import x from "./x.svg";
import settings from "./settings.svg";
import logoutSvg from "./logout.svg";
import login from "./login.svg";
import profile from "./profile.svg";
import "./Sidebar.css";

function Sidebar(props) {
    return (
        <div className="Sidebar">
            <div
                onClick={() => props.toggleMenu(false)}
                className="empty-div"
            ></div>
            {props.user.loggedIn ? (
                <ul>
                    <img
                        src={x}
                        alt="x"
                        className="x"
                        onClick={() => props.toggleMenu(false)}
                    />
                    <li>
                        <Link
                            to="/settings"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>
                                Settings
                                <img
                                    src={settings}
                                    alt="settings-button"
                                    className="settings-button"
                                />
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                props.toggleMenu(false);
                                props.logout();
                            }}
                        >
                            Logout
                            <img
                                src={logoutSvg}
                                alt="logout-button"
                                className="logout-button"
                            />
                        </button>
                    </li>
                </ul>
            ) : (
                <ul>
                    <img
                        src={x}
                        alt="x"
                        className="x"
                        onClick={() => props.toggleMenu(false)}
                    />
                    <li>
                        <Link
                            to="/register"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>
                                Register
                                <img src={profile} alt="register-button" />
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>
                                Login
                                <img src={login} alt="login-button" />
                            </button>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = {
    logout,
    toggleMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
