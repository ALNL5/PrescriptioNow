import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PrescriptionDetails = () => {
  let { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [disableNameButton, setDisableNameButton] = useState(false);
  const [disableDescriptionButton, setDisableDescriptionButton] =
    useState(false);
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    getPrescriptions();
  }, [getPrescriptions]);

  async function getPrescriptions() {
    const response = await fetch(`http://localhost:8003/prescriptions/${id}/`);
    if (response.ok) {
      const data = await response.json();
      setPrescriptions(data);
    }
  }

  const deletePrescription = async (id) => {
    await fetch(`http://localhost:8003/prescriptions/${id}/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location.href = "http://localhost:3000/pharmacy/prescriptions/";
    });
  };

  const updatePrescription = async (id) => {
    const updatePrescription = await fetch(
      `http://localhost:8003/prescriptions/${id}/`,
      {
        method: "put",
        body: JSON.stringify({
          rx_number: prescriptions.rx_number,
          name: prescriptions.name,
          description: prescriptions.description,
          quantity: prescriptions.quantity,
          refills_as_written: prescriptions.refills_as_written,
          date_refills_expire: prescriptions.date_refills_expire,
          date_requested: prescriptions.date_requested,
          date_filled: prescriptions.date_filled,
          date_delivered: prescriptions.date_delivered,
          customer_id: prescriptions.customer_id,
          employee_id: prescriptions.employee_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div className="container">
      <div className="offset-3 col-6">
        <h2>Prescription #: {prescriptions.rx_number}</h2>
      </div>
      <form className="offset-2">
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Name</label>
          <input
            className="form-control mx-1"
            value={prescriptions.name}
            disabled={disableNameButton}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              setDisableNameButton(!disableNameButton);
              updatePrescription(prescriptions.id);
            }}
          >
            Update
            <i style={{ color: "blue" }} className="fas fa-edit d-block"></i>
          </button>
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Customer ID</label>
          <input
            className="form-control mx-1"
            value={prescriptions.customer_id}
            disabled
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Description</label>
          <input
            className="form-control mx-1"
            value={prescriptions.description}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              updatePrescription(prescriptions.id);
            }}
          >
            <i style={{ color: "blue" }} className="fa fa-pencil-square-o"></i>
          </button>
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Quantity</label>
          <input
            className="form-control mx-1"
            value={prescriptions.quantity}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refills as written</label>
          <input
            className="form-control mx-1"
            value={prescriptions.refills_as_written}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">
            Refill expiration date
          </label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_refills_expire}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Request date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_requested}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refill date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_filled}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Delivery date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_delivered}
            disabled={disableButton}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Created by</label>
          <input
            className="form-control mx-1"
            value={prescriptions.employee_id}
            disabled={disableButton}
          />
        </div>
      </form>
      <div className="text-center">
        {/* <button type="button" className="btn btn-outline-primary" onClick={() => {setDisableButton(!disableButton); updatePrescription(prescriptions.id)}}>
          Update<i style={{ color: "blue" }} className="fas fa-edit d-block"></i>
        </button > */}
        <button
          onClick={() => deletePrescription(prescriptions.id)}
          type="button"
          className="btn btn-outline-primary"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
