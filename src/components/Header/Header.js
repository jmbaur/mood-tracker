import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    getSession,
    setUser,
    logout,
    toggleMenu
} from "../../redux/userReducer.js";
import hamburger from "./hamburger.svg";
import "./Header.css";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            menuStatus: "unclicked"
        };
    }

    menuToggle = () => {
        let status = false;
        if (this.state.menuStatus === "unclicked") {
            this.setState({ menuStatus: "clicked" });
            status = true;
        } else {
            this.setState({ menuStatus: "unclicked" });
        }
        this.props.toggleMenu(status);
    };

    componentDidMount() {
        this.props.getSession();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.user.hamburgerMenu &&
            prevProps.user.hamburgerMenu !== this.props.user.hamburgerMenu
        ) {
            this.setState({ menuStatus: "unclicked" });
        }
    }

    render() {
        const { user, loggedIn } = this.props.user;

        return (
            <header>
                <div className="title-container">
                    <Link to="/">
                        <button className="title-button">
                            <h1 className="title" id={this.props.mood.title}>
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
                                id={this.state.menuStatus}
                                onClick={this.menuToggle}
                            />
                        </div>
                    ) : (
                        <div className="logged-in">
                            <h1>Welcome {user.username}</h1>
                            <Link to="/settings">
                                <button>Settings</button>
                            </Link>
                            <button onClick={this.props.logout}>Logout</button>
                            <img
                                src={hamburger}
                                alt="hamburger"
                                className="hamburger-menu"
                                id={this.state.menuStatus}
                                onClick={this.menuToggle}
                            />
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        mood: state.moodReducer
    };
};

const mapDispatchToProps = {
    getSession,
    setUser,
    logout,
    toggleMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
