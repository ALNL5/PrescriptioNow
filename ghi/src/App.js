import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import { AuthProvider } from "./auth.js";
import SignupForm from "./SignupForm";
import Login from "./LoginForm";
import Logout from "./Logout";
import SubmitNewPrescription from "./SubmitNewPrescriptionForm.js";
import PrescriptionList from "./PharmacyPrescriptionSearch.js";
import PrescriptionDetails from "./PharmacyPrescriptionDetail.js";
import PharmacyMain from "./PharmacyMain.js";
import RefillOrders from "./PharmacyRefillOrders.js";
import OrderDetails from "./PharmacyOrderDetails.js";
import OrderHistoryWithSearch from "./PharmacyOrderHistorySearch.js";
import CustomerPrescriptionList from "./CustomerPrescriptions";
import Deliveries from "./Deliveries.jsx";
import CustomerForm from "./CustomerSignup.js";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  return null;
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "/prescriptionow");
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/pharmacy" element={<PharmacyMain />} />
            <Route
              path="/pharmacy/prescriptions"
              element={<PrescriptionList />}
            />
            <Route
              path="/pharmacy/prescriptions/new"
              element={<SubmitNewPrescription />}
            />
            <Route
              path="/pharmacy/prescriptions/:id"
              element={<PrescriptionDetails />}
            />
            <Route
              path="/pharmacy/prescriptions/orders"
              element={<RefillOrders />}
            />
            <Route
              path="/pharmacy/prescriptions/order-details/:id"
              element={<OrderDetails />}
            />
            <Route
              path="/pharmacy/order-history"
              element={<OrderHistoryWithSearch />}
            />
            <Route
              path="customers/:id"
              element={<CustomerPrescriptionList />}
            />
            <Route path="customers/new" element={<CustomerForm />} />
            <Route path="accounts">
              <Route path="signup" element={<SignupForm />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/Deliveries" element={<Deliveries />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
