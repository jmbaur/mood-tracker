import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import Grid from "../Grid/Grid.js";
import Protected from "../Protected/Protected.js";
import "./Data.css";

class Data extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            viewDetails: false,
            recentView: "",
            detailData: []
        };
    }

    toggleDetails = status => {
        this.setState({ viewDetails: status || !this.state.viewDetails });
    };

    getDetailData = async date => {
        console.log(date);
        const res = await axios.get(
            `/api/marks?user_id=${this.props.user.user_id}&type=grid&filter=detail&date=${date}`
        );
        console.log(res);
        if (this.state.recentView !== date) {
            this.toggleDetails(true);
            this.setState({ recentView: date, detailData: res.data });
        } else {
            this.toggleDetails();
        }
    };

    getData = async () => {
        const { user_id } = this.props.user;
        const type = "grid";
        const res = await axios.get(
            `/api/marks?user_id=${user_id}&type=${type}`
        );
        this.formatData(res.data);
    };

    formatData = data => {
        let arr = [84, 85, 86, 87, 88, 89, 90];
        let dow = moment().format("e");
        let tmpArr = new Array(arr[dow]);
        for (let i = 0; i < arr[+dow]; i++) {
            tmpArr[i] = {
                date: +moment()
                    .subtract(i, "days")
                    .format("DDD"),
                fullDate: moment()
                    .subtract(i, "days")
                    .format("MMM DD, YYYY"),
                mood: 0,
                count: 1
            };
        }

        for (let i = 0; i < data.length; i++) {
            let date = moment(data[i].time).format("DDD");
            let index = tmpArr.findIndex(el => el.date === +date);
            if (index !== -1) {
                tmpArr[index].mood += data[i].mood;
                tmpArr[index].count++;
            }
        }
        console.log(tmpArr.reverse());

        this.setState({ data: tmpArr });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.user_id !== this.props.user.user_id) {
            this.getData();
        }
        if (prevState.filter !== this.state.filter) {
            this.getData();
        }
    }

    componentDidMount() {
        if (this.props.user.user_id) {
            this.getData();
        }
    }

    render() {
        const { data, viewDetails, recentView } = this.state;
        console.log(recentView);

        return (
            <main className="Data">
                {this.props.loggedIn ? (
                    <div>
                        <div className="title">
                            <h1>View your data</h1>
                        </div>
                        <div className="data-container">
                            <Grid
                                data={data}
                                viewDetails={this.getDetailData}
                            />
                        </div>
                        <div className="detail-container">
                            {viewDetails ? (
                                <div className="detail-content">
                                    Detail Data
                                </div>
                            ) : null}
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
