import React from "react";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer.js";
import "./Login.css";

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

    submit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (password) {
            this.props.setUser({ email: email.toLowerCase(), password });
            this.props.history.push("/");
        } else {
            alert("Password is empty.");
        }
    };

    render() {
        const { email, password } = this.state;

        return (
            <main className="Login">
                <div>
                    <form onSubmit={this.submit} className="login-form">
                        <div className="input-fields">
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
                                    name="password"
                                    placeholder="required"
                                    value={password}
                                    onChange={this.changeHandler}
                                />
                            </label>
                        </div>
                        <div className="form-buttons-container">
                            <input
                                type="submit"
                                value="Login"
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
