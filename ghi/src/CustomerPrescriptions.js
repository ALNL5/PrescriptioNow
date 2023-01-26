import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerPrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  async function fetchPrescriptions() {
    const response = await fetch("http://localhost:8001/prescriptions");
    if (response.ok) {
      const data = await response.json();
      setPrescriptions(data);
    }
  }

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, Customer!</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>RX #</th>
            <th>Expiration date</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="20%">{prescription.name}</td>
                <td width="16%">{prescription.rx_number}</td>
                <td width="22%">{prescription.date_refills_expire}</td>
                <td>
                  <button type="button" className="btn btn-outline-primary">
                    <Link to={"prescriptions/" + prescription.id}>Details</Link>
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
