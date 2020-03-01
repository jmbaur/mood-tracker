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
            recentMark: {}
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
        const res = await axios.post("/api/mark", mark);
        this.setState({ recentMark: res.data[0] });
    };

    getLineData = async () => {
        const filter = "day";
        const { user_id } = this.props.user;
        const res = await axios.get(
            `/api/marks_filter?user_id=${user_id}&filter=${filter}`
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
            { num: 1, name: "Feels bad man" },
            { num: 2, name: "Seen better days" },
            { num: 3, name: "Ehhhh" },
            { num: 4, name: "Pretty good" },
            { num: 5, name: "Great!" }
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
        this.getMoods(this.props.user.user_id);
        this.getLineData();
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
                <div className="mood-message-container">
                    {showMood ? (
                        <Comment
                            message={message}
                            falseShowMood={this.falseShowMood}
                            recentMark={this.state.recentMark}
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
            </div>
        );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    setTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
