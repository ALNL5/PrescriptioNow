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
          const refilledOrders = await data_rx.filter(
            (prescription) => prescription.date_requested !== null
          );
          const rxToDisplay = refilledOrders.reduce((acc, cur) => {
              cur["customer_name"] =
                customerInfo[cur.customer_id].first_name +
                " " +
                customerInfo[cur.customer_id].last_name;
              acc[cur.rx_number] = cur;
              return acc;
          }, {});
          console.log(rxToDisplay);
          setRefilledOrders(Object.values(refilledOrders));
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
            <th>Customer</th>
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
                <td width="16%">{prescription.customer_name}</td>
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
