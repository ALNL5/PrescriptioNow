import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./auth";

function OrderHistory() {
  const [refilledOrders, setRefilledOrders] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      const getRefilledOrders = async () => {
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
          const refilledOrders = await data.filter(
            (prescription) => prescription.date_requested !== null
          );
          setRefilledOrders(refilledOrders);
        }
      };
      getRefilledOrders();
    }
  }, [token, setRefilledOrders]);

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>RX #</th>
            <th>RX name</th>
            <th>Customer ID</th>
            <th>Request date</th>
            <th>Refill date</th>
            <th>Delivery date</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {refilledOrders?.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="12%">{prescription.rx_number}</td>
                <td width="15%">{prescription.name}</td>
                <td width="16%">{prescription.customer_id}</td>
                {prescription.date_requested && (
                  <td width="18%">{prescription.date_requested}</td>
                )}
                {!prescription.date_requested && <td width="18%">N/A</td>}
                {prescription.date_filled && (
                  <td width="18%">{prescription.date_filled}</td>
                )}
                {!prescription.date_filled && <td width="18%">N/A</td>}
                {prescription.date_delivered && (
                  <td width="18%">{prescription.date_delivered}</td>
                )}
                {!prescription.date_delivered && <td width="18%">N/A</td>}
                <td>
                  <Link
                    to={
                      "/pharmacy/prescriptions/order-details/" + prescription.id
                    }
                  >
                    <span className="badge bg-info text-dark">Details</span>
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

export default OrderHistory;
