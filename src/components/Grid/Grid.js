import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import "./Grid.css";

function Grid(props) {
    const [data, setData] = React.useState([]);

    const formatData = data => {
        let arr = [84, 85, 86, 87, 88, 89, 90];
        let dow = moment().format("e");
        let tmpArr = new Array(arr[dow]);
        for (let i = 0; i < arr[+dow]; i++) {
            tmpArr[i] = {
                date: +moment()
                    .subtract(i, "days")
                    .format("DDD"),
                viewDate: moment()
                    .subtract(i, "days")
                    .format("ddd MMM DD"),
                fullDate: moment()
                    .subtract(i, "days")
                    .format(),
                mood: 0,
                count: 0
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
        axios
            .get(`/api/marks?user_id=${props.user.user_id}&type=grid`)
            .then(res => {
                formatData(res.data);
            });
    }, [props.user.user_id]);

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
                        onClick={() => {
                            props.toggleDetails(el.date, date.getFullYear());
                        }}
                        style={{
                            backgroundColor:
                                colors[Math.round(el.mood / el.count) - 1]
                        }}
                    >
                        <span className="tooltip">
                            <em>{el.count} mark(s)</em> {el.viewDate}
                        </span>
                    </div>
                ) : (
                    <div className="color-block">
                        <span className="tooltip">
                            <em>0 marks </em>
                            {el.viewDate}
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
