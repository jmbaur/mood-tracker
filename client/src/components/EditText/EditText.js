import React from "react";

function EditText(props) {
  const [input, setInput] = React.useState(props.input);

  const handleChange = e => setInput(e.target.value);

  return (
    <input
      type="text"
      name="input"
      placeholder="optional"
      value={input}
      onChange={handleChange}
      onBlur={() => props.changeMoodName(props.number, input)}
    />
  );
}

export default EditText;
