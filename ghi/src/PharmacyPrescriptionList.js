import React from "react";
import { Link } from "react-router-dom";


function PrescriptionList({prescriptions = []}) {

  return (
    <div className='container'>
        <h1>Prescriptions of all customers</h1>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Customer name</th>
            <th>RX_#</th>
            <th>Expiration date</th>
            <th>Request date</th>
            <th>Refill date</th>
            <th>Delivery date</th>
            <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {prescriptions?.map(prescription => {
            return (
                <tr key={prescription.id}>
                <td width="20%">{ prescription.name }</td>
                <td width="10%">{ prescription.rx_number }</td>
                <td width="18%">{ prescription.date_refills_expire }</td>
                { prescription.date_requested && <td width="18%">{ prescription.date_requested }</td>}
                { !prescription.date_requested && <td width="18%">N/A</td>}
                { prescription.date_filled && <td width="18%">{ prescription.date_filled }</td>}
                { !prescription.date_filled && <td width="18%">N/A</td>}
                { prescription.date_delivered && <td width="18%">{ prescription.date_delivered }</td>}
                { !prescription.date_delivered && <td width="18%">N/A</td>}
                <td>
                    <button type="button" className="btn btn-outline-primary">
                        <Link to={"/pharmacy/prescriptions/" + prescription.id }>Details</Link>
                    </button>
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
