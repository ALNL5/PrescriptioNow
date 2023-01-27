import React, { useEffect, useState } from "react";
import OrderHistory from "./PharmacyOrderHistory";
import { useAuthContext } from "./auth";

function OrderHistoryWithSearch() {
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
            setPrescriptions(data);
          }
        }
        fetchPrescriptions();
    }
  }, [token, setPrescriptions]);

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="page"
              href="/pharmacy/prescriptions"
            >
              All prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/prescriptions/orders">
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/pharmacy/order-history">
              Order history
            </a>
          </li>
        </ul>
      </div>
      <div className="wrapper">
        <OrderHistory prescriptions={prescriptions} />
      </div>
    </div>
  );
}

export default OrderHistoryWithSearch;
