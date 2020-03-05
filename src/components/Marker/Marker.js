import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { setTitle } from "../../redux/reducer.js";
import Comment from "../Comment/Comment.js";
import "./Marker.css";

class Marker extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: [],
            showMood: false,
            message: "",
            lineLabels: [],
            lineData: [],
            lineComments: [],
            recentMark: {},
        };
    }

    setMood = num => {
        const { moods } = this.state;
        const index = moods.findIndex(mood => mood.num === num);
        this.setState({
            showMood: true,
            message: moods[index].name
        });
        this.setTitle(num);
        this.addMark({
            user_id: this.props.user.user_id,
            time: moment().format(),
            mood: num
        });
    };

    setTitle = num => {
        let numName;
        switch (num) {
            case 1:
                numName = "one";
                break;
            case 2:
                numName = "two";
                break;
            case 3:
                numName = "three";
                break;
            case 4:
                numName = "four";
                break;
            case 5:
                numName = "five";
                break;
            default:
                numName = "default";
        }
        this.props.setTitle(numName);
    };

    addMark = async mark => {
        const res = await axios.post("/api/marks", mark);
        this.setState({ recentMark: res.data[0] });
    };

    getLineData = async () => {
        const type = "line";
        const { user_id } = this.props.user;
        const res = await axios.get(
            `/api/marks?user_id=${user_id}&type=${type}`
        );
        const lineData = res.data.map(elem => {
            return { t: elem["t"], y: elem["y"] };
        });
        const lineLabels = res.data.map(elem => elem["t"]);
        const lineComments = res.data.map(elem => elem["c"]);
        this.setState({ lineData, lineLabels, lineComments });
    };

    getMoods = async user_id => {
        const res = await axios.get(`/api/moods/${user_id}`);
        const defaultMoods = [
            { num: 1, name: "Bad" },
            { num: 2, name: "Not good" },
            { num: 3, name: "OK" },
            { num: 4, name: "Good" },
            { num: 5, name: "Great" }
        ];
        let tmpArr = res.data.slice();
        let i = 0;
        while (i < 5) {
            if (tmpArr[i].num !== i + 1) {
                tmpArr.splice(i, 0, defaultMoods[i]);
            }
            i++;
        }
        this.setState({ moods: tmpArr });
    };

    falseShowMood = () => {
        this.setState({ showMood: false });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.recentMark !== this.state.recentMark) {
            this.getLineData();
        }
        if (
            prevState.showMood !== this.state.showMood &&
            !this.state.showMood
        ) {
            this.getLineData();
        }
    }

    componentDidMount() {
        if (this.props.user.user_id) {
            this.getMoods(this.props.user.user_id);
            this.getLineData();
        }
    }

    render() {
        const {
            showMood,
            message,
            lineData,
            lineLabels,
            lineComments
        } = this.state;

        const options = {
            // layout: { padding: {left:10, right: 10} },
            layout: { padding: 10 },
            legend: false,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        distribution: "linear",
                        time: {
                            unit: "hour",
                            stepSize: 1,
                            tooltipFormat: "HH:mm:ss"
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: tooltipItem => tooltipItem.value,
                    afterLabel: tooltipItem => lineComments[tooltipItem.index],
                    labelColor: tooltipItem => {
                        switch (tooltipItem.value) {
                            case "5":
                                return {
                                    borderColor: "rgb(67, 184, 63)",
                                    backgroundColor: "rgb(67, 184, 63)"
                                };
                            case "4":
                                return {
                                    borderColor: "rgb(151, 187, 61)",
                                    backgroundColor: "rgb(151, 187, 61)"
                                };
                            case "3":
                                return {
                                    borderColor: "rgb(255, 190, 58)",
                                    backgroundColor: "rgb(255, 190, 58)"
                                };
                            case "2":
                                return {
                                    borderColor: "rgb(240, 116, 58)",
                                    backgroundColor: "rgb(240, 116, 58)"
                                };
                            case "1":
                                return {
                                    borderColor: "rgb(227, 49, 51)",
                                    backgroundColor: "rgb(227, 49, 51)"
                                };
                            default:
                                return {
                                    borderColor: "rgba(0, 0, 0, 0.5)",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                                };
                        }
                    }
                }
            }
        };
        const data = {
            type: "line",
            labels: lineLabels,
            datasets: [
                {
                    label: "Today's Moods",
                    fill: false,
                    lineTension: 0.05,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderColor: "rgba(0,0,0,0.5)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    // pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointRadius: 4,
                    pointBorderWidth: 1,
                    pointHoverRadius: 8,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointHitRadius: 10,
                    data: lineData
                }
            ]
        };

        return (
            <div className="Marker">
                <div className="title">
                    <h1>Mark your mood!</h1>
                </div>
                {showMood ? (
                    <Comment
                        message={message}
                        falseShowMood={this.falseShowMood}
                        recentMark={this.state.recentMark}
                    />
                ) : <div className="no-show"></div>}
                <div className="marker-container">
                    <button
                        className="one"
                        onClick={() => this.setMood(1)}
                    ></button>
                    <button
                        className="two"
                        onClick={() => this.setMood(2)}
                    ></button>
                    <button
                        className="three"
                        onClick={() => this.setMood(3)}
                    ></button>
                    <button
                        className="four"
                        onClick={() => this.setMood(4)}
                    ></button>
                    <button
                        className="five"
                        onClick={() => this.setMood(5)}
                    ></button>
                </div>
                <div className="line-chart-container">
                    <Line options={options} data={data} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    setTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
