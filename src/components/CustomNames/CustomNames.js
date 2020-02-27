import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getMoods } from "../../redux/moodReducer.js";
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
            customMoods: [
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
            user_id: this.props.user.user.user_id
        });
        this.setState({ one: "", two: "", three: "", four: "", five: "" });
        if (status.data === "OK") {
            this.props.getMoods(this.props.user.user.user_id);
        }
    };

    deleteMood = async id => {
        const status = await axios.delete(`/api/moods/${id}`);
        if (status.data === "OK") {
            this.props.getMoods(this.props.user.user.user_id);
        }
    };

    findCustomNames = () => {
        let arr = [];
        const { moods } = this.props.mood;
        for (let i = 1; i <= 5; i++) {
            const index = moods.findIndex(mood => mood.num === i);
            index !== -1
                ? arr.push(moods[index])
                : arr.push({ num: i, name: "" });
        }
        this.setState({ customMoods: arr });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user.user.user_id !== this.props.user.user.user_id) {
            // console.log("user change");
            this.props.getMoods(this.props.user.user.user_id);
        }
        if (prevProps.mood.moods !== this.props.mood.moods) {
            // console.log("mood change");
            this.findCustomNames();
        }
    }

    componentDidMount() {
        if (this.props.user.user.user_id) {
            this.props.getMoods(this.props.user.user.user_id);
            this.findCustomNames();
        }
    }

    render() {
        const { customMoods } = this.state;
        // console.log(customMoods);
        const mappedNames = customMoods.map((mood, i) => {
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

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        mood: state.moodReducer
    };
};

const mapDispatchToProps = { getMoods };

export default connect(mapStateToProps, mapDispatchToProps)(CustomNames);
