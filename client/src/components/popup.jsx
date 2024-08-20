import { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";
import { useGetAppointmentQuery } from "../features/appointmentApiSlice";
import { useGetCaseQuery } from "../features/caseApiSlice";
import Button from "./button/Button";

function Popup({ appointmentId, caseId, onClose }) {
  const [pop, setPop] = useState([]);
  if (appointmentId) {
    const { data: appointmentData, isSuccess: isSuccessAppointment } =
      useGetAppointmentQuery(appointmentId);
    useEffect(() => {
      if (isSuccessAppointment) {
        setPop(appointmentData);
      }
    }, [appointmentData]);
  } else {
    const { data: caseData, isSuccess: isSuccessCase } =
      useGetCaseQuery(caseId);
    useEffect(() => {
      if (isSuccessCase) {
        setPop(caseData);
      }
    }, [caseData]);
  }

  //   console.log(pop);

  return (
    <OverLay handleClick={onClose}>
      <div className=" relative bg-white rounded-[5px] p-5 leading-[1.5] shadow-sm w-[400px] h-[300px] flex items-center justify-center ">
        <Button
          onClick={() => {
            onClose();
          }}
          className=" absolute right-[5px] top-[5px] p-1 border-none !bg-transparent"
        >
          <IoIosClose size={26} />
        </Button>

        <div className="">
          <div>Name: {pop.customerId?.fullName}</div>

          <div>Business Name: {pop.customerId?.businessName}</div>

          <div>Email: {pop.customerId?.customerEmail}</div>

          <div>Phone: {pop.customerId?.phoneNumber}</div>

          <div>Office ID: {pop?.officeId}</div>

          <div>Start Time: {new Date(pop.startTime).toLocaleString()}</div>

          <div>End Time: {new Date(pop.endTime).toLocaleString()}</div>

          <div>Catagory: {pop.category}</div>
        </div>
      </div>
    </OverLay>
  );
}

export default Popup;
