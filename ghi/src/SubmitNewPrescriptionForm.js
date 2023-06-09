import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

function PrescriptionFormInput(props) {
  const { id, value, labelText, onChange, type, name, placeholder } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
}

function SubmitNewPrescription(props) {
  const [dateRequested, setDateRequested] = useState("");
  const [rxNumber, setRxNumber] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [refills, setRefills] = useState("");
  const [description, setDescription] = useState("");
  const [refillsExpire, setRefillsExpire] = useState("");
  const [timesRefill] = useState(1);
  const [customerId, setCustomerId] = useState(0);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      async function getCustomers() {
        const url = `${process.env.REACT_APP_PHARMACY_API_HOST}/customers`;
        const fetchConfig = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        }
      }
      getCustomers();
    }
  }, [token, setCustomers]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPrescription = {
      date_requested: dateRequested,
      rx_number: rxNumber,
      name: name,
      quantity: quantity,
      refills_as_written: refills,
      description: description,
      times_refill: timesRefill,
      date_refills_expire: refillsExpire,
      customer_id: customerId,
    };
    navigate("/pharmacy/prescriptions");

    const prescriptionUrl = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newPrescription),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(prescriptionUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setDateRequested("");
        setRxNumber("");
        setName("");
        setQuantity(0);
        setRefills(0);
        setRefillsExpire("");
        setDescription("");
        setCustomerId(0);
        setCustomers([]);
      })
      .catch((e) => console.log("error: ", e));
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-outline-primary  me-5">
        <Link className="nav-link" to={"/pharmacy/prescriptions"}>
          Back
        </Link>
      </button>
      <div className="row offset-3 col-6">
        <h1 className="text-center mt-4 mb-4">Submit a new prescription</h1>
        <form onSubmit={handleSubmit} id="new-prescription-form">
          <PrescriptionFormInput
            labelText="Date requested"
            id="date-requested"
            value={dateRequested}
            onChange={(e) => setDateRequested(e.target.value)}
            type="date"
            name="date-requested"
          />
          <PrescriptionFormInput
            labelText="Rx number"
            id="rx-number"
            value={rxNumber}
            onChange={(e) => setRxNumber(e.target.value)}
            type="text"
            name="rx-number"
            placeholder="Rx number"
          />
          <PrescriptionFormInput
            labelText="Prescription name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Prescription name (generic)"
          />
          <PrescriptionFormInput
            labelText="Quantity to dispense per refill"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            name="quantity"
            placeholder="Quantity"
          />
          <PrescriptionFormInput
            labelText="Number of refills"
            id="refills"
            value={refills}
            onChange={(e) => setRefills(e.target.value)}
            type="number"
            name="refills"
            placeholder="Number of refills"
          />
          <PrescriptionFormInput
            labelText="Refill expiration date"
            id="refill-expiration"
            value={refillsExpire}
            onChange={(e) => setRefillsExpire(e.target.value)}
            type="date"
            name="refills-expiration"
          />
          <PrescriptionFormInput
            labelText="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
          />
          <div className="mb-4">
            <label htmlFor="customer">Customer</label>
            <select
              required
              className="form-select"
              id="customer"
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Select customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.first_name} {customer.last_name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary d-grid gap-2 col-4 mx-auto"
          >
            Submit prescription
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitNewPrescription;
