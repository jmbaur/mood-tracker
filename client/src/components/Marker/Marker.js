import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { setTitleColor } from "../../redux/reducer.js";
import LineGraph from "../LineGraph/LineGraph.js";
import Comment from "../Comment/Comment.js";
import "./Marker.css";

function Marker(props) {
  const [comment, setComment] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [recentMark, setRecentMark] = React.useState("");

  const setMood = number => {
    const index = props.moods.findIndex(mood => mood.number === number);
    setComment(true);
    setMessage(props.moods[index]?.name);
    setTitle(number);
    addMark({
      time: moment().format(),
      number
    });
  };

  const setTitle = number => {
    const defaultColors = [
      "#e33133",
      "#f0743a",
      "#ffbd3a",
      "#97bb3d",
      "#43b83f"
    ];
    props.setTitleColor(defaultColors[number - 1]);
  };

  const addMark = async mark => {
    const res = await axios({
      method: "post",
      url: "/api/marks",
      data: mark
    });
    setRecentMark(res.data.id);
  };

  return (
    <div className="Marker">
      <div className="title">
        <h1>Mark your mood!</h1>
      </div>
      {comment ? (
        <Comment
          message={message}
          toggleComment={() => setComment(false)}
          recentMark={recentMark}
        />
      ) : null}
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
        <LineGraph
          moods={props.moods}
          start={moment()
            .startOf("day")
            .toISOString()}
          end={moment()
            .endOf("day")
            .toISOString()}
          newMark={comment}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setTitleColor
};

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
