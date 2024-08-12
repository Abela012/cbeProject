import React from "react";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios.js";
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";

const schema = yup.object().shape({
  customer_name: yup.string().required("Customer name required"),
  buissness_name: yup.string().required("Buissness name required"),
  email: yup.string().required("Email required").email("Invalid email"),
  phone: yup
    .string()
    .required("Phone required")
    .min(10, "Invalid phone number")
    .max(10),
  office_id: yup.string().required("Office id required"),
  start_time: yup.string().required("Start time required"),
  end_time: yup.string().required("End time required"),
  category: yup.string().required("Category required"),
});

function Appointment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    const response = await api.post("/create-appointment", data);
    console.log(response);
    reset();
  };
  return (
    <form action="" className="Hform" onSubmit={handleSubmit(submit)}>
      <FormInput
        placeholder="Enter Office id"
        lableName="Office Id"
        inputType="text"
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="Start Time"
        inputType="datetime-local"
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="End Time"
        inputType="datetime-local"
      />

      <Button className="btn-submit" btnName="Submit" type="submit" />
    </form>
  );
}

export default Appointment;
