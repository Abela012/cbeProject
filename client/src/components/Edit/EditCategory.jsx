import { useEffect, useState } from "react";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../features/categoryApiSlice";
import { toast } from "react-toastify";
import OverLay from "../OverLay";
import FormInput from "../forminput/FormInput";
import Button from "../button/Button";

function EditCategory({ categoryId, handleClick }) {
  const [newCategory, setNewCategory] = useState({
    id: categoryId,
    categoryName: "",
  });
  const { data } = useGetCategoryQuery(categoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    setNewCategory((prev) => ({ ...prev, categoryName: data?.categoryName }));
  }, [data]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await updateCategory(newCategory).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
      handleClick();
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };
  return (
    <OverLay handleClick={handleClick}>
      <form
        className="flex gap-3 items-end bg-white p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <FormInput
          lableName="Category Name"
          placeholder="Enter category name"
          name="categoryName"
          value={newCategory.categoryName}
          onChange={(e) =>
            setNewCategory((prev) => ({
              ...prev,
              categoryName: e.target.value,
            }))
          }
        />
        <Button>Update</Button>
      </form>
    </OverLay>
  );
}

export default EditCategory;
