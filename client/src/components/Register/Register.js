import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer.js";
import useInput from "../../hooks/useInput.js";
import "./Register.css";

function Register(props) {
  const [username, bindUsername, resetUsername] = useInput("");
  const [password0, bindPassword0, resetPassword0] = useInput("");
  const [password1, bindPassword1, resetPassword1] = useInput("");

  const submit = async e => {
    e.preventDefault();
    if (password0 !== password1 || !password0) {
      alert("Passwords do not match");
    } else if (password0.length < 6) {
      alert("Password must be at least 6 characters");
      resetPassword0();
      resetPassword1();
    } else if (!username) {
      alert("Fill in username");
    } else {
      try {
        // register the user
        await axios({
          method: "post",
          url: "/auth/register",
          data: {
            username: username.toLowerCase(),
            password: password0
          }
        });
        // log them in if registering succeeds
        props.setUser({ username, password: password0 });
        resetUsername() && resetPassword0() && resetPassword1();
        props.history.push("/");
      } catch (err) {
        resetUsername();
        alert("User with this username already exists");
      }
    }
  };

  return (
    <main className="Register">
      <div className="title">
        <h1>Register Here</h1>
      </div>
      <form onSubmit={submit} className="register-form">
        <div className="input-fields">
          <label>
            Username
            <input autoFocus type="text" name="username" {...bindUsername} />
          </label>
          <label>
            Password
            <input type="password" name="password0" {...bindPassword0} />
          </label>
          <label>
            Confirm Password
            <input type="password" name="password1" {...bindPassword1} />
          </label>
        </div>
        <div className="form-buttons-container">
          <button type="submit" className="submit-button">
            Register
          </button>
        </div>
      </form>
    </main>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
