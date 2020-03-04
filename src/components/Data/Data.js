import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Doughnut, Bar } from "react-chartjs-2";

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: "year",
            pieData: [],
            barData: [],
            barLabels: [],
            title: `${moment().format("[Year of] YYYY")}`
        };
    }

    changeHandler = e => {
        let title;
        let dayOfWeek = moment().format("e");
        switch (e.target.value) {
            case "today":
                title = `${moment().format("[Day of] MMMM Do")}`;
                break;
            case "yesterday":
                title = `${moment()
                    .subtract(1, "days")
                    .format("[Day of] MMMM Do")}`;
                break;
            case "week":
                title = `
                    ${moment()
                        .subtract(dayOfWeek, "days")
                        .format("[Week of] MMMM Do")}`;
                break;
            case "month":
                title = `${moment().format("[Month of] MMMM")}`;
                break;
            default:
                title = `${moment().format("[Year of] YYYY")}`;
        }
        console.log(dayOfWeek);
        this.setState({ filter: e.target.value, title: title });
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
        this.formatData(bar.data);
    };

    formatData = data => {
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
            tmpLabels.push(data[0][i].t);
        }
        // console.log(tmpData, tmpLabels);
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
                        stacked: true
                        // type: "time",
                        // time: {
                        //     unit: "month",
                        //     displayFormats: { month: "MMMM" }
                        // }
                    }
                ],
                yAxes: [
                    { stacked: true, ticks: { stepSize: 1, beginAtZero: true } }
                ]
            }
        };

        const barChartData = {
            labels: barLabels,
            datasets: [
                {
                    label: "Bad",
                    backgroundColor: "rgba(227, 49, 51, 0.8)",
                    data: barData[0]
                },
                {
                    label: "Not good",
                    backgroundColor: "rgba(240, 116, 58, 0.8)",
                    data: barData[1]
                },
                {
                    label: "OK",
                    backgroundColor: "rgba(255, 190, 58, 0.8)",
                    data: barData[2]
                },
                {
                    label: "Good",
                    backgroundColor: "rgba(151, 187, 61, 0.8)",
                    data: barData[3]
                },
                {
                    label: "Great",
                    backgroundColor: "rgba(67,184,63,0.5)",
                    data: barData[4]
                }
            ]
        };
        return (
            <div className="Data">
                <select value={this.state.filter} onChange={this.changeHandler}>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
                <h1>{this.state.title}</h1>
                <Doughnut options={pieOptions} data={pieChartData} />
                <Bar options={barOptions} data={barChartData} />
            </div>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Data);
