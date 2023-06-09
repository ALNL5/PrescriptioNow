import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import { Link, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  let { id } = useParams();
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerDOB, setCustomerDOB] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress1, setCustomerAddress1] = useState("");
  const [customerAddress2, setCustomerAddress2] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerState, setCustomerState] = useState("");
  const [customerZip, setCustomerZip] = useState("");
  const [customerUserID, setCustomerUserID] = useState(0);
  const { token } = useAuthContext();
  const [userName, setUserName] = useState("");
  // const navigate = useNavigate();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
  }

  useEffect(() => {
    if (token) {
      parseJwt(token);
      const fetchUsers = async () => {
        const usersURL = `${process.env.REACT_APP_USER_API_HOST}/api/accounts`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(usersURL, fetchConfig);
        if (response.ok) {
          const data_users = await response.json();
          const user = data_users.filter((cur) => cur.username === userName);
          console.log("user:", user);
          const userID = user[0]?.id;
          console.log("userID:", userID);
          setCustomerUserID(userID);
        }
      };
      fetchUsers();
    }
  }, [token, setCustomerUserID, userName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCustomer = {
      first_name: customerFirstName,
      last_name: customerLastName,
      dob: customerDOB,
      phone: customerPhone,
      email: customerEmail,
      address_1: customerAddress1,
      address_2: customerAddress2,
      city: customerCity,
      state: customerState,
      zip: customerZip,
      user_id: customerUserID,
    };

    const customerUrl = `${process.env.REACT_APP_PHARMACY_API_HOST}/customers`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newCustomer),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };
    fetch(customerUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setCustomerFirstName("");
        setCustomerLastName("");
        setCustomerDOB("");
        setCustomerPhone("");
        setCustomerEmail("");
        setCustomerAddress1("");
        setCustomerAddress2("");
        setCustomerCity("");
        setCustomerState("");
        setCustomerZip("");
        setCustomerUserID(0);
      })
      .catch((e) => console.log("error: ", e))
      .then(() => {
        // navigate(`/customers/${id}`);
        window.location.reload();
      });
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setCustomerFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setCustomerLastName(value);
  };

  const handleDOBChange = (event) => {
    const value = event.target.value;
    setCustomerDOB(value);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setCustomerPhone(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setCustomerEmail(value);
  };

  const handleAddress1Change = (event) => {
    const value = event.target.value;
    setCustomerAddress1(value);
  };

  const handleAddress2Change = (event) => {
    const value = event.target.value;
    setCustomerAddress2(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCustomerCity(value);
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setCustomerState(value);
  };

  const handleZipChange = (event) => {
    const value = event.target.value;
    setCustomerZip(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <h1 className="text-center mt-4 mb-4">Add customer information</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                value={customerFirstName}
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerLastName}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerDOB}
                onChange={handleDOBChange}
                placeholder="DOB"
                required
                type="date"
                name="dob"
                id="dob"
                className="form-control"
              />
              <label htmlFor="dob">Date of Birth</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerPhone}
                onChange={handlePhoneChange}
                placeholder="Phone Number"
                required
                type="text"
                name="phone"
                id="phone"
                className="form-control"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerEmail}
                onChange={handleEmailChange}
                placeholder="Email"
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerAddress1}
                onChange={handleAddress1Change}
                placeholder="Address 1"
                required
                type="text"
                name="address_1"
                id="address_1"
                className="form-control"
              />
              <label htmlFor="address_1">Address 1</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerAddress2}
                onChange={handleAddress2Change}
                placeholder="Address 2"
                type="text"
                name="address_2"
                id="address_2"
                className="form-control"
              />
              <label htmlFor="address_2">Address 2</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerCity}
                onChange={handleCityChange}
                placeholder="city"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerState}
                onChange={handleStateChange}
                placeholder="state"
                required
                type="text"
                name="state"
                id="state"
                className="form-control"
              />
              <label htmlFor="state">State</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={customerZip}
                onChange={handleZipChange}
                placeholder="zip"
                required
                type="text"
                name="zip"
                id="zip"
                className="form-control"
              />
              <label htmlFor="zip">Zip Code</label>
            </div>
            <Link
              onClick={handleSubmit}
              className={"btn btn-primary d-grid gap-2 col-4 mx-auto"}
              to={"/customers/:id"}
              role="button"
              type="submit"
            >
              Create
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
