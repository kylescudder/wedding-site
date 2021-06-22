import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { setAccessToken } from '../accessToken'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

async function loginUser(credentials) {
  return fetch("http://localhost:3000/wedding/api/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      data.json()
      console.log(data)
    })
    .catch((error) => error);
}

//Login Box
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function showValidationErr(errorList) {
    setErrors(errorList);
  }
  function clearValidationErr(elm) {
    setErrors(() => {
      let newArr = [];
      if (errors.length > 0) {
        for (let err of errors) {
          if (elm !== err.elm) {
            newArr.push(err);
          }
        }
      }
      setErrors(newArr);
    });
  }
  function onUsernameChange(e) {
    setUsername(e.target.value);
    clearValidationErr("username");
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
    clearValidationErr("password");
  }

  const handleSubmit = async (e) => {
    const errorList = [];
    if (username === "") {
      errorList.push({ elm: "username", msg: "Username must not be empty" });
    }
    if (password === "") {
      errorList.push({ elm: "password", msg: "Password must not be empty" });
    }
    e.preventDefault();
    if (errorList.length === 0) {
      loginUser({
        username,
        password,
      }) 
        .then((response) => {
          if (response.success === true) {
            setAccessToken(response.token)
            history.push('/')
          } else {
            errorList.push({ elm: "api", msg: "Login failed" });
          }
        })
        .catch((error) => {
          errorList.push({ elm: "api", msg: "Login failed" });
          showValidationErr(errorList);
        });
      e.preventDefault();
    }
    showValidationErr(errorList);
  };

  let usernameErr = null,
    passwordErr = null,
    apiErr = null;

  if (errors != null) {
    if (errors.length > 0) {
      for (let err of errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
        if (err.elm === "api") {
          apiErr = err.msg;
        }
      }
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-6 offset-3">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="card bg-secondary">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="card-title">Login form</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onChange={onUsernameChange.bind(this)}
                      />
                      <small className="danger-error">
                        {usernameErr ? usernameErr : ""}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={onPasswordChange.bind(this)}
                      />
                      <small className="danger-error">
                        {passwordErr ? passwordErr : ""}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <small className="danger-error">
                      {apiErr ? apiErr : ""}
                    </small>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <button div className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;