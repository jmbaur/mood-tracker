import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer.js";
import "./Register.css";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            username: "",
            email: "",
            password1: "",
            password2: ""
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    clear = e => {
        e.preventDefault();
        this.setState({
            firstName: "",
            username: "",
            email: "",
            password1: "",
            password2: ""
        });
    };

    submit = async e => {
        e.preventDefault();
        const { firstName, username, email, password1, password2 } = this.state;
        if (password1 === password2 && password1) {
            const res = await axios
                .post("/auth/register", {
                    firstName,
                    username,
                    email: email.toLowerCase(),
                    password: password1
                })
                .catch(err => alert(err.response.request.response));
            this.setState({
                firstName: "",
                username: "",
                email: "",
                password1: "",
                password2: ""
            });
            if (res) {
                this.props.setUser({
                    email: email.toLowerCase(),
                    password: password1
                });
                this.props.history.push("/");
            }
        } else if (!password1) {
            alert("Password is empty.");
        } else {
            alert("Passwords do not match.");
        }
    };

    render() {
        const { firstName, username, email, password1, password2 } = this.state;

        return (
            <main className="Register">
                <div>
                    <form onSubmit={this.submit} className="register-form">
                        <div className="input-fields">
                            <label>
                                First Name
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="optional"
                                    value={firstName}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Username
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="required"
                                    value={username}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="required"
                                    value={email}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Password
                                <input
                                    type="password"
                                    name="password1"
                                    placeholder="required"
                                    value={password1}
                                    onChange={this.changeHandler}
                                />
                            </label>
                            <label>
                                Confirm Password
                                <input
                                    type="password"
                                    name="password2"
                                    placeholder="required"
                                    value={password2}
                                    onChange={this.changeHandler}
                                />
                            </label>
                        </div>
                        <div className="form-buttons-container">
                            <input
                                type="submit"
                                value="Register"
                                className="submit-button"
                            />
                            <button onClick={this.clear}>Clear</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
