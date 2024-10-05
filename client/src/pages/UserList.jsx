import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/searchBar/SearchBar.jsx";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../features/userApiSlice.js";
import EditUser from "../components/Edit/EditUser.jsx";
import { rolesList } from "../util/userRoles.js";
import { capitalizeFirstLetter } from "../util/capitalize.js";
import Button from "../components/button/Button.jsx";
import CreateUser from "./CreateUser.jsx";
import { useGetRolesQuery } from "../features/roleApiSlice.js";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userToBeDelete, setUserToBeDelete] = useState({
    title: "user",
    itemId: "",
    name: "",
  }); // hold the user to be deleted
  const location = useLocation();
  const { data, refetch, isFetching } = useGetUsersQuery(query);
  const { data: roles } = useGetRolesQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "User name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "roleType",
        header: "Role",
        Cell: ({ row }) => (
          <select
            className=" p-1 outline-none border-none cursor-pointer bg-transparent "
            defaultValue={row.original.roleType?._id}
            onChange={(e) => handleCaseStateChange(e, row.original._id)}
          >
            {roles?.map((role) => {
              if (role.roleType == row.original.roleType?.roleType) {
                return (
                  <option key={role._id} value={role._id}>
                    {role.roleName}
                  </option>
                );
              } else {
                return (
                  <option key={role._id} value={role._id}>
                    {role.roleName}
                  </option>
                );
              }
            })}
          </select>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="table_actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUserId(row.original._id);
                showEditModal();
              }}
            >
              <MdEdit size={20} color="green" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDelete(true);
                setUserToBeDelete((prev) => ({
                  ...prev,
                  itemId: row.original._id,
                  name: row.original.name,
                }));
              }}
            >
              <MdDelete size={20} color="red" />
            </button>
          </div>
        ),
      },
    ],
    [roles]
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
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

  function showEditModal() {
    setShowEdit(true);
  }

  useEffect(() => {
    setUsers(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location, query]);

  const handleCloseModal = () => {
    setShowDelete(false);
  };
  const CloseEdit = () => {
    setShowEdit(false);
  };
  const handleCaseStateChange = async (e, userId) => {
    try {
      const response = await updateUserRole({
        role: e.target.value,
        id: userId,
      }).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userToBeDelete.itemId).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className=" w-full h-full rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar className=" !w-full" placeholder="Search by name or email" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <MaterialReactTable table={table} />

      {showCreate && <CreateUser handleClose={handleCreateClick} />}
      {showEdit && <EditUser userId={userId} onClose={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={userToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default UserList;
