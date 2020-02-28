import React from "react";
import { connect } from "react-redux";
import Chart from "../Chart/Chart.js";

class Data extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        // this.props.getMarks(this.props.user.user_id);
    }
    render() {
        return (
            <div className="Data">
                <Chart />
            </div>
        );
    }
}

const mapStateToProps = state => state
;

export default connect(mapStateToProps)(Data);
