import React from "react";

function EditText(props) {
  const [input, setInput] = React.useState(props.input);

  const handleChange = e => setInput(e.target.value);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.changeMoodName(props.number, input);
      }}
    >
      <input
        type="text"
        name="input"
        placeholder="optional"
        value={input}
        onChange={handleChange}
      />
      {props.input !== input ? <button type="submit">Change</button> : null}
    </form>
  );
}

export default EditText;
