import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    getSession,
    setUser,
    logout,
    toggleMenu
} from "../../redux/reducer.js";
import hamburger from "./hamburger.svg";
import "./Header.css";

class Header extends React.Component {
    componentDidMount() {
        this.props.getSession();
    }

    render() {
        const { user, loggedIn } = this.props;

        return (
            <header>
                <div className="title-container">
                    <Link to="/">
                        <button className="title-button">
                            <h1 className="title" id={this.props.title}>
                                MOOD TRACKER
                            </h1>
                        </button>
                    </Link>
                </div>
                <div className="user-portal">
                    {!loggedIn ? (
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
                                onClick={() => this.props.toggleMenu(true)}
                            />
                        </div>
                    ) : (
                        <div className="logged-in">
                            <h1>Welcome {user.firstName || user.username}</h1>
                            <Link to="/data">
                                <button>Data</button>
                            </Link>
                            <Link to="/settings">
                                <button>Settings</button>
                            </Link>
                            <button
                                onClick={() =>
                                    this.props.logout() &&
                                    this.props.history.push("/")
                                }
                            >
                                Logout
                            </button>
                            <img
                                src={hamburger}
                                alt="hamburger"
                                className="hamburger-menu"
                                onClick={() => this.props.toggleMenu(true)}
                            />
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

const mapStateToProps = state =>state
;

const mapDispatchToProps = {
    getSession,
    setUser,
    logout,
    toggleMenu
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
