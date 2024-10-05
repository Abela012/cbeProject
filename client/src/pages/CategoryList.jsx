import { useEffect, useMemo, useState } from "react";
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
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

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
  const { data, refetch, isFetching } = useGetCategoriesQuery(query);
  const [deleteCategory] = useDeleteCategoryMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "categoryName",
        header: "category name",
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="table_actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCategoryId(row.original._id);
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
                  itemId: row.original._id,
                  name: row.original.categoryName,
                }));
              }}
            >
              <MdDelete size={20} color="red" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: categorys,
    state: {
      showProgressBars: isFetching,
    },
    enableRowSelection: false,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
  });

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
      <MaterialReactTable table={table} />

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
