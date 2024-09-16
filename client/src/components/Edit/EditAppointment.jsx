import { useEffect, useState } from "react";
import "../../App.css";
import {
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
} from "../../features/appointmentApiSlice.js";
import FormInput from "../forminput/FormInput.jsx";
import { toast } from "react-toastify";
import OverLay from "../OverLay.jsx";
import Button from "../button/Button.jsx";

function EditAppointment({ appId, onClose }) {
  const [edit, setedit] = useState({
    _id: "",
    fullName: "",
    businessName: "",
    customerEmail: "",
    phoneNumber: "",
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
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  return (
    <OverLay handleClick={onClose}>
      <form
        className="flex flex-col gap-[15px] w-full max-w-[80%] bg-white p-5 rounded-[10px]"
        onSubmit={submit}
      >
        <div className=" flex flex-wrap gap-3 ">
          <div className="flex-1">
            <FormInput
              lableName="Customer Name"
              inputName="customerName"
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
              inputName="buissnessName"
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
          </div>

          <div className="flex-1">
            <FormInput
              lableName="Email"
              inputName="email"
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
              inputName="phoneNumber"
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
        </div>
        <Button type="submit" className="btn btn-submit">
          Submit
        </Button>
      </form>
    </OverLay>
  );
}

export default EditAppointment;
