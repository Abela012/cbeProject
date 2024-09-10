import { useState } from "react";
import FormInput from "../components/forminput/FormInput.jsx";
import Button from "../components/button/Button.jsx";
import { toast } from "react-toastify";

import { useCreateAppointmentMutation } from "../features/appointmentApiSlice.js";
import { useGetCustomerMutation } from "../features/customerApiSlice.js";
import OverLay from "../components/OverLay.jsx";
import SearchBarWoutParams from "../components/searchBar/SearchBarWoutParams.jsx";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice.js";

function Appointment({ customerId, onClose }) {
  const user = useSelector(getCurrentUser);
  const [customers, setCustomers] = useState([]);
  const [createAppointment] = useCreateAppointmentMutation();
  const [customer] = useGetCustomerMutation();

  const [appointmentData, setAppointmentData] = useState({
    staffId: user._id,
    officeId: user.officeId,
    customerId: "",
    customerEmail: "",
    file: "",
  });

  const [resetFilter, setResetFilter] = useState(false);

  const handleSearch = async (query) => {
    const response = await customer({ query });
    setCustomers(response.data);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("staffId", appointmentData.staffId);
      formData.append("officeId", appointmentData.officeId);
      formData.append("customerId", appointmentData.customerId);
      formData.append("customerEmail", appointmentData.customerEmail);
      formData.append("file", appointmentData.file);
      const resonse = await createAppointment(formData).unwrap();
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
        file: "",
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAppointmentData((prev) => {
      if (name == "file") {
        return {
          ...prev,
          [name]: files[0],
        };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  return (
    <OverLay handleClick={onClose}>
      <form
        className=" flex flex-col gap-[15px] w-full max-w-[400px] bg-white p-5 rounded-[10px] "
        onSubmit={handleSubmit}
      >
        <div>
          <SearchBarWoutParams
            className="!w-full"
            placeholder="Search customer by phone or email"
            reset={resetFilter}
            autoFocus={true}
            searchItem={handleSearch}
          />
          <div className=" flex flex-col gap-1 mt-1 max-h-48 overflow-y-auto">
            {customers &&
              customers?.map((customer) => {
                return (
                  <div
                    className="flex flex-col bg-[rgb(241,241,241)] p-[5px] rounded-[5px] cursor-pointer"
                    key={customer._id}
                    onClick={() => {
                      setAppointmentData((prev) => ({
                        ...prev,
                        customerId: customer._id,
                        customerEmail: customer.customerEmail,
                      }));
                      setCustomers([]);
                      setResetFilter(true);
                    }}
                  >
                    <span>{customer.fullName}</span>
                    <span>{customer.customerEmail}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <FormInput
          inputType="text"
          required={true}
          lableName="Customer"
          value={appointmentData.customerEmail}
          disabled={true}
          inputName="customer"
        />

        <FormInput
          placeholder=""
          lableName="Related file"
          inputType="file"
          name="file"
          // value={appointmentData.file}
          onChange={handleChange}
        />

        <Button className="" btnName="Submit" type="submit" />
      </form>
    </OverLay>
  );
}

export default Appointment;
