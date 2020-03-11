import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/reducer.js";
import "./Login.css";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            forgotPassword: false,
            username: "",
            password1: "",
            password2: ""
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    clear = e => {
        e.preventDefault();
        this.setState({
            email: "",
            password: ""
        });
    };

    submit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (password) {
            this.props.setUser({ email: email.toLowerCase(), password });
            this.props.history.push("/");
        } else {
            alert("Password is empty.");
        }
    };

    changePassword = async e => {
        e.preventDefault();
        const { email, password1, password2, username } = this.state;
        if (password1 && password1 === password2) {
            const status = await axios
                .put(`http://localhost:4000/auth/password`, {
                    email,
                    username,
                    password: password1
                })
                .catch(err => alert(err.response.request.response));
            console.log(status);
            if (status && status.data === "OK")
                this.setState({
                    email: "",
                    username: "",
                    password1: "",
                    password2: "",
                    password: "",
                    forgotPassword: false
                });
        } else {
            alert("Passwords do not match");
            this.setState({ password1: "", password2: "" });
        }
    };

    toggleForgotPassword = () => {
        this.setState({ forgotPassword: !this.state.forgotPassword });
    };

    render() {
        const {
            email,
            password,
            forgotPassword,
            username,
            password1,
            password2
        } = this.state;

        return (
            <main className="Login">
                <div className="title">
                    <h1>Login Here</h1>
                </div>
                {!forgotPassword ? (
                    <form onSubmit={this.submit} className="login-form">
                        <div className="input-fields">
                            <label>
                                Email
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.changeHandler}
                                />
                            </label>
                        </div>
                        <div className="form-button-container">
                            <button type="button" onClick={this.clear}>
                                Clear
                            </button>
                            <button type="submit" className="submit-button">
                                Login
                            </button>
                        </div>
                        <h2>
                            Forgot password?
                            <br />
                            <em onClick={this.toggleForgotPassword}>Reset</em>
                        </h2>
                    </form>
                ) : (
                    <form onSubmit={this.changePassword}>
                        <div className="input-fields">
                            <label>
                                Username
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                New password
                                <input
                                    type="password"
                                    name="password1"
                                    value={password1}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Confirm password
                                <input
                                    type="password"
                                    name="password2"
                                    value={password2}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <div className="form-button-container">
                                <button
                                    type="button"
                                    onClick={this.toggleForgotPassword}
                                >
                                    Cancel
                                </button>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                )}
            </main>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
