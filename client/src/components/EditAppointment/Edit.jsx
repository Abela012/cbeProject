import { useEffect, useState } from "react";
import styles from "./EditAppointment.module.css";
import { useRef } from "react";
import "../../App.css";
import {
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
} from "../../features/appointmentApiSlice.js";
import FormInput from "../forminput/FormInput.jsx";

function Edit({ appId, onClose }) {
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
  const { data: appointmentData, isSuccess } = useGetAppointmentQuery(appId);
  const [updateAppointmentData] = useUpdateAppointmentMutation();

  useEffect(() => {
    if (isSuccess) {
      setedit({
        _id: appointmentData._id,
        fullName: appointmentData.customerId?.fullName,
        businessName: appointmentData.customerId.businessName,
        customerEmail: appointmentData.customerId.customerEmail,
        phoneNumber: appointmentData.customerId.phoneNumber,
        officeId: appointmentData.officeId,
        startTime: appointmentData.startTime,
        endTime: appointmentData.endTime,
        category: appointmentData.category,
      });
    }
    // console.log(response.data);
  }, [appointmentData]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentData({
        id: edit._id,
        ...edit,
      }).unwrap();
      onClose();
      console.log(response);
    } catch (error) {
      console.log(response.data);
    }
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
