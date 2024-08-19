import { useState } from "react";
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { toast } from "react-toastify";

import { useCreateAppointmentMutation } from "../features/appointmentApiSlice.js";
import OverLay from "../components/OverLay.jsx";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice.js";

function Appointment({ customerId, onClose }) {
  const user = useSelector(getCurrentUser);
  const [createAppointment] = useCreateAppointmentMutation();
  const [appointmentData, setAppointmentData] = useState({
    staffId: user._id,
    customerId: customerId,
    officeId: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const resonse = await createAppointment(appointmentData).unwrap();
      toast.success(resonse, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      setAppointmentData({
        staffId: "",
        customerId: "",
        officeId: "",
        startTime: "",
        endTime: "",
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <OverLay handleClick={onClose}>
      <form
        className=" flex flex-col gap-[15px] w-full max-w-[380px] bg-white p-5 rounded-[10px] "
        onSubmit={handleSubmit}
      >
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

        <Button className="" btnName="Submit" type="submit" />
      </form>
    </OverLay>
  );
}

export default Appointment;
