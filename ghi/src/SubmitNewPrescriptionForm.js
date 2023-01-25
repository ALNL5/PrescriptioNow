import React, { useState } from "react";

const SubmitNewPrescription = () => {
  const [prescriptionRxNumber, setPrescriptionRxNumber] = useState("");
  const [prescriptionName, setPrescriptionName] = useState("");
  const [prescriptionQuantity, setPrescriptionQuantity] = useState("");
  const [prescriptionRefills, setPrescriptionRefills] = useState("");
  const [prescriptionRefillsExpire, setPrescriptionRefillsExpire] =
    useState("");
  const [customerID, setCustomerID] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPrescription = {
      rx_number: prescriptionRxNumber,
      name: prescriptionName,
      quantity: prescriptionQuantity,
      refills_as_written: prescriptionRefills,
      date_refills_expire: prescriptionRefillsExpire,
      customer_id: customerID,
    };

    const prescriptionUrl = "http://localhost:8001/prescriptions";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newPrescription),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(prescriptionUrl, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setPrescriptionRxNumber("");
        setPrescriptionName("");
        setPrescriptionQuantity("");
        setPrescriptionRefills("");
        setPrescriptionRefillsExpire("");
        setCustomerID("");
      })
      .catch((e) => console.log("error: ", e));
  };

  const handlePrescriptionRxNumberChange = (event) => {
    const value = event.target.value;
    setPrescriptionRxNumber(value);
  };

  const handlePrescriptionNameChange = (event) => {
    const value = event.target.value;
    setPrescriptionName(value);
  };

  const handlePrescriptionQuantityChange = (event) => {
    const value = event.target.value;
    setPrescriptionQuantity(value);
  };

  const handlePrescriptionRefillsChange = (event) => {
    const value = event.target.value;
    setPrescriptionRefills(value);
  };

  const handlePrescriptionRefillsExpireChange = (event) => {
    const value = event.target.value;
    setPrescriptionRefillsExpire(value);
  };

  const handleCustomerIDChange = (event) => {
    const value = event.target.value;
    setCustomerID(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-2 col-8">
          <div className="p-4 mt-4">
            <h1 className="mb-4">Submit a new prescription</h1>
            <form onSubmit={handleSubmit} id="new-prescription-form">
              <div className="mb-3">
                <label htmlFor="rx_name">Rx Number</label>
                <input
                  value={prescriptionRxNumber}
                  onChange={handlePrescriptionRxNumberChange}
                  placeholder="Rx number"
                  required
                  type="text"
                  name="rx-number"
                  id="rx-number"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prescription_name">Prescription Name</label>
                <input
                  value={prescriptionName}
                  onChange={handlePrescriptionNameChange}
                  placeholder="Prescription name (generic)"
                  required
                  type="text"
                  name="prescription-name"
                  id="prescription-name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity">Quantity</label>
                <input
                  value={prescriptionQuantity}
                  onChange={handlePrescriptionQuantityChange}
                  placeholder="Quantity"
                  required
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="refills">Number of Refills</label>
                <input
                  value={prescriptionRefills}
                  onChange={handlePrescriptionRefillsChange}
                  placeholder="Number of refills"
                  required
                  type="number"
                  name="refills"
                  id="refills"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="refill-expiration">
                  Refill Expiration Date
                </label>
                <input
                  value={prescriptionRefillsExpire}
                  onChange={handlePrescriptionRefillsExpireChange}
                  required
                  type="date"
                  name="refill-expiration"
                  id="refill-expiration"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customer-id">Customer ID</label>
                <input
                  value={customerID}
                  onChange={handleCustomerIDChange}
                  required
                  type="number"
                  name="customer-id"
                  id="customer-id"
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary">Submit prescription</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitNewPrescription;
