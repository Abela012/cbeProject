import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../features/roleApiSlice";

import EditCategory from "../components/Edit/EditCategory";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/searchBar/SearchBar";
import Button from "../components/button/Button";
import CreateRole from "./CreateRole";
import EditRole from "../components/Edit/EditRole";

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
  const { data, refetch } = useGetRolesQuery(query);
  const [deleteRole] = useDeleteRoleMutation();

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
        <SearchBar className=" !w-full" placeholder="Search category" />
        <Button onClick={handleCreateClick}>Create</Button>
      </div>
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Role name</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles?.map((role, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={role._id}
              >
                <td className="p-[10px]">{role.roleName}</td>

                <td className="p-[10px]">
                  <div className="table_actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoleId(role._id);
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
                          itemId: role._id,
                          name: role.roleName,
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
