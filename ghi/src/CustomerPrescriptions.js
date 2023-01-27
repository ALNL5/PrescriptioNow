import React, { useEffect, useState } from "react";
import { useAuthContext } from "./auth";

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
          setPrescriptions(data);
        }
      };
      fetchPrescriptions();
    }
  }, [token, setPrescriptions]);


  return (
    <div className="container">
      <h2>Welcome, Customer!</h2>
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
                <td width="20%">{prescription.name}</td>
                <td width="16%">{prescription.rx_number}</td>
                <td width="22%">{prescription.date_refills_expire}</td>
                <td width="22%">{prescription.times_refilled}</td>
                <td width="22%">{prescription.description}</td>
                <td>
                  <button type="button" className="btn btn-outline-primary">
                    Refill
                  </button>
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
