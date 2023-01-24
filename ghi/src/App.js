import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SubmitNewPrescription from "./SubmitNewPrescriptionForm.js";
import PrescriptionList from "./PharmacyPrescriptionSearch.js";
import OrderedPrescriptions from "./OrderedPrescriptions.js";
import PrescriptionDetails from "./PharmacyPrescriptionDetail.js";
import PharmacyMain from "./PharmacyMain.js";

import CustomerForm from "./CustomerSignup.js";

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
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
            path="/pharmacy/prescriptions/new"
            element={<SubmitNewPrescription />}
          />
          <Route
            path="/pharmacy/prescriptions/orders/"
            element={<OrderedPrescriptions />}
          />
          <Route
            path="/pharmacy/prescriptions/:id/"
            element={<PrescriptionDetails />}
          />
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
