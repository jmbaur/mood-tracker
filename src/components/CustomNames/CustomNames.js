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
            one: "",
            two: "",
            three: "",
            four: "",
            five: "",
            customMoods: [],
            moods: [
                { name: "" },
                { name: "" },
                { name: "" },
                { name: "" },
                { name: "" }
            ]
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
        const status = await axios.post("/api/moods", {
            num,
            name,
            user_id: this.props.user.user_id
        });
        this.setState({ one: "", two: "", three: "", four: "", five: "" });
        if (status.data === "OK") {
            this.getMoods(this.props.user.user_id);
        }
    };

    deleteMood = async id => {
        const status = await axios.delete(`/api/moods/${id}`);
        if (status.data === "OK") {
            this.getMoods(this.props.user.user_id);
        }
    };

    getMoods = async user_id => {
        const res = await axios.get(`/api/moods/${user_id}`);
        this.setState({ customMoods: res.data });
    };

    findCustomNames = () => {
        let arr = [];
        const { customMoods } = this.state;
        for (let i = 1; i <= 5; i++) {
            const index = customMoods.findIndex(mood => mood.num === i);
            index !== -1
                ? arr.push(customMoods[index])
                : arr.push({ num: i, name: "" });
        }
        this.setState({ moods: arr });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user.user_id !== this.props.user.user_id) {
            // console.log("user change");
            this.getMoods(this.props.user.user_id);
            this.findCustomNames();
        }
        // if (prevProps.mood.moods !== this.props.mood.moods) {
        // console.log("mood change");
        // this.findCustomNames();
        // }
    }

    componentDidMount() {
        if (this.props.user.user_id) {
            this.getMoods(this.props.user.user_id);
            this.findCustomNames();
        }
    }

    render() {
        const { moods } = this.state;
        const mappedNames = moods.map((mood, i) => {
            return (
                <tr key={i}>
                    <td>{mood.num}</td>
                    <td>
                        <EditText
                            submit={this.submit}
                            text={mood.name}
                            id={mood.num}
                            submitButtonText="Change"
                        />
                    </td>
                    <td>
                        <img
                            src={trash}
                            alt="delete"
                            className="trash-button"
                            onClick={() => this.deleteMood(mood.mood_id)}
                        />
                    </td>
                </tr>
            );
        });

        return (
            <div className="CustomNames">
                <table>
                    <tbody>
                        <tr>
                            <th>Mood</th>
                            <th>Name</th>
                        </tr>
                        {mappedNames}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CustomNames);
