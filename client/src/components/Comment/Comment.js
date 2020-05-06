import React from "react";
import axios from "axios";
import "./Comment.css";

function Comment(props) {
  const [input, setInput] = React.useState("");

  const outsideClick = e => {
    if (e.target.className === "Comment") props.toggleComment();
  };

  const handleChange = e => setInput(e.target.value);

  const submitComment = e => {
    e.preventDefault();
    axios({
      method: "put",
      url: `/api/marks?id=${props.recentMark}`,
      data: { comment: input }
    });
    props.toggleComment();
  };

  return (
    <div className="Comment" onClick={outsideClick}>
      <form onSubmit={submitComment}>
        <h1>{props.message}</h1>
        <label>
          Make a comment!
          <input
            autoFocus
            type="text"
            name="input"
            value={input}
            placeholder="optional"
            onChange={handleChange}
          />
        </label>
        <div className="buttons-container">
          <button type="button" onClick={props.toggleComment}>
            No thanks
          </button>
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
