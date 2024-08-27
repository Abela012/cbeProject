import { useEffect, useState } from "react";
import FormInput from "../components/forminput/FormInput";
import TextArea from "../components/textArea/TextArea";
import SearchBar from "../components/searchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import Button from "../components/button/Button";
import { useCreateCaseMutation } from "../features/caseApiSlice";
import { useGetCustomerMutation } from "../features/customerApiSlice";
import { useGetCategoriesMutation } from "../features/categoryApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";

function Case() {
  const user = useSelector(getCurrentUser);
  const [newCase, setNewCase] = useState({
    userId: user._id,
    customerId: "",
    customerEmail: "",
    caseCategory: "",
    subject: "",
  });

  const [customers, setCustomers] = useState([
    {
      _id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      businessName: "",
      customerEmail: "",
      phoneNumber: "",
      address: "",
      catagory: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const [categories, setCategories] = useState([
    {
      _id: "",
      categoryName: "",
    },
  ]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [createCase, { error }] = useCreateCaseMutation();
  const [customer] = useGetCustomerMutation();
  const [category] = useGetCategoriesMutation();

  useEffect(() => {
    async function getCustomer() {
      const response = await customer({ query });
      setCustomers(response.data);
    }
    getCustomer();
  }, [query]);

  useEffect(() => {
    async function getCategory() {
      const response = await category();
      setCategories(response.data);
    }
    getCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCase(newCase).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      setNewCase({
        userId: "",
        customerId: "",
        customerEmail: "",
        caseCategory: "",
        subject: "",
      });
    }
  };

  return (
    <form
      className=" flex flex-col gap-4 bg-white p-5 rounded-lg w-[80%] "
      onSubmit={handleSubmit}
    >
      <div>
        <SearchBar
          className="!w-full"
          placeholder="Search customer by phone or email"
        />
        <div className=" flex flex-col gap-1 mt-1 max-h-48 overflow-y-auto">
          {customers &&
            customers?.map((customer) => {
              return (
                <div
                  className="flex flex-col bg-[rgb(241,241,241)] p-[5px] rounded-[5px] cursor-pointer"
                  key={customer._id}
                  onClick={() => {
                    setNewCase((prev) => ({
                      ...prev,
                      customerId: customer._id,
                      customerEmail: customer.customerEmail,
                    }));
                    setCustomers([]);
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
        value={newCase.customerEmail}
        disabled={true}
        inputName="customer"
      />
      <div className="relative flex flex-col">
        <select
          className="case_category p-[10px] outline-none rounded-[5px] border-solid border-2 border-[#f1f1f1]"
          required={true}
          value={newCase.caseCategory}
          name="caseCategory"
          onChange={handleChange}
        >
          <option value="">Select Case category</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <FormInput
        lableName="Subject"
        inputName="subject"
        inputType="text"
        placeholder="Enter case subject"
        value={newCase.subject}
        required={true}
        name="subject"
        onChange={handleChange}
      />
      {/* <TextArea handleInputChange={() => {}} /> */}
      <div className=" w-full flex items-center justify-center font-bold ">
        <Button className="w-full sm:w-1/2" btnName="Create" type="submit" />
      </div>
    </form>
  );
}

export default Case;
