import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "../components/searchBar/SearchBar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "../components/button/Button";
import CreateOffice from "./CreateOffice";
import {
  useDeleteOfficeMutation,
  useGetOfficesQuery,
} from "../features/officeApiSlice";
import DeleteConfirmation from "../components/DeleteConfirmation";
import EditOffice from "../components/Edit/EditOffice";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [officeToBeDelete, setOfficeToBeDelete] = useState({
    title: "office",
    itemId: "",
    name: "",
  });
  const { data, refetch, isFetching } = useGetOfficesQuery(query);
  const [deleteOffice] = useDeleteOfficeMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "officeName",
        header: "Office name",
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="table_actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOfficeId(row.original._id);
                showEditModal();
              }}
            >
              <MdEdit size={20} color="green" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDelete(true);
                setOfficeToBeDelete((prev) => ({
                  ...prev,
                  itemId: row.original._id,
                  name: row.original.officeName,
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
    data: offices,
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
    setOffices(data);
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

  const handleDeleteOffice = () => {
    deleteOffice(officeToBeDelete.itemId);
    handleCloseModal();
  };

  return (
    <div className=" w-full h-full rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search office" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <MaterialReactTable table={table} />

      {showCreate && <CreateOffice handleClick={handleCreateClick} />}
      {showEdit && <EditOffice officeId={officeId} handleClick={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={officeToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteOffice}
        />
      )}
    </div>
  );
}

export default OfficeList;
