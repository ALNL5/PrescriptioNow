import React, { useEffect, useState } from "react";
import SearchBar from "./PharmacySearchBar";
import PrescriptionList from "./PharmacyPrescriptionList";
import { useAuthContext } from "./auth";
import { Link } from "react-router-dom";

function PrescriptionsWithSearch() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const { token } = useAuthContext();
  const [keyword, setKeyword] = useState("");

  const updateKeyword = (keyword) => {
    const filtered = allPrescriptions.filter((prescription) => {
      return `${prescription.name.toLowerCase()}
              ${prescription.rx_number.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setKeyword(keyword);
    setPrescriptions(filtered);
  };

  useEffect(() => {
    if (token) {
      const fetchPrescriptions = async () => {
        const prescriptionURL = `${process.env.REACT_APP_PHARMACY_API_HOST}/prescriptions`;
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
          const rxToDisplay = data_rx.reduce((acc, cur) => {
            if (!acc[cur.rx_number]) {
              cur["customer_name"] = customerInfo[cur.customer_id].first_name +
                " " +
                customerInfo[cur.customer_id].last_name;
              acc[cur.rx_number] = cur;
            }
            return acc;
          }, {});
          setPrescriptions(Object.values(rxToDisplay));
          setAllPrescriptions(Object.values(rxToDisplay));
        }
      };
      fetchPrescriptions();
    }
  }, [token, setPrescriptions]);

  return (
    <div className="container d-grid gap-4 mt-5">
      <h3>Welcome, pharmacist!</h3>
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to={"/pharmacy/prescriptions"}>
              All prescriptions
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="prescriptions/orders">
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/pharmacy/order-history"}>
              Order history
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary  me-5">
          <Link className="nav-link" to={"/pharmacy/prescriptions/new"}>
            Create prescription
          </Link>
        </button>
        <SearchBar keyword={keyword} onChange={updateKeyword} />
      </div>
      <div>
        <PrescriptionList prescriptions={prescriptions} />
      </div>
    </div>
  );
}

export default PrescriptionsWithSearch;
