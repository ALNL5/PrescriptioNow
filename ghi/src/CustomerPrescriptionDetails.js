import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CustomerPrescriptionDetails = () => {
  let { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);


  useEffect(() => {
    async function getPrescriptions() {
      const response = await fetch(
        `http://localhost:8001/prescriptions/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    }
    getPrescriptions();
  }, [setPrescriptions]);

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPrescriptionDetails;
