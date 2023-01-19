import React from "react";


function PharmacyMain() {
    return (
      <div className="container">
        <div className="row gx-4 p-8 mb-5 hero">
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
            <p></p>
            <h2>Welcome, pharmacist!</h2>
            <div className="mt-5">
            <p><a className="btn btn-lg" href="/pharmacy/prescriptions/" role="button">View all prescriptions</a></p>
            <p><a className="btn btn-lg" href="/pharmacy/prescriptions/new/" role="button">Create new prescription</a></p>
            <p><a className="btn btn-lg" href="/pharmacy/prescriptions/orders/" role="button">View prescription orders</a></p>
            </div>
            </div>
        </div>
      </div>
    );
}

export default PharmacyMain;
