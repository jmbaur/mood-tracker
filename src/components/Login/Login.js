import React from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/userReducer.js";
// import { setMoods } from "../../redux/moodReducer.js";
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
            this.props.setUser({ email, password });
            this.props.history.push("/");
        } else {
            alert("Password is empty.");
        }
    };

    // getMoods = async () => {
    //     const res = await axios
    //         .get("/api/moods")
    //         .catch(err => console.log("getMoods error ", err));
    //     return res.data;
    // };

    componentWillUnmount() {
        // console.log("hit");
        // this.props.setMoods(() => this.getMoods());
    }

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

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        mood: state.moodReducer
    };
};

const mapDispatchToProps = {
    setUser
    // setMoods
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
