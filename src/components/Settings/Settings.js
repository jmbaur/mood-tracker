import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Protected from "../Protected/Protected.js";
import "./Settings.css";

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: [],
        };
    }

    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    numberToWords = num => {
        switch (num) {
            case 1:
                return "one";
            case 2:
                return "two";
            case 3:
                return "three";
            case 4:
                return "four";
            case 5:
                return "five";
            default:
                return "";
        }
    };

    submit = async (num, name) => {
        let status = await axios.post("/api/moods", {
            num,
            name,
            user_id: this.props.user.user_id
        });
        if (status.data === "OK") {
            this.findCustomNames();
        }
    };

    getMoods = async user_id => {
        const res = await axios.get(`/api/moods/${user_id}`);
        return res.data;
    };

    findCustomNames = async () => {
        const moods = await this.getMoods(this.props.user.user_id);
        const colors = ["rgb(227, 49, 51)", "rgb(240,116,58)", "rgb(255,190,58)", "rgb(151,187,61)", "rgb(67,184,63)"]
        let tmpArr = moods.slice();
        let i = 0;
        while (i < 5) {
            tmpArr[i].color = colors[i]
            if (tmpArr[i].num !== i + 1) {
                tmpArr.splice(i, 0, { num: i + 1, name: "", color: colors[i] });
            }
            i++;
        }
        this.setState({ moods: tmpArr });
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
        console.log(this.state.moods)
        const mappedInputs = this.state.moods.map((mood, i) => {
            return (
                <div key={i}>
                    <div className="color-container" style={{ backgroundColor: mood.color }}></div>
                    <form>
                        <input type="text" value={mood.name} onChange={this.changeHandler} placeholder="optional" />
                        <button type="submit">Change</button>
                        <button type="button" onClick={this.deleteMood}>Clear</button>
                    </form>
                </div>
            )
        })
        return <main className="Settings">
            {this.props.loggedIn ?
                <div>
                    <div className="title">
                        <h1>User settings</h1>
                    </div>
                    <div className="mood-name-container">
                        <h1>Change the message that appears when you mark your moods!</h1>
                        {mappedInputs}
                    </div>
                </div>
                :
                <Protected />}
        </main>;
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Settings);
