import React from "react";

function PharmacyMain() {
  return (
    <div className="container">
      <div className="row gx-4 p-8 mb-5 pharmacist">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <p></p>
          <h2>Welcome, pharmacist!</h2>
          <div className="mt-5">
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/pharmacy/prescriptions/"
                role="button"
              >
                View all prescriptions
              </a>
            </p>
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/pharmacy/prescriptions/new/"
                role="button"
              >
                Create new prescription
              </a>
            </p>
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/pharmacy/prescriptions/orders/"
                role="button"
              >
                View refill orders
              </a>
            </p>
            <p>
              <a
                className="btn btn-lg"
                href="prescriptionow/pharmacy/order-history/"
                role="button"
              >
                View refill order history
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyMain;
