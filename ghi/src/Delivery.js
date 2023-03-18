import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./auth";

function DeliveryTasks() {
  const [refilledPrescriptions, setRefilledPrescriptions] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      const getRefilledPrescriptions = async () => {
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
          const refilledPrescriptions = data_rx.filter(
            (prescription) =>
              prescription.date_requested !== null &&
              prescription.date_filled !== null &&
              prescription.date_delivered === null
          );
          const rxToDisplay = refilledPrescriptions.reduce((acc, cur) => {
            cur["customer_name"] =
              customerInfo[cur.customer_id].first_name +
              " " +
              customerInfo[cur.customer_id].last_name;
            acc[cur.rx_number] = cur;
            cur["customer_address"] =
              customerInfo[cur.customer_id].address_1 +
              ", " +
              customerInfo[cur.customer_id].city;
            acc[cur.rx_number] = cur;
            return acc;
          }, {});
          console.log(rxToDisplay);
          setRefilledPrescriptions(refilledPrescriptions);
        }
      };
      getRefilledPrescriptions();
    }
  }, [token, setRefilledPrescriptions]);

  const updatePrescription = (id) => {
    const updatePrescriptions = refilledPrescriptions.filter(
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
        date_delivered: date,
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
        <h3>Welcome, driver!</h3>
      <div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>RX_#</th>
            <th>Refilled date</th>
            <th>Address</th>
            <th>Change status</th>
          </tr>
        </thead>
        <tbody>
          {refilledPrescriptions?.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="15%">{prescription.customer_name}</td>
                <td width="10%">{prescription.rx_number}</td>
                <td width="18%">{prescription.date_filled}</td>
                {/* {prescription.date_refilled && (
                  <td width="18%">{prescription.date_refilled}</td>
                )}
                {!prescription.date_refilled && <td width="18%">N/A</td>} */}
                <td width="40%">{prescription.customer_address}</td>
                <td>
                  <Link onClick={() => updatePrescription(prescription.id)}>
                    <span className="badge bg-success">Delivered</span>
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

export default DeliveryTasks;
