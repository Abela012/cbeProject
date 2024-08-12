import React, { useEffect, useState } from "react";
import FormInput from "../components/forminput/FormInput";
import TextArea from "../components/textArea/TextArea";
import SearchBar from "../components/searchBar/SearchBar";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";
import Button from "../components/button/Button";

function Case() {
  const [newCase, setNewCase] = useState({
    customerId: "",
    email: "",
    caseCategory: "",
    subject: "",
  });

  const [customers, setCustomers] = useState([
    {
      businessName: "",
      createdAt: "",
      customerName: "",
      email: "",
      phone: "",
      updatedAt: "",
      _id: "",
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

  useEffect(() => {
    async function getCustomer() {
      const response = await api.get(`/get-customer?q=${query}`);
      setCustomers(response.data);
    }
    getCustomer();
  }, [query]);

  useEffect(() => {
    async function getCategory() {
      const response = await api.get("/get-categories");
      setCategories(response.data);
    }
    getCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCase((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="Hform"
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(newCase);
        const response = await api.post("/create-case", newCase);
        console.log(response.data);
      }}
    >
      <div>
        <SearchBar
          className="full_width"
          placeholder="Search customer by name or email"
        />
        <div className="customer_search_result">
          {customers &&
            customers.map((customer) => {
              return (
                <div
                  className="result_item"
                  key={customer._id}
                  onClick={() => {
                    setNewCase((prev) => ({
                      ...prev,
                      customerId: customer._id,
                      email: customer.email,
                    }));
                    setCustomers([]);
                  }}
                >
                  <span>{customer.customerName}</span>
                  <span>{customer.email}</span>
                </div>
              );
            })}
        </div>
      </div>
      <FormInput
        inputType="text"
        required={true}
        lableName="Customer"
        value={newCase.email}
        disabled={true}
        inputName="customer"
      />
      <div className="forminput">
        <select
          className="case_category"
          required={true}
          value={newCase.caseCategory}
          name="caseCategory"
          onChange={handleChange}
        >
          <option value="">Select Case category</option>
          {categories.map((category) => (
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

      <Button className="btn-submit" btnName="Create" type="submit" />
    </form>
  );
}

export default Case;
