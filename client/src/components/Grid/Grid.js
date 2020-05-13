import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import formatGrid from "../../utils/formatGrid.js";
import "./Grid.css";

function Grid(props) {
  const [gridData, setGridData] = React.useState([]);

  const { moods, data, detailData } = props;

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
    const dataChange = !!data.length || !!detailData.length;
    if (moods.length && dataChange) setGridData(formatGrid(data, moods));
  }, [data, detailData, moods]);

  const grid = gridData.map((el, i) => {
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
