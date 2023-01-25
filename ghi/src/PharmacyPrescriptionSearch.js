import React, { useEffect, useState } from "react";
import SearchBar from "./PharmacySearchBar";
import PrescriptionList from "./PharmacyPrescriptionList";

const PrescriptionsWithSearch = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [keyword, setKeyword] = useState("");

  async function fetchPrescriptions() {
    const response = await fetch("http://localhost:8001/prescriptions/");
    if (response.ok) {
      const data = await response.json();
      setAllPrescriptions(data);
      setPrescriptions(data);
    }
  }

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
    fetchPrescriptions();
  }, []);

  return (
    <div className="container d-grid gap-4">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              aria-current="page"
              href="/pharmacy/prescriptions/"
            >
              All prescriptions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/prescriptions/orders/">
              Refill orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pharmacy/order-history/">
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
            href="/pharmacy/prescriptions/new/"
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
