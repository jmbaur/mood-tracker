import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import Protected from "../Protected/Protected.js";
import "./Data.css";

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: "year",
            pieData: [],
            barData: [],
            barLabels: [],
            title: `${moment().format("[Year of] YYYY")}`,
            xLabel: "Month",
            // unit: "year",
            pieChartShow: true,
            barChartShow: false
        };
    }

    changeHandler = e => {
        let title;
        let xLabel;
        // let unit;
        let dayOfWeek = moment().format("e");
        switch (e.target.value) {
            case "today":
                title = `${moment().format("[Day of] MMMM Do")}`;
                xLabel = "Hour";
                // unit = "day";
                break;
            case "yesterday":
                title = `${moment()
                    .subtract(1, "days")
                    .format("[Day of] MMMM Do")}`;
                xLabel = "Hour";
                // unit = "day";
                break;
            case "week":
                title = `
                    ${moment()
                        .subtract(dayOfWeek, "days")
                        .format("[Week of] MMMM Do")}`;
                xLabel = "Day of Week";
                // unit = "week";
                break;
            case "month":
                title = `${moment().format("[Month of] MMMM")}`;
                xLabel = "Day of Month";
                // unit = "month";
                break;
            default:
                title = `${moment().format("[Year of] YYYY")}`;
                xLabel = "Month";
            // unit = "year";
        }
        this.setState({ filter: e.target.value, title, xLabel });
    };

    toggleChart = e => {
        let shown;
        let unshown;
        switch (e.target.className.split(" ")[0]) {
            case "pie":
                shown = "pieChartShow";
                unshown = "barChartShow";
                break;
            case "bar":
                shown = "barChartShow";
                unshown = "pieChartShow";
                break;
            default:
                shown = "pieChartShow";
                unshown = "barChartShow";
        }
        this.setState({ [shown]: true, [unshown]: false });
    };

    getData = async filter => {
        const pie = await axios.get(
            `/api/marks?user_id=${this.props.user.user_id}&filter=${filter}&type=pie`
        );
        // Data for pie chart does not need extra formatting
        this.setState({ pieData: pie.data });
        const bar = await axios.get(
            `/api/marks?user_id=${this.props.user.user_id}&filter=${filter}&type=bar`
        );
        // Data for bar chart does need extra formatting
        this.formatData(bar.data, filter);
    };

    formatData = (data, filter) => {
        const dow = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        // Extra formatting for bar chart
        let tmpData = [];
        let tmpLabels = [];
        for (let i = 0; i < data.length; i++) {
            let tmpArr = [];
            for (let j = 0; j < data[i].length; j++) {
                tmpArr.push(parseInt(data[i][j].y));
            }
            tmpData.push(tmpArr);
        }
        for (let i = 0; i < data[0].length; i++) {
            switch (filter) {
                case "today":
                case "yesterday":
                    tmpLabels.push(data[0][i].t + ":00");
                    break;
                case "week":
                    tmpLabels.push(dow[data[0][i].t]);
                    break;
                default:
                    tmpLabels.push(data[0][i].t.toString());
            }
        }
        this.setState({ barData: tmpData, barLabels: tmpLabels });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.user_id !== this.props.user.user_id) {
            this.getData(this.state.filter);
        }
        if (prevState.filter !== this.state.filter) {
            this.getData(this.state.filter);
        }
    }

    componentDidMount() {
        if (this.props.user.user_id) {
            this.getData(this.state.filter);
        }
    }

    render() {
        const { pieData, barData, barLabels } = this.state;
        const pieOptions = { legend: { display: false } };
        const pieChartData = {
            labels: ["Bad", "Not Good", "OK", "Good", "Great"],
            datasets: [
                {
                    data: pieData,
                    backgroundColor: [
                        "rgb(227, 49, 51)",
                        "rgb(240, 116, 58)",
                        "rgb(255, 190, 58)",
                        "rgb(151, 187, 61)",
                        "rgb(67, 184, 63)"
                    ],
                    hoverBackgroundColor: [
                        "rgba(227, 49, 51, 0.8)",
                        "rgba(240, 116, 58, 0.8)",
                        "rgba(255, 190, 58, 0.8)",
                        "rgba(151, 187, 61, 0.8)",
                        "rgba(67, 184, 63, 0.8)"
                    ]
                }
            ]
        };
        const barOptions = {
            title: { text: this.state.title, display: false },
            legend: { display: false },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: this.state.xLabel
                        }
                        // type: "time",
                        // time: {
                        //     unit: this.state.unit,
                        //     displayFormats: {
                        //         month: "Do",
                        //         year: "MM",
                        //         week: "ddd",
                        //         day: "HH[:00]"
                        //     }
                        // }
                    }
                ],
                yAxes: [
                    {
                        stacked: true,
                        ticks: { stepSize: 1, beginAtZero: true },
                        scaleLabel: { display: true, labelString: "Frequency" }
                    }
                ]
            }
        };

        const barChartData = {
            labels: barLabels,
            datasets: [
                {
                    label: "Bad",
                    backgroundColor: "rgb(227, 49, 51)",
                    hoverBackgroundColor: "rgba(227, 49, 51, 0.8)",
                    data: barData[0]
                },
                {
                    label: "Not good",
                    backgroundColor: "rgb(240, 116, 58)",
                    hoverBackgroundColor: "rgba(240, 116, 58, 0.8)",
                    data: barData[1]
                },
                {
                    label: "OK",
                    backgroundColor: "rgb(255, 190, 58)",
                    hoverBackgroundColor: "rgba(255, 190, 58, 0.8)",
                    data: barData[2]
                },
                {
                    label: "Good",
                    backgroundColor: "rgb(151, 187, 61)",
                    hoverBackgroundColor: "rgba(151, 187, 61, 0.8)",
                    data: barData[3]
                },
                {
                    label: "Great",
                    backgroundColor: "rgb(67, 184, 63)",
                    hoverBackgroundColor: "rgba(67, 184, 63, 0.8)",
                    data: barData[4]
                }
            ]
        };
        return (
            <main className="Data">
                {this.props.loggedIn ? (
                    <div>
                        <div className="title">
                            <h1>View your data</h1>
                        </div>
                        <div className="data-container">
                            <div className="select-container">
                                <select
                                    value={this.state.filter}
                                    onChange={this.changeHandler}
                                >
                                    <option value="today">Today</option>
                                    <option value="yesterday">Yesterday</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                                <h1>{this.state.title}</h1>
                            </div>
                            <div className="button-container">
                                <div
                                    className="pie selector"
                                    id={
                                        this.state.pieChartShow
                                            ? "selected"
                                            : "unselected"
                                    }
                                    onClick={this.toggleChart}
                                >
                                    Pie
                                </div>
                                <div
                                    className="bar selector"
                                    id={
                                        this.state.barChartShow
                                            ? "selected"
                                            : "unselected"
                                    }
                                    onClick={this.toggleChart}
                                >
                                    Bar
                                </div>
                            </div>
                            <div
                                className="chart-container"
                                id={
                                    this.state.pieChartShow
                                        ? "pie-container"
                                        : "no-show"
                                }
                            >
                                <Pie options={pieOptions} data={pieChartData} />
                            </div>
                            <div
                                className="chart-container"
                                id={
                                    this.state.barChartShow
                                        ? "bar-container"
                                        : "no-show"
                                }
                            >
                                <Bar options={barOptions} data={barChartData} />
                            </div>
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
export default connect(mapStateToProps)(Data);
