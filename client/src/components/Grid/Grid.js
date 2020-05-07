import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import formatGrid from "../../utils/formatGrid.js";
import "./Grid.css";

function Grid(props) {
  const [data, setData] = React.useState([]);

  const { moods } = props;

  const getData = React.useCallback(async () => {
    const daysToGet = 83 + parseInt(moment().format("e"));
    const start = moment()
      .subtract(daysToGet, "days")
      .startOf("day")
      .format();
    const end = moment()
      .endOf("day")
      .format();
    axios.get(`/api/marks?start=${start}&end=${end}`).then(res => {
      setData(formatGrid(res.data.marks, moods, start, end));
    });
  }, [moods]);

  const handleClick = (time, doy) => {
    const start = moment(time)
      .startOf("day")
      .toISOString();
    const end = moment(time)
      .endOf("day")
      .toISOString();
    props.toggleDetails(start, end, doy);
  };

  React.useEffect(() => {
    if (moods.length) getData();
  }, [getData, moods]);

  const grid = data.map((el, i) => {
    return (
      <div key={i} className="grid-element">
        <div
          className="color-block"
          onClick={() => {
            if (el.count) handleClick(el.fullDate, el.doy);
          }}
          style={{
            backgroundColor: el.color
          }}
        >
          <span className="tooltip">
            <em>{el.count === 1 ? `1 mark` : `${el.count} marks`}</em>{" "}
            {el.viewDate}
          </span>
        </div>
      </div>
    );
  });

  return <div className="Grid">{grid}</div>;
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Grid);
