import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/userReducer.js";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
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
            username: "",
            email: "",
            password1: "",
            password2: ""
        });
    };

    submit = e => {
        e.preventDefault();
        const { username, email, password1, password2 } = this.state;
        if (password1 === password2) {
            axios
                .post("/auth/register", {
                    username,
                    email,
                    password: password1
                })
                .then(res => {
                    // console.log("register data: ", res.data);
                    this.props.setUser(res.data);
                })
                .catch(err => alert(err.response.request.response));
            this.setState({
                username: "",
                email: "",
                password1: "",
                password2: ""
            });
        }
        this.props.history.push("/");
    };

    render() {
        const { username, email, password1, password2 } = this.state;

        return (
            <main>
                Register
                <form onSubmit={this.submit}>
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
                        Password
                        <input
                            type="password"
                            name="password1"
                            value={password1}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <input type="submit" value="Register" />
                    <button onClick={this.clear}>Clear</button>
                </form>
            </main>
        );
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
