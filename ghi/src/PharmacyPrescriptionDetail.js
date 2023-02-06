import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

const PrescriptionDetails = () => {
  let { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  // const [changed, setChanged] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      async function getPrescriptions() {
        const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`;
        const customerURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/customers`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response1 = await fetch(prescriptionURL, fetchConfig);
        const response2 = await fetch(customerURL, fetchConfig);
        if (response1.ok && response2.ok) {
          const data_rx = await response1.json();
          const data_customers = await response2.json();
          const customerInfo = data_customers.reduce((acc, cur) => {
            if (!acc[cur.id]) {
              acc[cur.id] = cur;
            }
            return acc;
          }, {});
          data_rx["customer_name"] =
            customerInfo[data_rx.customer_id].first_name +
            " " +
            customerInfo[data_rx.customer_id].last_name;
          setPrescriptions(data_rx);
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
      window.location.href = `${process.env.PUBLIC_URL}/pharmacy/prescriptions`;
    });
  };

  // const updatePrescription = async (id) => {
  //   await fetch(
  //     `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions/${id}`,
  //     {
  //       method: "put",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(tempPrescriptions),
  //     }
  //   ).then(() => {
  //     window.location.reload();
  //   });
  // };

  return (
    <div className="container d-grid gap-4 mt-5">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link " to={"/pharmacy/prescriptions"}>
              All prescriptions
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/pharmacy/prescriptions/orders"}>
              Refill orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/pharmacy/order-history"}>
              Order history
            </Link>
          </li>
        </ul>
      </div>
      <div className="offset-2 col-6">
        <h3>Prescription #: {prescriptions.rx_number}</h3>
      </div>
      <form className="offset-2">
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Prescription name</label>
          <input
            className="form-control mx-1"
            value={prescriptions.name}
            disabled
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Customer name</label>
          <input
            className="form-control mx-1"
            value={prescriptions.customer_name}
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
            value={prescriptions.description}
            disabled
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Quantity</label>
          <input
            className="form-control mx-1"
            value={prescriptions.quantity}
            disabled
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">
            Maximum refill times
          </label>
          <input
            className="form-control mx-1"
            value={prescriptions.refills_as_written}
            disabled
          />
        </div>
        {/* <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Times refilled</label>
          <input
            className="form-control mx-1"
            value={prescriptions.times_refilled}
            disabled
          />
        </div> */}
        <div className="col-sm-9 d-flex align-items-center"></div>
      </form>
      <div className="d-flex flex-column mb-3">
        <div className="text-center p-3">
          {/* {changed ? (
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
          )} */}
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
