import { useState } from "react";
import { useCreateCategoryMutation } from "../features/categoryApiSlice";
import OverLay from "../components/OverLay";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { toast } from "react-toastify";

function CreateCategory({ handleClose }) {
  const [newCategory, setNewCategory] = useState({ categoryName: "" });
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createCategory(newCategory).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      handleClose();
    }
  };

  return (
    <OverLay handleClick={handleClose}>
      <form
        className="flex gap-3 items-end bg-white p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <FormInput
          lableName="Category Name"
          placeholder="Enter category name"
          name="categoryName"
          required={true}
          autoFocus={true}
          onChange={(e) => setNewCategory({ categoryName: e.target.value })}
        />
        <Button btnName="Create"></Button>
      </form>
    </OverLay>
  );
}

export default CreateCategory;
