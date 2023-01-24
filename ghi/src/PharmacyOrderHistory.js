import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function OrderHistory() {
    const [refilledOrders, setRefilledOrders] = useState([])

    useEffect(()=> {
        getRefilledOrders();
    },[])

    async function getRefilledOrders() {
        const response = await fetch("http://localhost:8003/prescriptions/")
        if (response.ok) {
            const data = await response.json();
            const refilledOrders = await data.filter(
                prescription => prescription.date_requested !== null
            );
            setRefilledOrders(refilledOrders)
        }
    }

  return (
    <div className='container'>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Customer name</th>
            <th>Customer ID</th>
            <th>RX_#</th>
            <th>Request date</th>
            <th>Refill date</th>
            <th>Delivery date</th>
            <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {refilledOrders?.map(prescription => {
            return (
                <tr key={prescription.id}>
                <td width="20%">{ prescription.name }</td>
                <td width="16%">{ prescription.customer_id }</td>
                <td width="10%">{ prescription.rx_number }</td>
                { prescription.date_requested && <td width="18%">{ prescription.date_requested }</td>}
                { !prescription.date_requested && <td width="18%">N/A</td>}
                { prescription.date_filled && <td width="18%">{ prescription.date_filled }</td>}
                { !prescription.date_filled && <td width="18%">N/A</td>}
                { prescription.date_delivered && <td width="18%">{ prescription.date_delivered }</td>}
                { !prescription.date_delivered && <td width="18%">N/A</td>}
                <td>
                    <button type="button" className="btn btn-outline-primary">
                        <Link to={"/pharmacy/prescriptions/order-details/" + prescription.id }>Details</Link>
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

export default OrderHistory;
