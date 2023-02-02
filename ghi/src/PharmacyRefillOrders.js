import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./auth";

function RefillOrders() {
  const [orderedPrescriptions, setOrderedPrescriptions] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      const getOrderedPrescriptions = async () => {
        const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`;
        const customerURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/customers`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response1 = await fetch(prescriptionURL, fetchConfig);
        const response2 = await fetch(customerURL, fetchConfig);
        if (response1.ok && response2.ok) {
          const data_rx = await response1.json();
          const data_customers = await response2.json();
          const customerInfo = data_customers.reduce((acc, cur) => {
            if (!acc[cur.id]) {
              acc[cur.id] = cur;
            }
            return acc;
          }, {});
          const orderedPrescriptions = data_rx.filter(
            (prescription) =>
              prescription.date_requested !== null &&
              prescription.date_filled === null
          );
          const rxToDisplay = orderedPrescriptions.reduce((acc, cur) => {
            cur["customer_name"] =
              customerInfo[cur.customer_id].first_name +
              " " +
              customerInfo[cur.customer_id].last_name;
            acc[cur.rx_number] = cur;
            return acc;
          }, {});
          console.log(rxToDisplay);
          setOrderedPrescriptions(orderedPrescriptions);
        }
      };
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
    fetch(`${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`, {
      method: "put",
      body: JSON.stringify({
        ...prescriptionObj,
        date_filled: date,
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
    <div className="container d-grid gap-4 mt-5">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to={"/pharmacy/prescriptions"}>
              All prescriptions
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={"/pharmacy/prescriptions/orders"}
            >
              Refill orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/pharmacy/order-history"}>
              Order history
            </Link>
          </li>
        </ul>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>RX_#</th>
            <th>RX name</th>
            <th>Request date</th>
            <th>Prescription</th>
            <th>Change status</th>
          </tr>
        </thead>
        <tbody>
          {orderedPrescriptions?.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="17%">{prescription.customer_name}</td>
                <td width="12%">{prescription.rx_number}</td>
                <td width="18%">{prescription.name}</td>
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
