import React, { useState } from "react";
import { useToken } from "./auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = useToken();
  const loginUser = token[1];
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userResponse = await loginUser(username, password);
    const decodedToken = parseJwt(userResponse.access_token);
    const decodedUser = decodedToken.account;
    const decodedUsersRole = decodedUser.role_id;

    if (decodedUsersRole === 0) {
      navigate(`/customers/${decodedUser.id}`);
    }
    if (decodedUsersRole === 1) {
      navigate(`/pharmacy`);
    }
    if (decodedUsersRole === 2) {
      navigate(`/Deliveries`);
    }
  }

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="p-4 mt-5">
            <h1 className="text-center">Login</h1>
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
              <button
                className="btn btn-primary d-grid gap-2 col-4 mx-auto"
                onClick={handleSubmit}
              >
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
