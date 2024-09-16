import { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import OverLay from "./OverLay";
import { useGetAppointmentQuery } from "../features/appointmentApiSlice";
import { useGetCaseQuery } from "../features/caseApiSlice";
import Button from "./button/Button";

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

  console.log(pop);
  function isValidBase64(base64String) {
    // Regular expression to validate Base64 strings
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(base64String);
  }
  function base64ToBlob(base64Data) {
    console.log(base64Data);
    if (
      !isValidBase64(
        "QzpcUFJPR1JBfjFcS01TcGljb1x0ZW1wXDFmZjY0ZjI3ZmUxNDc4MWM3ZTMxYzliZGI4ZDkzNmM3"
      )
    ) {
      throw new Error("Invalid Base64 string");
    }
    if (base64Data) {
      const byteCharacters = atob(
        "QzpcUFJPR1JBfjFcS01TcGljb1x0ZW1wXDFmZjY0ZjI3ZmUxNDc4MWM3ZTMxYzliZGI4ZDkzNmM3"
      );
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray]);
    }
  }
  function openFile(base64Data) {
    const blob = base64ToBlob(base64Data);
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  return (
    <OverLay handleClick={onClose}>
      <div className=" relative bg-white rounded-[5px] p-5 leading-[1.5] shadow-sm w-[400px] h-max flex items-center ">
        <Button
          onClick={() => {
            onClose();
          }}
          className=" absolute right-[5px] top-[5px] p-1 border-none !bg-transparent"
        >
          <IoIosClose size={26} />
        </Button>

        {caseId ? (
          <div className="">
            <div>Name: {pop.customerId?.fullName}</div>

            <div>Business Name: {pop.customerId?.businessName}</div>

            <div>Email: {pop.customerId?.customerEmail}</div>

            <div>Phone: {pop.customerId?.phoneNumber}</div>

            <div>Case number: {pop.caseNumber}</div>

            <div>Subject: {pop.subject}</div>

            <div>Description: {pop.description}</div>

            <div>
              Currently assigned to: {pop?.currentAssignedOfficeId?.officeName}
            </div>

            <div>
              Assignment history:
              {pop?.assignedOfficeIdList?.map((office) => (
                <p key={office._id}>{office?.officeName}</p>
              ))}
            </div>

            <div>Catagory: {pop.category?.categoryName}</div>
          </div>
        ) : (
          <div className="">
            <div>Name: {pop.customerId?.fullName}</div>

            <div>Business Name: {pop.customerId?.businessName}</div>

            <div>Email: {pop.customerId?.customerEmail}</div>

            <div>Phone: {pop.customerId?.phoneNumber}</div>

            <div>
              Start Time:
              {pop.startTime
                ? new Date(pop.startTime).toLocaleString()
                : "Not set"}
            </div>

            <div>
              End Time:
              {pop.endTime ? new Date(pop.endTime).toLocaleString() : "Not set"}
            </div>
            {pop.appointmentFile?.fileName && (
              <div>
                <p>{pop.appointmentFile?.fileName}</p>
                <a
                  href="#"
                  onClick={() => {
                    openFile(pop.appointmentFile?.file.data);
                  }}
                >
                  File
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </OverLay>
  );
}

export default Popup;
