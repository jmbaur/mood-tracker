import React from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";
import formatData from "../../utils/formatData.js";

const LineGraph = ({ moods, newMark, start, end }) => {
  const [lineLabels, setLineLabels] = React.useState([]);
  const [lineComments, setLineComments] = React.useState([]);
  const [lineData, setLineData] = React.useState([]);
  const [scale, setScale] = React.useState("hour");

  const fetchData = React.useCallback(async () => {
    const res = await axios({
      method: "get",
      url: `/api/marks?start=${start}&end=${end}`
    });
    const { marks } = res.data;
    if (marks) {
      const { lineMarks } = formatData(marks);
      setLineLabels(marks.map(el => el.time));
      setLineComments(marks.map(el => el.comment));
      setLineData(lineMarks);
    }
  }, [start, end]);

  React.useEffect(() => {
    if (!newMark) {
      fetchData();
    }
  }, [fetchData, newMark, start, end]);

  React.useEffect(() => {
    if (!lineData.length) return;
    const first = lineData[0].t;
    const last = lineData[lineData.length - 1].t;

    if (moment(last).format("DDD") === moment(first).format("DDD")) {
      if (moment(last).format("mm") === moment(first).format("mm")) {
        setScale("second");
      } else if (moment(last).format("H") === moment(first).format("H")) {
        setScale("minute");
      } else setScale("hour");
    } else {
      if (moment(last).format("w") === moment(first).format("w")) {
        setScale("day");
      } else if (moment(last).format("M") === moment(first).format("M")) {
        setScale("week");
      } else if (moment(last).format("YYYY") === moment(first).format("YYYY")) {
        setScale("month");
      }
    }
  }, [lineData]);

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
            unit: scale,
            stepSize: 1,
            tooltipFormat: "MMM D h:MM A"
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
                borderColor: moods[4].color,
                backgroundColor: moods[4].color
              };
            case "4":
              return {
                borderColor: moods[3].color,
                backgroundColor: moods[3].color
              };
            case "3":
              return {
                borderColor: moods[2].color,
                backgroundColor: moods[2].color
              };
            case "2":
              return {
                borderColor: moods[1].color,
                backgroundColor: moods[1].color
              };
            case "1":
              return {
                borderColor: moods[0].color,
                backgroundColor: moods[0].color
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

  return <Line options={options} data={data} />;
};

export default LineGraph;
