import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Login.css"
import users from "../userDB";

const Login = () => {
  const [islogged, setIslogged] = useState(false);
  const [loginParams, setLoginParams] = useState({
    user_id: "",
    user_password: ""
  });
  const navigate = useNavigate();
  const handleFormChange = (event) => {
    const loginParamsNew = { ...loginParams };
    const val = event.target.value;
    loginParamsNew[event.target.name] = val;
    setLoginParams(loginParamsNew);
  };

  const login = (event) => {
    const user_id = loginParams.user_id;
    const user_password = loginParams.user_password;
    for (let user of users) {
      if (user.username === user_id && user.password === user_password) {
        localStorage.setItem("token", "T");
        localStorage.setItem("user", JSON.stringify(user)); // set the user data
        setIslogged(true);
        return;
      }
    }
    event.preventDefault();
  };

  useEffect(() => {
    if (islogged) {
      navigate("/");
    }
  }, [islogged, navigate]);

  if (localStorage.getItem("token")) {
    return navigate("/");
  }

  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="login-page">
      <div className="header">
        <img className="Logo" src={Logo} alt="logo" />
        <div className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="container">
        <div className="login-content">
          {/* <img className="mmImg" src={mm} alt="mm" /> */}
          <div className="login-desc">
            {hour >= 12 ? (hour >= 17 ? <h2>Good Evening</h2> : <h2>Good Afternoon</h2>) : <h2>Good Morning</h2>}
            Sign on to manage your accounts
          </div>
          <form onSubmit={login}>
            <div className="form-group">
              <label className="control-label" style={{ color: "#808080" }}>
                Username
              </label>
              <input
                type="text"
                name="user_id"
                onChange={handleFormChange}
                className="form-control"
                // placeholder="Enter Your Username"
                autofocus=""
              />
              <input type="hidden" name="code" value="" className="form-control" />
            </div>
            <div className="form-group">
              <label className="control-label" style={{ color: "#808080" }}>
                Password
              </label>
              <input
                type="password"
                name="user_password"
                onChange={handleFormChange}
                className="form-control"
                // placeholder="Enter Password"
              />
            </div>
            <div className="save_username_container">
              <label className="save_username">
                Remember Me
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="button_box">
                <input type="submit" className="btn btn-inverse" value="Log In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
