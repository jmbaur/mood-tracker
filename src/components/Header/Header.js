import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSession, setUser, logout } from "../../redux/userReducer.js";
import "./Header.css";

class Header extends React.Component {
    async getSession() {
        const res = await axios.get("/auth/session");
        if (res.data) {
            this.props.setUser(res.data);
        }
    }

    componentDidMount() {
        // this.props.getSession();
        this.getSession();
    }

    render() {
        console.log("HEADER PROPS ", this.props);
        const { user, loggedIn } = this.props;

        return (
            <header>
                <div className="title-container">
                    <Link to="/">
                        <button className="title-button">
                            <h1 className="title">MOOD TRACKER</h1>
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
                        </div>
                    ) : (
                        <div className="logged-in">
                            <h1>Welcome {user.username}</h1>
                            <button onClick={this.props.logout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    getSession,
    setUser,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);