import { useEffect, useState } from "react";
import FormInput from "../components/forminput/FormInput.jsx";
import TextArea from "../components/textArea/TextArea.jsx";
import Button from "../components/button/Button";
import { useCreateCaseMutation } from "../features/caseApiSlice";
import { useGetCategoriesQuery } from "../features/categoryApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import OverLay from "../components/OverLay";

function Case({ customerId, appointmentId, handleClose }) {
  const user = useSelector(getCurrentUser);
  const [newCase, setNewCase] = useState({
    userId: user._id,
    officeId: user.officeId,
    appointmentId: appointmentId,
    customerId: customerId,
    caseCategory: "",
    subject: "",
    description: "",
  });

  const [categories, setCategories] = useState([
    {
      _id: "",
      categoryName: "",
    },
  ]);

  const [createCase, { error }] = useCreateCaseMutation();
  const { data: categoryList } = useGetCategoriesQuery();

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

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
      handleClose();
    }
  };

  return (
    <OverLay handleClick={handleClose}>
      <form
        className=" flex flex-col gap-4 bg-white p-5 rounded-lg w-[80%] sm:w-[400px] "
        onSubmit={handleSubmit}
      >
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

        <TextArea
          handleInputChange={handleChange}
          name="description"
          placeholder="Enter description"
          lableName="Description"
          inputName="description"
        />
        <div className=" w-full flex items-center justify-center font-bold ">
          <Button className="w-full sm:w-1/2" btnName="Create" type="submit" />
        </div>
      </form>
    </OverLay>
  );
}

export default Case;
