import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Chart from "../Chart/Chart.js";

class Data extends React.Component {
    constructor() {
        super();
        this.state = { filter: "all", data: [] };
    }
    changeHandler = e => this.setState({ filter: e.target.value });
    componentDidMount() {
        axios.get(
            `/api/marks?user_id=${this.props.user.user_id}&filter=${this.state.filter}`
        );
    }
    render() {
        return (
            <div className="Data">
                <select value={this.state.filter} onChange={this.changeHandler}>
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
                <Chart />
            </div>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Data);
