import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet';

export const homeIcon = new L.Icon({
  iconUrl:
    'http://localhost:3000/home-pin.png',
  iconSize: [30, 35],
  iconAnchor: [15, 33]
});

export const pinIcon = new L.Icon({
  iconUrl:
    'http://localhost:3000/pin.png',
  iconSize: [30, 35],
  iconAnchor: [15, 33]
});


const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([{"coordinates": [47.56483, -122.28776], "address": "4208 Rainier Ave S", "name":"Pending..."}])
  var homeCoodinates=[47.56483, -122.28776]
  useEffect(()=> {
      getDeliveries();
  },[])
async function getDeliveries() {
        // Gets data from pharmacy and customers
        const response = await fetch(`http://localhost:8001/prescriptions`)
        const response2 = await fetch(`http://localhost:8001/customers`)
        if (response.ok && response2.ok) {
            const prescriptionData = await response.json();
            const customerData = await response2.json();
            var fulldata=[]  //for the end
            // mixes the customer data in with the prescriptions
            for (var prescription of prescriptionData){
                console.log(prescription)
                for (var customer of customerData){
                    if (prescription["customer_id"]===customer["id"]){
                        prescription["name"]=customer["first_name"]+" "+customer["last_name"]
                        prescription["address"]=customer["address_1"]+", "+customer["city"]+", "+customer["state"]+", "+customer["zip"]+", "+customer["address_2"]
                        prescription["phone"]=customer["phone"]
                        if (prescription["date_delivered"]===null){
                            prescription["status"]="Undelivered"
                        }
                        else{prescription["status"]="Delivered"}
                        // using external API to convert addresses to coordinates for map (and possible routing?)
                        prescription["coordinates"]=[]
                        // IF THE PAGE DOEN'T WORK, MAKE SURE THE LINK HAS A G!: https://geocoder
                        var geoLink="https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=4Aaiz0b6Haq8HqpLQ5ld8kmJQCAAm55yrIIkaFZQUu4&searchtext="
                        var URLAddress=""
                        // converts address to link form
                        var splitAddress=prescription["address"].split(" ");
                        for (var i of splitAddress){
	                        URLAddress+=i+"%20"
                        }
                        geoLink+=URLAddress
                        console.log(geoLink)
                        const geoResponse = await fetch(geoLink)
                        if (geoResponse.ok) {
                            const geoData = await geoResponse.json();
                            // converts response to [lat, lng] and puts it in the prescription data
                            var coordinates=geoData["Response"]["View"][0]["Result"][0]["Location"]["NavigationPosition"][0]
                            prescription["coordinates"].push(coordinates["Latitude"])
                            prescription["coordinates"].push(coordinates["Longitude"])
                        }



                        fulldata.push(prescription)
                    }
                }
            }
            console.log(fulldata)
            var data=fulldata

    }
    //   let data=[
    //     {"coordinates": [47.57568, -122.28878], "address": "3146 35th Ave S, Seattle, wa, 98144", "name":"Captain Falcon"},
    //     {"coordinates": [47.5884, -122.3265], "address": "14100 Linden", "name":"Link"},
    //     {"coordinates": [47.5979, -122.3236], "address": "4525 S Warner", "name":"Mario"},
    //     {"coordinates": [47.6053, -122.3018], "address": "14000 Aurora Ave N", "name":"Samus"},

    //   ]
      setDeliveries(data)
  }



  return (
    <div className="App">
      <MapContainer center={homeCoodinates} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={homeCoodinates} icon={homeIcon}></Marker>
        {deliveries.map(i => {
          return (
            <>
              <Marker key={i.coordinates} position={i.coordinates} icon={pinIcon}></Marker>
            </>
          )
        })}
        <Polyline positions={[deliveries[deliveries.length-1]["coordinates"], homeCoodinates, deliveries[0]["coordinates"]]}/>
        <Polyline positions={deliveries.map(i => {return (i.coordinates)})}/>
      </MapContainer>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(i => {
                return (
                  <tr key={i.coordinates}>
                    <td>{ i.name }</td>
                    <td>
                      <a href={"https://maps.google.com/?q="+i.address}>{i.address}</a>
                    </td>
                    <td>{Math.floor(Math.random() * 10000)}</td>
                    <td>{i.status}</td>
                    <td>{i.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Deliveries;