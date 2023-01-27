import React from "react";
import { Link } from "react-router-dom";


function PrescriptionList({prescriptions = []}) {

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>RX #</th>
            <th>RX name</th>
            <th>Customer ID</th>
            <th>Expiration date</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions?.map((prescription) => {
            return (
              <tr key={prescription.id}>
                <td width="16%">{prescription.rx_number}</td>
                <td width="20%">{prescription.name}</td>
                <td width="20%">{prescription.customer_id}</td>
                <td width="22%">{prescription.date_refills_expire}</td>
                <td>
                  <Link to={"/pharmacy/prescriptions/" + prescription.id}>
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

export default PrescriptionList;
