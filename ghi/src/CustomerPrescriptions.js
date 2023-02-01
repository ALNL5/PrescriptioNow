import React, { useEffect, useState } from "react";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

const CustomerPrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      const fetchPrescriptions = async () => {
        const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(prescriptionURL, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          const rxToDisplay = data.reduce((acc, cur) => {
              if (
                (acc[cur.rx_number] && cur.times_refilled > acc[cur.rx_number].times_refilled)
                || !acc[cur.rx_number]
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
  }, [token, setPrescriptions]);

  const newPrescription = (id) => {
    const newPrescriptions = prescriptions.filter(
      (prescription) => prescription.id === id
    );
    const prescriptionObj = newPrescriptions[0];
    console.log("newPrescriptions[0]",newPrescriptions[0])
    console.log("prescriptionObj",prescriptionObj)
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
    });;
  };

  return (
    <div className="container">
      <h2>Welcome, Customer!</h2>
      <button type="button" className="btn btn-outline-primary  me-5">
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
                  {prescription.refills_as_written - prescription.times_refilled}
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
