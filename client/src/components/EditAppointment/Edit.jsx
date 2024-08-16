import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError";
import { useForm } from "react-hook-form";
import api from "../../api/axios.js";
import styles from "./EditAppointment.module.css";
import { useRef } from "react";
import "../../App.css";
import { IoIosClose } from "react-icons/io";
import {
  useGetAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../../features/appointmentApiSlice.js";
import FormInput from "../forminput/FormInput.jsx";

function Edit({ appId, onClose, setRefetch }) {
  
  const [edit, setedit] = useState({
    _id: "",
    fullName: "",
    businessName: "",
    customerEmail: "",
    phoneNumber: "",
    officeId: "",
    startTime: "",
    endTime: "",
    category: "",
  });
  const [getAppointmentData] = useGetAppointmentMutation();
  const [updateAppointmentData] = useUpdateAppointmentMutation();

  useEffect(() => {
    async function getAppointment() {
      const response = await getAppointmentData(appId);

      // const response = await api.get(`/get-appointment/${appId}`)
      setedit({
        _id: response.data._id,
        fullName: response.data.customerId?.fullName,
        businessName: response.data.customerId.businessName,
        customerEmail: response.data.customerId.customerEmail,
        phoneNumber: response.data.customerId.phoneNumber,
        officeId: response.data.officeId,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        category: response.data.category,
      });
      // console.log(response.data);
    }
    getAppointment();
  }, []);

  

  const submit = async (e) => {
    e.preventDefault();
    const response = await updateAppointmentData({ id: edit._id, edit });
    //  const response = await api.patch(`/update-appointment/${edit._id}`, edit);
    if (response.status === 200) {
      onClose();
    }
    setRefetch(true);
    // console.log(response);
  };

  const modalRef = useRef(null);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div className={styles.edit} ref={modalRef} onClick={closeModal}>
      <form action="" className="Hform edit" onSubmit={submit}>
      <div className="inputs_wrapper">
      <div className="personalinfo">
      <FormInput
        lableName="Customer Name"
         placeholder="Enter customer name"
         type="text"
         value={edit.fullName}
         onChange={(e) =>
           setedit({
             ...edit,
             fullName: e.target.value,
           })
         }
         required
        />

        <FormInput
        lableName="Buissness Name"
         placeholder="Enter Buissness Name"
         type="text"
         value={edit.businessName}
         onChange={(e) =>
           setedit({
             ...edit,
             businessName: e.target.value,
           })
         }
         required
        />

        <FormInput
        lableName="Email"
         placeholder="Enter Email"
         type="text"
         value={edit.customerEmail}
         onChange={(e) =>
           setedit({
             ...edit,
             email: e.target.value,
           })
         }
         required
        />


        <FormInput
        lableName="Phone Number"
         placeholder="Enter Phone Number"
         type="tel"
         value={edit.phoneNumber}
         onChange={(e) =>
           setedit({
             ...edit,
             phone: e.target.value,
           })
         }
         required
        />
      </div>
      
      <div className="appointmentschedule">
      <FormInput
        lableName="Office Id"
         placeholder="Enter Office Id"
         type="text"
         value={edit.officeId}
         onChange={(e) =>
           setedit({
             ...edit,
             officeId: e.target.value,
           })
         }
         required
        />
        

        <FormInput
        lableName="Start Time"
         placeholder="Enter Start Time"
         type="datetime-local"
         value={edit.startTime}
         onChange={(e) =>
           setedit({
             ...edit,
             startTime: e.target.value,
           })
         }
         required
        />

        
        <FormInput
        lableName="End Time"
         placeholder="Enter End Time"
         type="datetime-local"
         value={edit.endTime}
         onChange={(e) =>
           setedit({
             ...edit,
             endTime: e.target.value,
           })
         }
         required
        />

        <FormInput
        lableName="Catagory"
         placeholder="Enter Catagory"
         type="text"
         value={edit.category}
         onChange={(e) =>
           setedit({
             ...edit,
             category: e.target.value,
           })
         }
         required
        />
      </div>

      </div>
        

        

        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edit;
