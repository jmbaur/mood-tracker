import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Line, Scatter } from "react-chartjs-2";
import { setTitle, getMoods } from "../../redux/moodReducer.js";
import {
    addMark,
    getMarks,
    getMarksDetailed
} from "../../redux/markReducer.js";
import Comment from "../Comment/Comment.js";
import "./Marker.css";

class Marker extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultMoods: [
                { num: 1, name: "Feels bad man" },
                { num: 2, name: "Seen better days" },
                { num: 3, name: "Ehhhh" },
                { num: 4, name: "Pretty good" },
                { num: 5, name: "Great!" }
            ],
            showMood: false,
            message: "",
            lineLabels: [],
            lineData: []
        };
    }

    setMood = num => {
        const { defaultMoods } = this.state; // default moods
        const { moods } = this.props.mood; // custom moods
        const customIndex = moods.findIndex(mood => mood.num === num);
        const defaultIndex = defaultMoods.findIndex(mood => mood.num === num);
        customIndex !== -1
            ? this.setState({
                  showMood: true,
                  message: moods[customIndex].name
              })
            : this.setState({
                  showMood: true,
                  message: defaultMoods[defaultIndex].name
              });
        let numName;
        switch (num) {
            case 0:
                numName = "one";
                break;
            case 1:
                numName = "two";
                break;
            case 2:
                numName = "three";
                break;
            case 3:
                numName = "four";
                break;
            case 4:
                numName = "five";
                break;
            default:
                numName = "default";
        }
        this.props.setTitle(numName);
        const event = new Date(Date.now()).toISOString();
        this.props.addMark({
            user_id: this.props.user.user.user_id,
            time: event,
            mood: num
        });
    };

    getLineData = async () => {
        const filter = "day";
        const { user_id } = this.props.user.user;
        const res = await axios.get(
            `/api/marks_filter?user_id=${user_id}&filter=${filter}`
        );
        let tmpArr = res.data.map(elem => elem["t"]);
        this.setState({ lineData: res.data, lineLabels: tmpArr });
    };

    falseShowMood = () => {
        this.setState({ showMood: false });
        // this.setState({ showMood: !this.state.showMood });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.mark.recentMark !== this.props.mark.recentMark) {
            this.props.getMarks(this.props.user.user.user_id);
            this.props.getMarksDetailed(this.props.user.user.user_id);
        }
    }

    componentDidMount() {
        this.props.getMarks(this.props.user.user.user_id);
        this.props.getMarksDetailed(this.props.user.user.user_id);
        this.props.getMoods(this.props.user.user.user_id);
        this.getLineData();
    }

    render() {
        const { showMood, message, lineData, lineLabels } = this.state;
        // console.log(lineData, lineLabels)

        const options = {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        distribution: "linear",
                        time: { unit: "hour", stepSize: 1 }
                    }
                ]
            }
        };
        const data = {
            type: "line",
            labels: lineLabels,
            datasets: [
                {
                    label: "Today's Moods",
                    data: lineData
                }
            ]
        };

        return (
            <div className="Marker">
                <div className="mood-message-container">
                    {showMood ? (
                        <Comment
                            message={message}
                            falseShowMood={this.falseShowMood}
                        />
                    ) : null}
                </div>
                <div className="circle-container">
                    <div className="circle-marker">
                        <button
                            className="one"
                            onClick={() => this.setMood(1)}
                        ></button>
                    </div>
                    <div className="circle-marker">
                        <button
                            className="two"
                            onClick={() => this.setMood(2)}
                        ></button>
                    </div>
                    <div className="circle-marker">
                        <button
                            className="three"
                            onClick={() => this.setMood(3)}
                        ></button>
                    </div>
                    <div className="circle-marker">
                        <button
                            className="four"
                            onClick={() => this.setMood(4)}
                        ></button>
                    </div>
                    <div className="circle-marker">
                        <button
                            className="five"
                            onClick={() => this.setMood(5)}
                        ></button>
                    </div>
                </div>
                <Line options={options} data={data} />
                {/* <Scatter options={options} data={data} /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        mood: state.moodReducer,
        mark: state.markReducer
    };
};

const mapDispatchToProps = {
    setTitle,
    addMark,
    getMarks,
    getMarksDetailed,
    getMoods
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
