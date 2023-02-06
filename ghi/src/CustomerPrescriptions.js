import React, { useEffect, useState } from "react";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

const CustomerPrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [userName, setUserName] = useState("");
  const { token } = useAuthContext();

  function parseJwt(data) {
    const base64Url = data.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const info = JSON.parse(window.atob(base64));
    setUserName(info.account.username);
  }

  useEffect(() => {
    if (token) {
      parseJwt(token);
      const fetchPrescriptions = async () => {
        const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`;
        const customerURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/customers`;
        const usersURL = `${process.env.REACT_APP_USER_API_HOST}/api/accounts`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(prescriptionURL, fetchConfig);
        const response1 = await fetch(customerURL, fetchConfig);
        const response2 = await fetch(usersURL, fetchConfig);
        if (response.ok && response1.ok && response2.ok) {
          const data_rx = await response.json();
          const data_customers = await response1.json();
          const data_users = await response2.json();
          console.log("data_users:", data_users)
          const user = data_users.filter((cur) =>
            cur.username === userName
          );
          console.log("user:", user);
          const userID = user[0]?.id;
          console.log("userID:", userID)
          console.log("data_customers:", data_customers)
          const filteredCustomer = data_customers.filter(
            (customer) => customer.user_id === userID
          );
          console.log("filteredCustomer:",filteredCustomer);
          const customerID = filteredCustomer[0]?.id;
          console.log("customerID:", customerID);
          console.log("data_rx:", data_rx)
          const filteredData_rx = data_rx?.filter(
            (fD) => fD.customer_id === customerID
          );
          const rxToDisplay = filteredData_rx.reduce((acc, cur) => {
            if (
              (acc[cur.rx_number] &&
                cur.times_refilled > acc[cur.rx_number].times_refilled) ||
              !acc[cur.rx_number]
            ) {
              acc[cur.rx_number] = cur;
            }
            return acc;
          }, {});
          setPrescriptions(Object.values(rxToDisplay));
        }
      };
      fetchPrescriptions();
    }
  }, [token, setPrescriptions, userName]);

  const newPrescription = (id) => {
    const newPrescriptions = prescriptions.filter(
      (prescription) => prescription.id === id
    );
    const prescriptionObj = newPrescriptions[0];
    const tempRefill = prescriptionObj.times_refilled + 1;
    const tempDate = new Date();
    const date =
      tempDate.getFullYear() +
      "-" +
      ("0" + (tempDate.getMonth() + 1)).slice(-2) +
      "-" +
      tempDate.getDate();
    fetch(`${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`, {
      method: "post",
      body: JSON.stringify({
        ...prescriptionObj,
        times_refilled: tempRefill,
        date_requested: date,
        date_filled: null,
        date_delivered: null,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Welcome, Customer!</h2>
      <button type="button" className="btn btn-outline-primary mb-4">
        <Link className="nav-link" to={"/customers/new"}>
          Add customer information
        </Link>
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>RX #</th>
            <th>Expiration date</th>
            <th>Refills remaining</th>
            <th>Description</th>
            <th>Request refill</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="16%">{prescription.name}</td>
                <td width="12%">{prescription.rx_number}</td>
                <td width="18%">{prescription.date_refills_expire}</td>
                <td width="18%">
                  {prescription.refills_as_written -
                    prescription.times_refilled}
                </td>
                <td width="20%">{prescription.description}</td>
                <td width="22%">
                  <Link onClick={() => newPrescription(prescription.id)}>
                    <span className="badge bg-success">Request</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPrescriptionList;
