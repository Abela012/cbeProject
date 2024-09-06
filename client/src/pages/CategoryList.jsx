import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../features/categoryApiSlice";
import CreateCategory from "./CreateCategory";
import EditCategory from "../components/Edit/EditCategory";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/searchBar/SearchBar";
import Button from "../components/button/Button";

function CategoryList() {
  const [categorys, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [categoryToBeDelete, setCategoryToBeDelete] = useState({
    title: "category",
    itemId: "",
    name: "",
  });
  const { data, refetch } = useGetCategoriesQuery(query);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateClick = () => {
    setShowCreate((prev) => !prev);
  };

  useEffect(() => {
    setCategories(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location, query]);

  function showEditModal() {
    setShowEdit(true);
  }
  const CloseEdit = () => {
    setShowEdit(false);
  };

  const handleCloseModal = () => {
    setShowDelete(false);
  };

  const handleDeleteCategory = () => {
    deleteCategory(categoryToBeDelete.itemId);
    handleCloseModal();
  };

  return (
    <div className=" w-full h-full rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search category" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Category name</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categorys?.map((category, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={category._id}
              >
                <td className="p-[10px]">{category.categoryName}</td>

                <td className="p-[10px]">
                  <div className="table_actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoryId(category._id);
                        showEditModal();
                      }}
                    >
                      <MdEdit size={20} color="green" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDelete(true);
                        setCategoryToBeDelete((prev) => ({
                          ...prev,
                          itemId: category._id,
                          name: category.categoryName,
                        }));
                      }}
                    >
                      <MdDelete size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCreate && <CreateCategory handleClose={handleCreateClick} />}
      {showEdit && (
        <EditCategory categoryId={categoryId} handleClick={CloseEdit} />
      )}
      {showDelete && (
        <DeleteConfirmation
          item={categoryToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteCategory}
        />
      )}
    </div>
  );
}

export default CategoryList;
