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
    businessName: "",
    customerEmail: "",
    phoneNumber: "",
    address: "",
    file: "",
  });

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log(customer);
      const formData = new FormData();
      formData.append("firstName", customer.firstName);
      formData.append("middleName", customer.middleName);
      formData.append("lastName", customer.lastName);
      formData.append("businessName", customer.businessName);
      formData.append("customerEmail", customer.customerEmail);
      formData.append("phoneNuber", customer.phoneNumber);
      formData.append("address", customer.address);
      formData.append("file", customer.file);
      const response = await registerCustomer(formData).unwrap();
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
        businessName: "",
        customerEmail: "",
        phoneNumber: "",
        address: "",
        file: "",
      });
    }
  };

  let handleChange = (event) => {
    let { name, value, files } = event.target;
    setCustomer((prev) => {
      if (name == "file") {
        return {
          ...prev,
          [name]: files[0],
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  return (
    <form
      className=" flex flex-col gap-2 w-full bg-white p-5 rounded-lg "
      onSubmit={handleSubmit}
    >
      <div className=" text-center">
        <h1 className=" font-bold">Customer Registration Page</h1>
      </div>
      <div className=" w-full flex gap-3 flex-col sm:flex-row">
        <div className=" w-full">
          <h2 className=" font-bold">Personal Information</h2>
          <div className=" flex flex-col">
            <FormInput
              placeholder="Enter First Name"
              lableName="First Name"
              inputName="firstName"
              inputType="text"
              name="firstName"
              onChange={handleChange}
              value={customer.firstName}
              required
            />
            <FormInput
              placeholder="Enter Middle Name"
              lableName="Middle Name"
              inputName="middleName"
              inputType="text"
              name="middleName"
              onChange={handleChange}
              value={customer.middleName}
              required
            />
            <FormInput
              placeholder="Enter Last Name"
              lableName="Last Name"
              inputName="lastName"
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
              inputName="customerEmail"
              inputType="email"
              name="customerEmail"
              onChange={handleChange}
              value={customer.customerEmail}
              required
            />
            <FormInput
              placeholder="Enter Phone Number"
              lableName="Phone Number"
              inputName="phoneNumber"
              inputType="number"
              name="phoneNumber"
              min={10}
              onChange={handleChange}
              value={customer.phoneNumber}
              required
            />
            <FormInput
              placeholder="Enter Address"
              lableName="Address"
              inputName="address"
              inputType="text"
              name="address"
              onChange={handleChange}
              value={customer.address}
              required
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col ">
        <FormInput
          placeholder="Enter Business Name "
          lableName="Business Name"
          inputName="businessName"
          inputType="text"
          name="businessName"
          onChange={handleChange}
          value={customer.businessName}
          required
        />
        <FormInput
          placeholder="Select file "
          lableName="Select file"
          inputName="file"
          inputType="file"
          name="file"
          onChange={handleChange}
          // value={customer.file}
        />
      </div>
      <div className=" w-full flex items-center justify-center font-bold ">
        <Button className="w-full sm:w-1/2" btnName="Register" type="submit" />
      </div>
    </form>
  );
}
