import api from "../api/axios.js";
import {Link} from "react-router-dom"
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { useState } from "react";


export default function Registration(){

const [customer, setCustomer] = useState({
  firstName:"" ,
  middleName: "" ,
  lastName: "" ,
  fullName: "" ,
  businessName:"" ,
  customerEmail:"" ,
  phoneNumber:"" ,
  address: "",
})

let handleSubmit = async (event)=>{
   event.preventDefault();
     const response = await api.post('/customer-registration', customer);
     console.log("Registerd Succesfully");
     setCustomer({
      firstName:"" ,
      middleName: "" ,
      lastName: "" ,
      fullName: "" ,
      businessName:"" ,
      customerEmail:"" ,
      phoneNumber:"" ,
      address: "",
     })
     
}

let handleChange = (event) =>{
let {name, value} = event.target;
setCustomer((prevValue)=>{
  return (
    {
      ...prevValue,
      [name]: value
    }
  )
})

}


   
  return (

      <form className='registration' onSubmit={handleSubmit} >
      <div className="title"><h1>Customer Registration Page</h1></div>
      <br/>
<div className="container">

      <div className='personal_info'>
        <h2>Personal Information</h2>

        <br/>
        <div className="personal_info_input">
           
            <FormInput
              placeholder="Enter First Name"
              lableName="First Name"
              inputType="text"
              name = "firstName"
              onChange = {handleChange}
              value = {customer.firstName}
              required
            />
            <FormInput
              placeholder="Enter Middle Name"
              lableName="Middle Name"
              inputType="text"
              name = "middleName"
              onChange = {handleChange}
              value = {customer.middleName}
              required
            />
            <FormInput
              placeholder="Enter Last Name"
              lableName="Last Name"
              inputType="text"
              name = "lastName"
              onChange = {handleChange}
              value = {customer.lastName}
              required
            />

        </div>
      </div>
<div className='contactInfo'>
      <h2>Contact Information</h2>
      <br/>
   <div className="contactInfoInput"> 
          <FormInput
              placeholder="Enter Customer's Email"
              lableName="Customer Email"
              inputType="email"
              name = "customerEmail"
              onChange = {handleChange}
              value = {customer.customerEmail}
              required
            />
          <FormInput
              placeholder="Enter Phone Number"
              lableName="Phone Number"
              inputType="number"
              min = {10}
              name ="phoneNumber"
              onChange = {handleChange}
              value = {customer.phoneNumber}
              required
            />
            <FormInput
              placeholder="Enter Adress"
              lableName="Adress"
              inputType="text"
              name = "address"
              onChange = {handleChange}
              value = {customer.address}
              required
            />
    </div>
</div>
</div>
<div className="business">
           <FormInput
              placeholder="Enter Business Name "
              lableName="Business Name"
              inputType="text"
              name = "businessName"
              onChange = {handleChange}
              value = {customer.businessName}
              required
              />
</div>

    <div className='register'>
        <Button className="btn-register" btnName="Register" type = "submit"/>
    </div>
        

    already registerd?
         <Link to= "/case">Create Case</Link>
      </form>

  )

}
