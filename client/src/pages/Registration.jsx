import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRegisterCustomerMutation } from "../features/customerApiSlice.js";

export default function Registration() {
  const [registerCustomer] = useRegisterCustomerMutation();
  const [customer, setCustomer] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fullName: "",
    businessName: "",
    customerEmail: "",
    phoneNumber: "",
    address: "",
  });

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log(customer);
      const response = await registerCustomer({ ...customer }).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      setCustomer({
        firstName: "",
        middleName: "",
        lastName: "",
        fullName: "",
        businessName: "",
        customerEmail: "",
        phoneNumber: "",
        address: "",
      });
    }
  };

  let handleChange = (event) => {
    let { name, value } = event.target;
    setCustomer((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <form
      className=" flex flex-col gap-4 w-full bg-white p-5 rounded-lg "
      onSubmit={handleSubmit}
    >
      <div className=" text-center">
        <h1 className=" font-bold">Customer Registration Page</h1>
      </div>
      <div className=" w-full flex gap-5 flex-col sm:flex-row">
        <div className=" w-full">
          <h2 className=" font-bold">Personal Information</h2>
          <div className=" flex flex-col">
            <FormInput
              placeholder="Enter First Name"
              lableName="First Name"
              inputType="text"
              name="firstName"
              onChange={handleChange}
              value={customer.firstName}
              required
            />
            <FormInput
              placeholder="Enter Middle Name"
              lableName="Middle Name"
              inputType="text"
              name="middleName"
              onChange={handleChange}
              value={customer.middleName}
              required
            />
            <FormInput
              placeholder="Enter Last Name"
              lableName="Last Name"
              inputType="text"
              name="lastName"
              onChange={handleChange}
              value={customer.lastName}
              required
            />
          </div>
        </div>

        <div className=" w-full">
          <h2 className=" font-bold">Contact Information</h2>
          <div className="flex flex-col">
            <FormInput
              placeholder="Enter Customer's Email"
              lableName="Customer Email"
              inputType="email"
              name="customerEmail"
              onChange={handleChange}
              value={customer.customerEmail}
              required
            />
            <FormInput
              placeholder="Enter Phone Number"
              lableName="Phone Number"
              inputType="number"
              min={10}
              name="phoneNumber"
              onChange={handleChange}
              value={customer.phoneNumber}
              required
            />
            <FormInput
              placeholder="Enter Address"
              lableName="Address"
              inputType="text"
              name="address"
              onChange={handleChange}
              value={customer.address}
              required
            />
          </div>
        </div>
      </div>

      <div className="">
        <FormInput
          placeholder="Enter Business Name "
          lableName="Business Name"
          inputType="text"
          name="businessName"
          onChange={handleChange}
          value={customer.businessName}
          required
        />
      </div>
      <div className=" w-full flex items-center justify-center font-bold ">
        <Button className="w-full sm:w-1/2" btnName="Register" type="submit" />
      </div>
    </form>
  );
}
