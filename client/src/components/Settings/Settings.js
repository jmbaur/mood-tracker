import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/reducer.js";
import EditText from "../EditText/EditText.js";
import Warning from "../Warning/Warning.js";
import "./Settings.css";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      moods: [],
      warning: false
    };
  }

  getMoods = async () => {
    const res = await axios.get(`/api/moods`);
    const moods = res.data.moods;
    moods.sort((a, b) => a.number - b.number);

    const defaultColors = [
      "#e33133",
      "#f0743a",
      "#ffbd3a",
      "#97bb3d",
      "#43b83f"
    ];
    let tmpArr = moods.slice();
    let i = 0;
    while (i < 5) {
      if (tmpArr[i]?.number !== i + 1) {
        tmpArr.splice(i, 0, {
          number: i + 1,
          name: "",
          color: defaultColors[i],
          editable: false
        });
      } else if (tmpArr[i].name) {
        tmpArr[i].editable = true;
      }
      i++;
    }
    this.setState({ moods: tmpArr });
  };

  toggleWarning = () => {
    this.setState({ warning: !this.state.warning });
  };

  deleteAccount = async () => {
    const status = await axios({ method: "delete", url: "/auth/account" });

    if (status.data === "OK") {
      this.props.logout();
      this.props.history.push("/");
      alert("User account has been deleted.");
    }
  };

  addNewMood = number => {
    let tmp = this.state.moods.slice();
    tmp[number - 1].editable = true;
    tmp[number - 1].name = "";
    this.setState(tmp);
  };

  changeMoodName = (number, name) => {
    let tmp = this.state.moods.slice();
    const index = tmp.findIndex(el => el.number === number);
    tmp[index].name = name;
    this.setState(tmp);

    const { color } = tmp[index];
    axios({
      method: "post",
      url: "/api/moods",
      data: { number, name, color }
    });
  };

  changeColor = (e, index) => {
    let tmp = this.state.moods.slice();
    tmp[index].color = e.target.value;
    this.setState(tmp);

    const { number, name } = tmp[index];
    axios({
      method: "post",
      url: "/api/moods",
      data: { number, color: e.target.value, name }
    });
  };

  clear = number => {
    let tmp = this.state.moods.slice();
    let index = tmp.findIndex(el => el.number === number);
    tmp[index].editable = false;
    this.setState(tmp);
    if (tmp[index].name) {
      axios({
        url: `/api/moods?number=${number}`,
        method: "delete"
      });
    }
  };

  componentDidMount() {
    this.getMoods();
  }

  render() {
    const { moods } = this.state;
    const mappedInputs = moods.map((mood, i) => {
      return (
        <div key={i}>
          <input
            type="color"
            name="color"
            value={mood.color}
            onChange={e => this.changeColor(e, i)}
          />
          {mood.editable ? (
            <>
              <EditText
                number={mood.number}
                input={mood.name}
                changeMoodName={this.changeMoodName}
              />
              <button onClick={() => this.clear(mood.number)}>Delete</button>
            </>
          ) : (
            <button onClick={() => this.addNewMood(mood.number)}>Add</button>
          )}
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
              onClick={this.toggleWarning}
            >
              Delete Account
            </button>
            {this.state.warning ? (
              <Warning fn1={this.toggleWarning} fn2={this.deleteAccount} />
            ) : null}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  logout
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
