import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import { setTitleColor } from "../../redux/reducer.js";
import Comment from "../Comment/Comment.js";
import "./Marker.css";

function Marker(props) {
  const [comment, setComment] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [recentMark, setRecentMark] = React.useState("");
  const [lineData, setLineData] = React.useState([]);
  const [lineLabels, setLineLabels] = React.useState([]);
  const [lineComments, setLineComments] = React.useState([]);

  const setMood = num => {
    const index = props.moods.findIndex(mood => mood.num === num);
    setComment(true);
    setMessage(props.moods[index]?.name);
    setTitle(num);
    addMark({
      time: moment().format(),
      number: num
    });
  };

  const setTitle = num => {
    const defaultColors = [
      "#e33133",
      "#f0743a",
      "#ffbd3a",
      "#97bb3d",
      "#43b83f"
    ];
    props.setTitleColor(defaultColors[num - 1]);
  };

  const addMark = async mark => {
    const res = await axios({
      method: "post",
      url: "/api/marks",
      data: mark
    });
    setRecentMark(res.data.id);
  };

  const getLineData = async () => {
    const start = moment()
      .startOf("day")
      .toISOString();
    const end = moment()
      .endOf("day")
      .toISOString();
    const res = await axios({
      method: "get",
      url: `/api/marks?start=${start}&end=${end}`
    });
    const { marks } = res.data;
    if (marks) {
      setLineLabels(marks.map(el => el.time));
      setLineComments(marks.map(el => el.comment));
      setLineData(
        marks.map(el => {
          return { t: el.time, y: el.number };
        })
      );
    }
  };

  const toggleComment = () => {
    setComment(false);
  };

  React.useEffect(() => {
    getLineData();
  }, [recentMark, comment]);

  const options = {
    title: { display: true, text: "Today" },
    // layout: { padding: {left:10, right: 10} },
    layout: { padding: 10 },
    legend: false,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
          time: {
            unit: "hour",
            stepSize: 1,
            tooltipFormat: "HH:mm:ss"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: tooltipItem => tooltipItem.value,
        afterLabel: tooltipItem => lineComments[tooltipItem.index],
        labelColor: tooltipItem => {
          switch (tooltipItem.value) {
            case "5":
              return {
                borderColor: props.moods[4].color,
                backgroundColor: props.moods[4].color
              };
            case "4":
              return {
                borderColor: props.moods[3].color,
                backgroundColor: props.moods[3].color
              };
            case "3":
              return {
                borderColor: props.moods[2].color,
                backgroundColor: props.moods[2].color
              };
            case "2":
              return {
                borderColor: props.moods[1].color,
                backgroundColor: props.moods[1].color
              };
            case "1":
              return {
                borderColor: props.moods[0].color,
                backgroundColor: props.moods[0].color
              };
            default:
              return {
                borderColor: "rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              };
          }
        }
      }
    }
  };

  const data = {
    type: "line",
    labels: lineLabels,
    datasets: [
      {
        label: "Today's Moods",
        fill: false,
        lineTension: 0.05,
        backgroundColor: "rgba(100, 100, 100,0.5)",
        borderColor: "rgba(100,100,100, 0.5)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(255,0,255)",
        pointBackgroundColor: "rgb(255,0,255)",
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: "rgb(255,0,255)",
        pointHoverBorderColor: "rgb(255,0,255)",
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        data: lineData
      }
    ]
  };

  return (
    <div className="Marker">
      <div className="title">
        <h1>Mark your mood!</h1>
      </div>
      {comment ? (
        <Comment
          message={message}
          toggleComment={toggleComment}
          recentMark={recentMark}
        />
      ) : (
        <div className="no-show"></div>
      )}
      <div className="marker-container">
        <button
          className="one"
          style={{ backgroundColor: props.moods[0]?.color }}
          onClick={() => setMood(1)}
        ></button>
        <button
          className="two"
          style={{ backgroundColor: props.moods[1]?.color }}
          onClick={() => setMood(2)}
        ></button>
        <button
          className="three"
          style={{ backgroundColor: props.moods[2]?.color }}
          onClick={() => setMood(3)}
        ></button>
        <button
          className="four"
          style={{ backgroundColor: props.moods[3]?.color }}
          onClick={() => setMood(4)}
        ></button>
        <button
          className="five"
          style={{ backgroundColor: props.moods[4]?.color }}
          onClick={() => setMood(5)}
        ></button>
      </div>
      <div className="line-chart-container">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setTitleColor
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
