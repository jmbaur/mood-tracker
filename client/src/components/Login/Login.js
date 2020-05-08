import React from "react";
import { connect } from "react-redux";
import useInput from "../../hooks/useInput.js";
import { setUser } from "../../redux/reducer.js";
import "./Login.css";

function Login(props) {
  const [username, bindUsername, resetUsername] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");

  const submit = e => {
    e.preventDefault();
    if (!password) {
      alert("Password is empty.");
      return;
    }
    resetUsername() && resetPassword();
    props.setUser({ username: username.toLowerCase(), password });
    props.history.push("/");
  };

  return (
    <main className="Login">
      <div className="title">
        <h1>Login Here</h1>
      </div>
      <form onSubmit={submit} className="login-form">
        <div className="input-fields">
          <label>
            Username
            <input autoFocus type="text" name="username" {...bindUsername} />
          </label>
          <label>
            Password
            <input type="password" name="password" {...bindPassword} />
          </label>
        </div>
        <div className="form-button-container">
          <button type="submit" className="submit-button">
            Login
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
