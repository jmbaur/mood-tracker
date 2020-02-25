import React from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import "./Chart.css";

class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValue: "all",
            frequency: [0, 0, 0, 0, 0]
        };
    }

    formatData = () => {
        // today's date
        const date = new Date(Date.now());
        const today = date.getDate();
        const yesterday = date.getDate() - 1;
        const dayOfWeek = date.getDay();
        let week = [];
        for (let i = 0; i < dayOfWeek; i++) {
            week.push(today - i);
        }
        const realMonth = date.getMonth();

        const { marks } = this.props.mood;
        const { frequency, selectedValue } = this.state;
        let arr = [];
        switch (selectedValue) {
            case "today":
                frequency.forEach((elem, i) => {
                    let f = marks.filter(m => {
                        let day = new Date(m.time);
                        return day.getDate() === today
                            ? m.mood === i + 1
                            : null;
                    }).length;
                    arr.push(f);
                });
                break;
            case "yesterday":
                frequency.forEach((elem, i) => {
                    let f = marks.filter(m => {
                        let day = new Date(m.time);
                        return day.getDate() === yesterday
                            ? m.mood === i + 1
                            : null;
                    }).length;
                    arr.push(f);
                });
                break;
            case "week":
                frequency.forEach((elem, i) => {
                    let f = marks.filter(m => {
                        let day = new Date(m.time);
                        return week.includes(day.getDate())
                            ? m.mood === i + 1
                            : null;
                    }).length;
                    arr.push(f);
                });
                break;
            case "month":
                frequency.forEach((elem, i) => {
                    let f = marks.filter(m => {
                        let month = new Date(m.time);
                        return month.getMonth() === realMonth
                            ? m.mood === i + 1
                            : null;
                    }).length;
                    arr.push(f);
                });
                break;
            default:
                frequency.forEach((elem, i) => {
                    let f = marks.filter(m => m.mood === i + 1).length;
                    arr.push(f);
                });
        }
        this.setState({ frequency: arr });
    };

    changeHandler = e => {
        this.setState({ selectedValue: e.target.value });
    };

    componentDidMount() {
        this.formatData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedValue !== this.state.selectedValue)
            this.formatData();
    }

    render() {
        const { selectedValue } = this.state;
        console.log(this.props.mood);
        const doughnutData = {
            labels: ["Bad", "Not Great", "OK", "Good", "Great"],
            datasets: [
                {
                    data: this.state.frequency,
                    backgroundColor: [
                        "rgb(227, 49, 51)",
                        "rgb(240, 116, 58)",
                        "rgb(255, 190, 58)",
                        "rgb(151, 187, 61)",
                        "rgb(67, 184, 63)"
                    ],
                    hoverBackgroundColor: [
                        "rgb(227, 49, 51)",
                        "rgb(240, 116, 58)",
                        "rgb(255, 190, 58)",
                        "rgb(151, 187, 61)",
                        "rgb(67, 184, 63)"
                    ]
                }
            ]
        };
        const doughnutOptions = {
            legend: { display: false }
        };

        return (
            <div className="Chart">
                <h1>{this.props.user.user.username}'s Data</h1>
                <select value={selectedValue} onChange={this.changeHandler}>
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>

                <Doughnut options={doughnutOptions} data={doughnutData} />
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

export default connect(mapStateToProps)(Chart);
