import React, { useState } from "react";
import { useToken } from "./auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useToken();
  const loginUser = token[1];
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    loginUser(username, password);
    navigate("/");
  }
  

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form id="create-account-form">
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="Username"
                  type="text"
                  required
                  className="form-control"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  type="password"
                  required
                  className="form-control"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
