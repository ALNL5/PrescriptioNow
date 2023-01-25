import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  let { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    async function getPrescriptions() {
      const response = await fetch(
        `http://localhost:8001/prescriptions/${id}/`
      );
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    }
    getPrescriptions();
  });

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link "
              aria-current="page"
              href="/pharmacy/prescriptions/"
            >
              All prescriptions
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pharmacy/prescriptions/orders/">
              Refill orders
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pharmacy/order-history/">
              Order history
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/pharmacy/order-details/">
              Order details
            </a>
          </li>
        </ul>
      </div>
      <div className="offset-2 col-6">
        <h3>Prescription #: {prescriptions.rx_number}</h3>
      </div>
      <form className="offset-2">
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Name</label>
          <input className="form-control mx-1" value={prescriptions.name} />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Customer ID</label>
          <input
            className="form-control mx-1"
            value={prescriptions.customer_id}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Description</label>
          <input
            className="form-control mx-1"
            value={prescriptions.description}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Quantity</label>
          <input className="form-control mx-1" value={prescriptions.quantity} />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refills as written</label>
          <input
            className="form-control mx-1"
            value={prescriptions.refills_as_written}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Times refilled</label>
          <input
            className="form-control mx-1"
            value={prescriptions.times_refilled}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center"></div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Request date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_requested}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refill date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_filled}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Delivery date</label>
          <input
            type="date"
            className="form-control mx-1"
            value={prescriptions.date_delivered}
          />
        </div>
        <div className="col-sm-9 d-flex align-items-center">
          <label className="col-sm-4 col-form-label">Refilled by</label>
          <input
            className="form-control mx-1"
            value={prescriptions.employee_id}
          />
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;
