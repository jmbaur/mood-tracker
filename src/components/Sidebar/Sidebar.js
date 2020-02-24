import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, toggleMenu } from "../../redux/userReducer.js";
import "./Sidebar.css";

function Sidebar(props) {
    return (
        <div className="Sidebar">
            {props.user.loggedIn ? (
                <ul>
                    <li>
                        <Link
                            to="/settings"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>Settings</button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                props.toggleMenu(false);
                                props.logout();
                                // this.props.history.push("/")
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link
                            to="/register"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>Register</button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            onClick={() => props.toggleMenu(false)}
                        >
                            <button>Login</button>
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
