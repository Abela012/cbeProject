import { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";
import { useGetAppointmentQuery } from "../features/appointmentApiSlice";
import { useGetCaseQuery } from "../features/caseApiSlice";
import Button from "./button/Button";
import AppointmentDetail from "./AppointmentDetail";
import CaseDetail from "./CaseDetail";

function Popup({ appointmentId, caseId, onClose }) {
  const [pop, setPop] = useState({});

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

  // console.log(pop);

  return (
    <OverLay handleClick={onClose}>
      <div className=" relative bg-white border rounded shadow-sm h-[98vh] flex items-center ">
        <Button
          onClick={() => {
            onClose();
          }}
          className=" absolute right-[5px] top-[2px] p-1 border-none !bg-transparent z-20"
        >
          <IoIosClose size={30} />
        </Button>

        {caseId ? (
          <CaseDetail detail={pop} />
        ) : (
          <AppointmentDetail detail={pop} appointmentId={appointmentId} />
        )}
      </div>
    </OverLay>
  );
}

export default Popup;
