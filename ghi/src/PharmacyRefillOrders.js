import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./auth";

function RefillOrders() {
    const [orderedPrescriptions, setOrderedPrescriptions] = useState([])
    const { token } = useAuthContext();

    useEffect(() => {
      if (token) {
        const getOrderedPrescriptions = async () => {
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
            const orderedPrescriptions = data.filter(
              (prescription) =>
                prescription.date_requested !== null &&
                prescription.date_filled === null
            );
            setOrderedPrescriptions(orderedPrescriptions);
          }
        }
        getOrderedPrescriptions();
      }
    }, [token, setOrderedPrescriptions]);


  const updatePrescription = (id) => {
    const updatePrescriptions = orderedPrescriptions.filter(
      (prescription) => prescription.id === id
    );
    const prescriptionObj = updatePrescriptions[0];
    const tempDate = new Date();
    const date =
      tempDate.getFullYear() +
      "-" +
      ("0" + (tempDate.getMonth() + 1)).slice(-2) +
      "-" +
      tempDate.getDate();
    fetch(
      `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`,
      {
        method: "put",
        body: JSON.stringify({
          ...prescriptionObj,
          date_filled: date,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link "
              aria-current="page"
              href="/pharmacy/prescriptions"
            >
              All prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              href="/pharmacy/prescriptions/orders"
            >
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/order-history">
              Order history
            </a>
          </li>
        </ul>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>RX_#</th>
            <th>RX name</th>
            <th>Customer ID</th>
            <th>Request date</th>
            <th>Prescription</th>
            <th>Change status</th>
          </tr>
        </thead>
        <tbody>
          {orderedPrescriptions?.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="14%">{prescription.rx_number}</td>
                <td width="14%">{prescription.name}</td>
                <td width="16%">{prescription.customer_id}</td>
                {prescription.date_requested && (
                  <td width="18%">{prescription.date_requested}</td>
                )}
                {!prescription.date_requested && <td width="18%">N/A</td>}
                <td>
                  <Link
                    to={
                      "/pharmacy/prescriptions/order-details/" + prescription.id
                    }
                  >
                    <span className="badge bg-info text-dark">Details</span>
                  </Link>
                </td>
                <td>
                  <Link onClick={() => updatePrescription(prescription.id)}>
                    <span className="badge bg-success">Complete</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RefillOrders;
