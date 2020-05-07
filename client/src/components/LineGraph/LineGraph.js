import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import formatData from "../../utils/formatData.js";

const LineGraph = ({ moods, newMark, start, end }) => {
  const [lineLabels, setLineLabels] = React.useState([]);
  const [lineComments, setLineComments] = React.useState([]);
  const [lineData, setLineData] = React.useState([]);

  const fetchData = async () => {
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
  };

  React.useEffect(() => {
    if (!newMark) {
      fetchData();
    }
  }, [newMark, start, end]);

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
