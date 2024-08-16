import React, { useState } from "react";
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateAppointmentMutation } from "../features/appointmentApiSlice.js";

function Appointment() {
  const [createAppointment] = useCreateAppointmentMutation();
  const [appointmentData, setAppointmentData] = useState({
    officeId: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      createAppointment(appointmentData);

      toast.success("registerd successfully", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error("check again", {
        position: "bottom-right",
      });
    } finally {
      setAppointmentData({
        officeId: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action="" className="Hform" onSubmit={handleSubmit}>
      <FormInput
        placeholder="Enter Office id"
        lableName="Office Id"
        inputType="text"
        required
        name="officeId"
        value={appointmentData.officeId}
        onChange={handleChange}
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="Start Time"
        inputType="datetime-local"
        required
        name="startTime"
        value={appointmentData.startTime}
        onChange={handleChange}
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="End Time"
        inputType="datetime-local"
        required
        name="endTime"
        value={appointmentData.endTime}
        onChange={handleChange}
      />

      <Button className="btn-submit" btnName="Submit" type="submit" />
      <ToastContainer />
    </form>
  );
}

export default Appointment;
