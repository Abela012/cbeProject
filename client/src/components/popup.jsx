import React from "react";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";
import { useGetAppointmentMutation } from "../features/appointmentApiSlice";
import { useGetCaseMutation } from "../features/caseApiSlice";

function Popup({ appointmentId, caseId, onClose }) {
  const [pop, setPop] = useState([]);
  const [getAppointmentData] = useGetAppointmentMutation();
  const [getCaseData] = useGetCaseMutation();

  useEffect(() => {
    async function loadData() {
      if (appointmentId) {
        const response = await getAppointmentData(appointmentId);
        // api
        //   .get(`/get-appointment/${appointmentId}`)
        //   .then((response) => {
        setPop(response.data);
        // })
        // .catch((err) => console.log(err));
      } else {
        const response = await getCaseData(caseId);
        // api
        //   .get(`/get-case/${caseId}`)
        //   .then((response) => {
        setPop(response.data);
        // })
        // .catch((err) => console.log(err));
      }
    }
    loadData();
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

        <div>Name: {pop.customerId?.fullName}</div>

        <div>Business Name: {pop.customerId?.businessName}</div>

        <div>Email: {pop.customerId?.customerEmail}</div>

        <div>Phone: {pop.customerId?.phoneNumber}</div>

        <div>Office ID: {pop?.officeId}</div>

        <div>Start Time: {new Date(pop.startTime).toLocaleString()}</div>

        <div>End Time: {new Date(pop.endTime).toLocaleString()}</div>

        <div>Catagory: {pop.category}</div>
      </div>
    </OverLay>
  );
}

export default Popup;
