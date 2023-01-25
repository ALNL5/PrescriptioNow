import React, { useEffect, useState } from "react";
import SearchBar from "./PharmacySearchBar";
import OrderHistory from "./PharmacyOrderHistory";

const OrderHistoryWithSearch = () => {
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
              className="nav-link"
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
            <a className="nav-link active" href="/pharmacy/order-history/">
              Order history
            </a>
          </li>
          <li>
            <SearchBar keyword={keyword} onChange={updateKeyword} />
          </li>
        </ul>
      </div>
      <div className="wrapper">
        <OrderHistory prescriptions={prescriptions} />
      </div>
    </div>
  );
};

export default OrderHistoryWithSearch;
