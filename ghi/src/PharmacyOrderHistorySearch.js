import React, { useEffect, useState } from "react";
import OrderHistory from "./PharmacyOrderHistory";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

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
      };
      fetchPrescriptions();
    }
  }, [token, setPrescriptions]);

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={"/pharmacy/prescriptions"}
            >
              All prescriptions
            </Link>
          </li>
          <li className="nav-item">
            <Link
            className="nav-link"
            to={"/pharmacy/prescriptions/orders"}
            >
              Refill orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
            className="nav-link active"
            to={"/pharmacy/order-history"}
            >
              Order history
            </Link>
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
