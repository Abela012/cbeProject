import { useEffect, useState } from "react";
import "../../App.css";
import {
  useGetCaseQuery,
  useUpdateCaseMutation,
} from "../../features/caseApiSlice.js";
import FormInput from "../forminput/FormInput.jsx";
import { toast } from "react-toastify";
import OverLay from "../OverLay.jsx";
import TextArea from "../textArea/TextArea.jsx";
import Button from "../button/Button.jsx";
import { useGetCategoriesQuery } from "../../features/categoryApiSlice.js";

function EditCase({ caseId, onClose }) {
  const [editCase, setEditCase] = useState({
    subject: "",
    description: "",
    dueDate: "",
  });
  const { data: caseData, isSuccess } = useGetCaseQuery(caseId);
  const [updateCaseData] = useUpdateCaseMutation();

  useEffect(() => {
    if (isSuccess) {
      setEditCase({
        id: caseData._id,
        subject: caseData.subject,
        description: caseData.description,
        dueDate: caseData.dueDate,
        category: caseData.category,
      });
    }
    console.log(caseData);
  }, [caseData]);

  const [categories, setCategories] = useState([
    {
      _id: "",
      categoryName: "",
    },
  ]);
  const { data: categoryList } = useGetCategoriesQuery();

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCase((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCaseData(editCase).unwrap();
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
        onSubmit={handleSubmit}
      >
        <div className="relative flex flex-col">
          <select
            className="case_category p-[10px] outline-none rounded-[5px] border-solid border-2 border-[#f1f1f1]"
            defaultValue={editCase.category?._id}
            required={true}
            name="category"
            onChange={handleChange}
          >
            {categories?.map((category) => {
              if (editCase.category?._id == category._id) {
                return (
                  <option key={category._id} value={category._id} selected>
                    {category.categoryName}
                  </option>
                );
              } else {
                return (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <FormInput
          lableName="Subject"
          inputName="subject"
          inputType="text"
          placeholder="Enter case subject"
          value={editCase.subject}
          required={true}
          name="subject"
          onChange={handleChange}
        />

        <TextArea
          handleInputChange={handleChange}
          name="description"
          placeholder="Enter description"
          lableName="Description"
          inputName="description"
          value={editCase.description}
        />

        <FormInput
          lableName="Due Date"
          inputName="dueDate"
          name="dueDate"
          min={new Date().toISOString().slice(0, 11) + "08:00"}
          type="datetime-local"
          required={true}
          value={editCase.dueDate}
          onChange={handleChange}
        />

        <Button type="submit">Edit</Button>
      </form>
    </OverLay>
  );
}

export default EditCase;
