import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SubmitNewPrescription from "./SubmitNewPrescriptionForm.js";
import PrescriptionList from "./PharmacyPrescriptionSearch.js";
import PrescriptionDetails from "./PharmacyPrescriptionDetail.js";
import PharmacyMain from "./PharmacyMain.js";
import RefillOrders from "./PharmacyRefillOrders.js"
import OrderDetails from "./PharmacyOrderDetails.js";
import OrderHistoryWithSearch from "./PharmacyOrderHistorySearch.js";

import CustomerForm from "./CustomerSignup.js";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pharmacy/" element={<PharmacyMain />} />
          <Route path="/pharmacy/prescriptions/" element={<PrescriptionList />} />
          <Route path="/pharmacy/prescriptions/:id/" element={<PrescriptionDetails />} />
          <Route path="/pharmacy/prescriptions/orders/" element={<RefillOrders />} />
          <Route path="/pharmacy/prescriptions/order-details/:id/" element={<OrderDetails />} />
          <Route path="/pharmacy/order-history/" element={<OrderHistoryWithSearch />} />
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
