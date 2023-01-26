import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [accountsUsername, setAccountsUsername] = useState("");
  const [accountsPassword, setAccountsPassword] = useState("");
  const [accountsRoleID, setAccountsRoleID] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAccount = {
      username: accountsUsername,
      password: accountsPassword,
      role_id: accountsRoleID,
    };
    navigate('/');

    const accountsUrl = "http://localhost:8002/api/accounts";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newAccount),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(accountsUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setAccountsUsername("");
        setAccountsPassword("");
        setAccountsRoleID(0);
      })
      .catch((e) => console.log("error: ", e));
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setAccountsUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setAccountsPassword(value);
  };

  const handleRoleIDChange = (event) => {
    const value = event.target.value;
    setAccountsRoleID(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} id="create-account-form">
              <div className="form-floating mb-3">
                <input
                  value={accountsUsername}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={accountsPassword}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                  type="text"
                  name="password"
                  id="password"
                  className="form-control"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={accountsRoleID}
                  onChange={handleRoleIDChange}
                  placeholder="Role ID"
                  required
                  type="number"
                  name="role_id"
                  id="role_id"
                  className="form-control"
                />
                <label htmlFor="role_id">Role ID</label>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
