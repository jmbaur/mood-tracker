import React from "react";
import { connect } from "react-redux";
import useInput from "../../hooks/useInput.js";
import { setUser } from "../../redux/reducer.js";
import "./Login.css";

function Login(props) {
  const [username, bindUsername, resetUsername] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");
  const [forgot, setForgot] = React.useState(false);

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

  // const changePassword = async e => {
  //   e.preventDefault();
  //   const { email, password1, password2, username } = this.state;
  //   if (password1 && password1 === password2) {
  //     const status = await axios
  //       .put(`/auth/password`, {
  //         email,
  //         username,
  //         password: password1
  //       })
  //       .catch(err => alert(err.response.request.response));
  //     console.log(status);
  //     if (status && status.data === "OK")
  //       this.setState({
  //         email: "",
  //         username: "",
  //         password1: "",
  //         password2: "",
  //         password: "",
  //         forgotPassword: false
  //       });
  //   } else {
  //     alert("Passwords do not match");
  //     this.setState({ password1: "", password2: "" });
  //   }
  // };

  return (
    <main className="Login">
      <div className="title">
        <h1>Login Here</h1>
      </div>
      {!forgot ? (
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
          <h2>
            Forgot password?
            <br />
            <em onClick={() => setForgot(true)}>Reset</em>
          </h2>
        </form>
      ) : null}
    </main>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
