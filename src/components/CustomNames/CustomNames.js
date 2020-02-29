import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import EditText from "../EditText/EditText.js";
import trash from "./trash.svg";
import "./CustomNames.css";

class CustomNames extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: []
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
        let tmpArr = moods.slice();
        let i = 0;
        while (i < 5) {
            if (tmpArr[i].num !== i + 1) {
                tmpArr.splice(i, 0, { num: i + 1, name: "" });
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
        // console.log(this.state);
        const mappedInputs = this.state.moods.map((mood, i) => {
            return (
                <div key={i}>
                    <h1>{mood.num}</h1>
                    <EditText
                        submitButtonText="Change"
                        submit={this.submit}
                        text={mood.name}
                        id={mood.num}
                    />
                    <img src={trash} alt="trash" onClick={this.delete} />
                </div>
            );
        });
        return <div className="CustomNames">{mappedInputs}</div>;
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CustomNames);
