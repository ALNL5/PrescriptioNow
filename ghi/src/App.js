import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SignupForm from "./User/SignupForm";
import SubmitNewPrescription from "./SubmitNewPrescriptionForm.js";
import PrescriptionList from "./PharmacyPrescriptionSearch.js";
import PrescriptionDetails from "./PharmacyPrescriptionDetail.js";
import PharmacyMain from "./PharmacyMain.js";
import RefillOrders from "./PharmacyRefillOrders.js";
import OrderDetails from "./PharmacyOrderDetails.js";
import OrderHistoryWithSearch from "./PharmacyOrderHistorySearch.js";
import CustomerForm from "./CustomerSignup.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pharmacy/" element={<PharmacyMain />} />
          <Route
            path="/pharmacy/prescriptions/"
            element={<PrescriptionList />}
          />
          <Route
            path="/pharmacy/prescriptions/new/"
            element={<SubmitNewPrescription />}
          />
          <Route
            path="/pharmacy/prescriptions/:id/"
            element={<PrescriptionDetails />}
          />
          <Route
            path="/pharmacy/prescriptions/orders/"
            element={<RefillOrders />}
          />
          <Route
            path="/pharmacy/prescriptions/order-details/:id/"
            element={<OrderDetails />}
          />
          <Route path="/pharmacy/refill-orders/" element={<RefillOrders />} />
          <Route
            path="/pharmacy/order-history/"
            element={<OrderHistoryWithSearch />}
          />
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="accounts">
            <Route path="signup" element={<SignupForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
