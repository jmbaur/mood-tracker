import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import LineGraph from "../LineGraph/LineGraph.js";
import formatData from "../../utils/formatData.js";
import "./Data.css";

function Data(props) {
  const [start, setStart] = React.useState(
    moment()
      .startOf("day")
      .toISOString()
      .slice(0, 10)
  );
  const [end, setEnd] = React.useState(
    moment()
      .endOf("day")
      .toISOString()
      .slice(0, 10)
  );
  const [showPie, setShowPie] = React.useState(
    !!localStorage.getItem("showPie") ? false : true
  );
  const [pieData, setPieData] = React.useState([]);

  React.useEffect(() => {
    getData(
      moment(start)
        .startOf("day")
        .toISOString(),
      moment(end)
        .endOf("day")
        .toISOString()
    );
  }, [start, end]);

  const handleChange = e => {
    switch (e.target.name) {
      case "start":
        setStart(e.target.value);
        break;
      case "end":
        setEnd(e.target.value);
        break;
      default:
        throw new Error();
    }
  };

  const getData = async (start, end) => {
    let url;
    if (start && end) {
      url = `/api/marks?start=${start}&end=${end}`;
    } else if (start && !end) {
      url = `/api/marks?start=${start}`;
    } else if (end && !start) {
      url = `/api/marks?end=${end}`;
    } else {
      url = `/api/marks`;
    }
    try {
      const { data } = await axios({
        method: "get",
        url
      });
      const { pieMarks } = formatData(data.marks);
      setPieData(pieMarks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="Data">
      <div>
        <div className="title">
          <h1>Get a closer look at your data</h1>
        </div>
        <div className="data-container">
          <div className="select-container">
            <input
              type="date"
              name="start"
              value={start}
              max={end}
              onChange={handleChange}
            />
            <input
              type="date"
              name="end"
              value={end}
              min={start}
              max={moment()
                .endOf("day")
                .toISOString()
                .slice(0, 10)}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <div
              className="pie selector"
              id={showPie ? "selected" : "unselected"}
              onClick={() => {
                localStorage.setItem("showPie", true);
                setShowPie(true);
              }}
            >
              Pie
            </div>
            <div
              className="bar selector"
              id={showPie ? "unselected" : "selected"}
              onClick={() => {
                localStorage.setItem("showPie", false);
                setShowPie(false);
              }}
            >
              Line
            </div>
          </div>
          {showPie ? (
            <PieChart moods={props.moods} pieData={pieData} />
          ) : (
            <LineGraph
              moods={props.moods}
              start={moment(start).toISOString()}
              end={moment(end).toISOString()}
              newMark={false}
            />
          )}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Data);
///////////////////////////////////////////////////////////////////////////////

const PieChart = ({ moods, pieData }) => {
  const pieOptions = { legend: { display: false } };
  const pieChartData = {
    labels: moods.map(el => el.name),
    datasets: [
      {
        data: pieData,
        backgroundColor: moods.map(el => el.color),
        hoverBackgroundColor: moods.map(el => el.color + "90")
      }
    ]
  };

  return <Pie options={pieOptions} data={pieChartData} />;
};
