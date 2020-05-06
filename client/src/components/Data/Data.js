import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
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
  const [showPie, setShowPie] = React.useState(true);
  const [pieData, setPieData] = React.useState([]);
  const [barData, setBarData] = React.useState([]);

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
      const { pieMarks, barMarks } = formatData(data.marks);
      setPieData(pieMarks);
      setBarData(barMarks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="Data">
      <div>
        <div className="title">
          <h1>View your data</h1>
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
              onClick={() => setShowPie(true)}
            >
              Pie
            </div>
            <div
              className="bar selector"
              id={showPie ? "unselected" : "selected"}
              onClick={() => setShowPie(false)}
            >
              Bar
            </div>
          </div>
          {showPie ? (
            <PieChart moods={props.moods} pieData={pieData} />
          ) : (
            <BarChart moods={props.moods} barData={barData} />
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

const BarChart = ({ moods, barData }) => {
  const barOptions = {
    legend: { display: false },
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: {
            // display: true
            // labelString: this.state.xLabel
          }
          // type: "time",
          // time: {
          //     unit: this.state.unit,
          //     displayFormats: {
          //         month: "Do",
          //         year: "MM",
          //         week: "ddd",
          //         day: "HH[:00]"
          //     }
          // }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: { stepSize: 1, beginAtZero: true },
          scaleLabel: { display: true, labelString: "Frequency" }
        }
      ]
    }
  };

  const barChartData = {
    // labels: barLabels,
    datasets: [
      {
        label: "Bad",
        backgroundColor: "rgb(227, 49, 51)",
        hoverBackgroundColor: "rgba(227, 49, 51, 0.8)",
        data: barData[0]
      },
      {
        label: "Not good",
        backgroundColor: "rgb(240, 116, 58)",
        hoverBackgroundColor: "rgba(240, 116, 58, 0.8)",
        data: barData[1]
      },
      {
        label: "OK",
        backgroundColor: "rgb(255, 190, 58)",
        hoverBackgroundColor: "rgba(255, 190, 58, 0.8)",
        data: barData[2]
      },
      {
        label: "Good",
        backgroundColor: "rgb(151, 187, 61)",
        hoverBackgroundColor: "rgba(151, 187, 61, 0.8)",
        data: barData[3]
      },
      {
        label: "Great",
        backgroundColor: "rgb(67, 184, 63)",
        hoverBackgroundColor: "rgba(67, 184, 63, 0.8)",
        data: barData[4]
      }
    ]
  };

  return <Bar options={barOptions} data={barChartData} />;
};
