import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/reducer.js";
import EditText from "../EditText/EditText.js";
import Warning from "../Warning/Warning.js";
import "./Settings.css";

function Settings(props) {
  const [warning, setWarning] = React.useState(false);
  const [eMoods, setMoods] = React.useState(props.moods || []);

  const { moods } = props;
  React.useEffect(() => {
    if (moods.length) setMoods(moods);
  }, [moods]);

  const deleteAccount = async () => {
    const res = await axios({ method: "delete", url: "/auth/account" });

    if (res.status === 200) {
      props.logout();
      props.history.push("/");
      alert(res.data);
    }
  };

  const changeMoodName = (number, name) => {
    let tmp = eMoods.slice();
    const index = tmp.findIndex(el => el.number === number);
    tmp[index].name = name;
    setMoods(tmp);

    const { color } = tmp[index];
    axios({
      method: "post",
      url: "/api/moods",
      data: { number, name, color }
    });
  };

  const changeColor = (e, index) => {
    let tmp = eMoods.slice();
    tmp[index].color = e.target.value;
    setMoods(tmp);

    const { number, name } = tmp[index];
    axios({
      method: "post",
      url: "/api/moods",
      data: { number, color: e.target.value, name }
    });
  };

  // Mapped input fields
  const mappedInputs = eMoods.map((mood, i) => {
    return (
      <div key={i}>
        <input
          type="color"
          name="color"
          value={mood.color}
          onChange={e => changeColor(e, i)}
        />
        <EditText
          number={mood.number}
          input={mood.name}
          changeMoodName={changeMoodName}
        />
      </div>
    );
  });

  return (
    <main className="Settings">
      <div>
        <div className="title">
          <h1>User settings</h1>
        </div>
        <div className="mood-name-container">
          <h1>Change the message that appears when you mark your moods!</h1>
          {mappedInputs}
        </div>
        <div className="settings-button-container">
          <button
            className="delete-account-button"
            onClick={() => setWarning(!warning)}
          >
            Delete Account
          </button>
          {warning ? (
            <Warning fn1={() => setWarning(!warning)} fn2={deleteAccount} />
          ) : null}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
