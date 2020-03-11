import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/reducer.js";
import Protected from "../Protected/Protected.js";
import EditText from "../EditText/EditText.js";
import Warning from "../Warning/Warning.js";
import "./Settings.css";

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: [],
            warning: false
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    submit = async (num, name) => {
        let status = await axios.post("http://localhost:4000/api/moods", {
            num,
            name,
            user_id: this.props.user.user_id
        });
        if (status.data === "OK") {
            this.findCustomNames();
        }
    };

    delete = async mood_id => {
        if (mood_id) {
            let status = await axios.delete(`http://localhost:4000/api/moods/${mood_id}`);
            if (status.data === "OK") {
                this.findCustomNames();
            }
        }
    };

    getMoods = async user_id => {
        const res = await axios.get(`http://localhost:4000/api/moods/${user_id}`);
        return res.data;
    };

    findCustomNames = async () => {
        const colors = [
            "rgb(227, 49, 51)",
            "rgb(240,116,58)",
            "rgb(255,190,58)",
            "rgb(151,187,61)",
            "rgb(67,184,63)"
        ];
        const moods = await this.getMoods(this.props.user.user_id);
        let tmpArr = moods.slice();
        let i = 0;
        while (i < 5) {
            if (!tmpArr[i] || tmpArr[i].num !== i + 1) {
                tmpArr.splice(i, 0, {
                    num: i + 1,
                    name: "",
                    color: colors[i]
                });
            }
            tmpArr[i].color = colors[i];
            i++;
        }
        this.setState({ moods: tmpArr });
    };

    toggleWarning = () => {
        this.setState({ warning: !this.state.warning });
    };

    deleteAccount = async () => {
        const status = await axios.delete(
            `http://localhost:4000/auth/account/${this.props.user.user_id}`
        );

        if (status.data === "OK") {
            this.props.logout();
            alert("User account has been deleted.");
            this.props.history.push("/");
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user.user_id !== this.props.user.user_id) {
            this.findCustomNames();
        }
    }

    componentDidMount() {
        if (this.props.user.user_id) {
            this.findCustomNames();
        }
    }
    render() {
        const { moods } = this.state;
        // console.log(moods);
        const mappedInputs = moods.map((mood, i) => {
            return (
                <div key={i}>
                    <EditText
                        color={mood.color}
                        mood_id={mood.mood_id}
                        num={mood.num}
                        submit={this.submit}
                        delete={this.delete}
                        input={mood.name}
                    />
                </div>
            );
        });
        return (
            <main className="Settings">
                {this.props.loggedIn ? (
                    <div>
                        <div className="title">
                            <h1>User settings</h1>
                        </div>
                        <div className="mood-name-container">
                            <h1>
                                Change the message that appears when you mark
                                your moods!
                            </h1>
                            {mappedInputs}
                        </div>
                        <div className="settings-button-container">
                            <button
                                className="delete-account-button"
                                onClick={this.toggleWarning}
                            >
                                Delete Account
                            </button>
                            {this.state.warning ? (
                                <Warning
                                    fn1={this.toggleWarning}
                                    fn2={this.deleteAccount}
                                />
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <Protected />
                )}
            </main>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
