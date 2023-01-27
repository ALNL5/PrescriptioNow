import React, { useEffect, useState } from "react";
import SearchBar from "./PharmacySearchBar";
import PrescriptionList from "./PharmacyPrescriptionList";
import { useAuthContext } from "./auth";

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
          const fetchConfig = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(prescriptionURL, fetchConfig);
          if (response.ok) {
            const data = await response.json();
            setAllPrescriptions(data);
            setPrescriptions(data);
          }
        }
        fetchPrescriptions();
    }
  }, [token, setPrescriptions]);

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="/pharmacy/prescriptions"
            >
              All prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/prescriptions/orders">
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/order-history">
              Order history
            </a>
          </li>
        </ul>
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary  me-5">
          <a
            className="nav-link"
            aria-current="page"
            href="/pharmacy/prescriptions/new"
          >
            Create prescription
          </a>
        </button>
        <SearchBar keyword={keyword} onChange={updateKeyword} />
      </div>
      <div>
        <PrescriptionList prescriptions={prescriptions} />
      </div>
    </div>
  );
};

export default PrescriptionsWithSearch;
