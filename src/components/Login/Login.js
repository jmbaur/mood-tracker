import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/userReducer.js";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
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
        axios
            .post("/auth/login", {
                email,
                password
            })
            .then(res => {
                // console.log("login data: ", res.data);
                this.props.setUser(res.data);
            })
            .catch(err => alert(err.response.request.response));
        this.setState({
            email: "",
            password: ""
        });
        this.props.history.push("/");
    };

    render() {
        const { email, password } = this.state;

        return (
            <main>
                Login
                <form onSubmit={this.submit}>
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
                    <input type="submit" value="Login" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
