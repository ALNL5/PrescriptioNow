import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./auth";

const PrescriptionDetails = () => {
  let { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [tempPrescriptions, setTempPrescriptions] = useState([]);
  const [changed, setChanged] = useState(false);
  const { token } = useAuthContext();


  useEffect(() => {
    if (token) {
        async function getPrescriptions() {
          const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`;
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
            setTempPrescriptions(data);
          }
        }
        getPrescriptions();
    }
  }, [token, setPrescriptions, id]);

  const deletePrescription = async (id) => {
    await fetch(
      `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      window.location.href =
        `${process.env.PUBLIC_URL}/pharmacy/prescriptions`;
    });
  };

  const updatePrescription = async (id) => {
    await fetch(
      `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempPrescriptions),
      }
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link "
              aria-current="page"
              href="/pharmacy/prescriptions"
            >
              All prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/prescriptions/orders">
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/order-history">
              Order history
            </a>
          </li>
        </ul>
      </div>
      <div className="offset-2 col-6">
        <h3>Prescription #: {prescriptions.rx_number}</h3>
        <p>Input to update prescription</p>
      </div>
      <form className="offset-2">
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Name</label>
          <input
            className="form-control mx-1"
            value={prescriptions.name}
            disabled
          />
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
            value={tempPrescriptions.description}
            onChange={(e) => {
              setChanged(true);
              setTempPrescriptions({
                ...tempPrescriptions,
                description: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Quantity</label>
          <input
            className="form-control mx-1"
            value={tempPrescriptions.quantity}
            onChange={(e) => {
              setChanged(true);
              setTempPrescriptions({
                ...tempPrescriptions,
                quantity: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refills as written</label>
          <input
            className="form-control mx-1"
            value={tempPrescriptions.refills_as_written}
            onChange={(e) => {
              setChanged(true);
              setTempPrescriptions({
                ...tempPrescriptions,
                refills_as_written: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Times refilled</label>
          <input
            className="form-control mx-1"
            value={prescriptions.times_refilled}
            disabled
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center"></div>
      </form>
      <div className="d-flex flex-column mb-3">
        <div className="text-center p-3">
          {changed ? (
            <button
              type="button"
              className="btn btn-outline-primary  me-5"
              onClick={() => updatePrescription(prescriptions.id)}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary me-5"
              disabled
            >
              Save
            </button>
          )}
          <button
            onClick={() => deletePrescription(prescriptions.id)}
            type="button"
            className="btn btn-outline-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
