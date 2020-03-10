import React from "react";
import axios from "axios";
import moment from 'moment'
import { connect } from "react-redux";
import "./Grid.css";

function Grid(props) {
    const [data, setData] = React.useState([]);
    const [showDetails, setShowDetails] = React.useState(false);
    const [recent, setRecent] = React.useState("");

    const getDetailData = async (doy, year) => {
        const res = await axios.get(
            `/api/marks?user_id=${props.user.user_id}&type=grid&filter=detail&doy=${doy}&year=${year}`
        );
        if (this.state.recentView !== doy) {
            setShowDetails(true);
            this.setState({ recentView: doy, detailData: res.data });
        } else {
            setShowDetails(false);
        }
    };

    const getData = async () => {
        const { user_id } = props.user;
        const type = "grid";
        const res = await axios.get(
            `/api/marks?user_id=${user_id}&type=${type}`
        );
        formatData(res.data);
    };

    const formatData = data => {
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
                    .format("ddd MMM DD"),
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

        setData(tmpArr.reverse());
    };

    React.useEffect(() => {
        getData();
    }, [data]);

    const colors = [
        "rgb(227,49,51)",
        "rgb(240,116,58)",
        "rgb(255,190,58)",
        "rgb(151,187,61)",
        "rgb(67,184,63)"
    ];

    const grid = data.map(el => {
        const date = new Date(el.fullDate);
        return (
            <div key={el.date} className="grid-element">
                {el.mood ? (
                    <div
                        className="color-block"
                        onClick={() =>
                            {/* viewDetails(el.date, date.getFullYear()) */}
                        }
                        style={{
                            backgroundColor:
                                colors[Math.floor(el.mood / el.count)]
                        }}
                    >
                        <span className="tooltip">
                            <em>{el.count} marks</em> {el.fullDate}
                        </span>
                    </div>
                ) : (
                    <div className="color-block">
                        <span className="tooltip">
                            <em>0 marks </em>
                            {el.fullDate}
                        </span>
                    </div>
                )}
            </div>
        );
    });

    return <div className="Grid">{grid}</div>;
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Grid);
