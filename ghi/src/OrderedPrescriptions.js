import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function OrderedPrescriptions() {
    const [orderedPrescriptions, setOrderedPrescriptions] = useState([])

    useEffect(()=> {
        getOrderedPrescriptions();
    },[])

    async function getOrderedPrescriptions() {
        const response = await fetch("http://localhost:8003/prescriptions/")
        if (response.ok) {
            const data = await response.json();
            const orderedPrescriptions = await data.filter(
                prescription => prescription.date_requested !== null && prescription.date_filled === null
            );
            setOrderedPrescriptions(orderedPrescriptions)
        }
    }

    const updatePrescription = async id => {
        const updatePrescriptions = orderedPrescriptions.filter(
            prescription => prescription.id === id
        );
        const prescriptionObj = updatePrescriptions[0]
        const tempDate = new Date();
        const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
        await fetch(`http://localhost:8003/prescriptions/${id}/`, {
            method: "put",
            body: JSON.stringify({
                ...prescriptionObj,
                date_filled: date,
            }),
            headers: {
            "Content-Type": "application/json"
        }
        });
        getOrderedPrescriptions()
    }


  return (
    <div className='container'>
        <h1>Ordered prescriptions
            <button type="button" className="btn btn-outline-primary">
                <Link to={"/pharmacy/prescriptions/"}>All customers' prescriptions</Link>
            </button>
        </h1>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Customer name</th>
            <th>RX_#</th>
            <th>Request date</th>
            <th>Description</th>
            <th>Details</th>
            <th>Refill status</th>
            </tr>
        </thead>
        <tbody>
            {orderedPrescriptions?.map(prescription => {
            return (
                <tr key={prescription.id}>
                <td width="16%">{ prescription.name }</td>
                <td width="12%">{ prescription.rx_number }</td>
                { prescription.date_requested && <td width="18%">{ prescription.date_requested }</td>}
                { !prescription.date_requested && <td width="18%">N/A</td>}
                <td width="20%">{ prescription.description }</td>
                <td>
                    <button type="button" className="btn btn-outline-primary">
                        <Link to={"/pharmacy/prescriptions/" + prescription.id }>Details</Link>
                    </button>
                </td>
                <td>
                    <button onClick={() => updatePrescription(prescription.id)} type="button" className="btn btn-outline-success">Complete</button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
  );
}

export default OrderedPrescriptions;
