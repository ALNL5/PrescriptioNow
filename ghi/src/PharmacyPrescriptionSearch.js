import React, { useEffect, useState } from "react";
import SearchBar from './SearchBar';
import PrescriptionList from "./PharmacyPrescriptionList";
import { Link } from "react-router-dom";


const PrescriptionsWithSearch = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [keyword, setKeyword] = useState('');


  async function fetchPrescriptions() {
        const response = await fetch("http://localhost:8003/prescriptions/")
        if (response.ok) {
            const data = await response.json();
            setAllPrescriptions(data);
            setPrescriptions(data);
        }
    }

  const updateKeyword = (keyword) => {
    const filtered = allPrescriptions.filter(prescription => {
     return `${prescription.name.toLowerCase()}
              ${prescription.rx_number.toLowerCase()}`
              .includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setPrescriptions(filtered);
 }

 useEffect(() => {
  fetchPrescriptions();
 }, [])

  return (
    <>
    <div className="wrapper">
      <SearchBar keyword={keyword} onChange={updateKeyword}/>
      <button type="button" className="btn btn-outline-primary">
        <Link to={"orders/"}>Ordered prescriptions</Link>
      </button>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
    </>
  )
}

export default PrescriptionsWithSearch;
