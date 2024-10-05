import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../features/roleApiSlice";

import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/searchBar/SearchBar";
import Button from "../components/button/Button";
import CreateRole from "./CreateRole";
import EditRole from "../components/Edit/EditRole";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function RoleList() {
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const location = useLocation();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [roleToBeDelete, setRoleToBeDelete] = useState({
    title: "role",
    itemId: "",
    name: "",
  });
  const { data, refetch, isFetching } = useGetRolesQuery(query);
  const [deleteRole] = useDeleteRoleMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "roleName",
        header: "Role name",
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="table_actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRoleId(row.original._id);
                showEditModal();
              }}
            >
              <MdEdit size={20} color="green" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDelete(true);
                setRoleToBeDelete((prev) => ({
                  ...prev,
                  itemId: row.original._id,
                  name: row.original.roleName,
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
    data: roles,
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
    setRoles(data);
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

  const handleDeleteRole = () => {
    deleteRole(roleToBeDelete.itemId);
    handleCloseModal();
  };

  return (
    <div className=" w-full h-full rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search role" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <MaterialReactTable table={table} />

      {showCreate && <CreateRole handleClose={handleCreateClick} />}
      {showEdit && <EditRole roleId={roleId} handleClick={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={roleToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteRole}
        />
      )}
    </div>
  );
}

export default RoleList;
