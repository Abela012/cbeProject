import React, {useState} from "react";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axios.js";
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Appointment() {
  
const [data,setdata] = useState({
  office_id:"",
  start_time:"",
  end_time:""
})
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await api.post("/create-appointment", data);
    console.log(response);
   
    setdata({
      office_id:"",
      start_time:"",
      end_time:""
    })
    
  };
  const notify = () => {
    if (200) {
      toast.success("registerd successfully", {
        position:"bottom-right"
      })
    } else {
      toast.error("check again", {
        position:"bottom-right"
      })
    }
     
   
  }

  return (
    <form action="" className="Hform" onSubmit={handleSubmit}>
      <FormInput
        placeholder="Enter Office id"
        lableName="Office Id"
        inputType="text"
        required
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="Start Time"
        inputType="datetime-local"
        required
      />
      <FormInput
        placeholder="Enter Office id"
        lableName="End Time"
        inputType="datetime-local"
        required
      />

      <Button className="btn-submit" btnName="Submit" type="submit" onClick={notify}/>
      <ToastContainer />
    </form>
  );
}

export default Appointment;
