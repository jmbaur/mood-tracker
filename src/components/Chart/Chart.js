import React from "react";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import "./Chart.css";

class Chart extends React.Component {
    constructor() {
        super();
        this.state = {
            frequency: [0, 0, 0, 0, 0]
        };
    }

    formatData = () => {
        const { marks } = this.props.mood;
        const { frequency } = this.state;
        let arr = [];
        frequency.forEach((elem, i) => {
            let f = marks.filter(m => m.mood === i + 1).length;
            arr.push(f);
        });
        this.setState({ frequency: arr });
        // console.log(arr);
    };

    componentDidMount() {
        this.formatData();
    }

    render() {
        // console.log(this.props.mood.marks);
        // console.log(this.state);
        // const data = {
        //     labels: [
        //         "January",
        //         "February",
        //         "March",
        //         "April",
        //         "May",
        //         "June",
        //         "July"
        //     ],
        //     datasets: [
        //         {
        //             label: "My First dataset",
        //             backgroundColor: "rgba(255,99,132,0.2)",
        //             borderColor: "rgba(255,99,132,1)",
        //             borderWidth: 1,
        //             hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //             hoverBorderColor: "rgba(255,99,132,1)",
        //             data: [65, 59, 80, 81, 56, 55, 40]
        //         }
        //     ]
        // };
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

        return (
            <div className="Chart">
                {/* <Bar data={data} /> */}
                <Doughnut data={doughnutData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        mood: state.moodReducer
    };
};

export default connect(mapStateToProps)(Chart);
