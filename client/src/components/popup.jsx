import React from "react";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/axios";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";

function Popup({ appointmentId, caseId, onClose }) {
  const [pop, setPop] = useState([]);

  useEffect(() => {
    if (appointmentId) {
      api
        .get(`/get-appointment/${appointmentId}`)
        .then((response) => {
          setPop(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .get(`/get-case/${caseId}`)
        .then((response) => {
          setPop(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //   console.log(pop);

  return (
    <OverLay handleClick={onClose}>
      <div className="pops">
        <button
          onClick={() => {
            onClose();
          }}
          className="closepop"
        >
          <IoIosClose size={26} />
        </button>

        <div>Name: {pop.customerId?.customerName}</div>

        <div> {pop.customerId?.businessName}</div>

        <div>Email: {pop.customerId?.email}</div>

        <div>Phone: {pop.customerId?.phone}</div>

        <div>Office ID: {pop?.officeId}</div>

        <div>start Time: {new Date(pop.startTime).toLocaleString()}</div>

        <div>End Time: {new Date(pop.endTime).toLocaleString()}</div>

        <div>Catagory: {pop.category}</div>
      </div>
    </OverLay>
  );
}

export default Popup;

