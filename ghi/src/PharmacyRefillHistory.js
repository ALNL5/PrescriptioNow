import React from "react";


function RefillHistory({prescriptions = []}) {

  return (
    <div className='container'>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Request date</th>
            <th>Refill date</th>
            <th>Delivery date</th>
            <th>Refilled by (ID)</th>
            </tr>
        </thead>
        <tbody>
            {prescriptions?.map(prescription => {
            return (
                <tr key={prescription.id}>
                { prescription.date_requested && <td width="18%">{ prescription.date_requested }</td>}
                { !prescription.date_requested && <td width="18%">N/A</td>}
                { prescription.date_filled && <td width="18%">{ prescription.date_filled }</td>}
                { !prescription.date_filled && <td width="18%">N/A</td>}
                { prescription.date_delivered && <td width="18%">{ prescription.date_delivered }</td>}
                { !prescription.date_delivered && <td width="18%">N/A</td>}
                <td width="18%">{ prescription.employee_id }</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
  );
}

export default RefillHistory;
