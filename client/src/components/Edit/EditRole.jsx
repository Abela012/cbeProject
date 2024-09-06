import { useEffect, useState } from "react";
import {
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "../../features/roleApiSlice";
import { toast } from "react-toastify";
import OverLay from "../OverLay";
import FormInput from "../forminput/FormInput";
import Button from "../button/Button";

function EditRole({ roleId, handleClick }) {
  const [newRole, setNewRole] = useState({
    id: roleId,
    roleName: "",
    roleType: "",
  });
  const { data, isLoading } = useGetRoleQuery(roleId);
  const [updateRole] = useUpdateRoleMutation();

  useEffect(() => {
    if (!isLoading) {
      setNewRole((prev) => ({
        ...prev,
        roleName: data.roleName,
        roleType: data.roleType,
      }));
    }
  }, [data]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await updateRole(newRole).unwrap();
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
          lableName="Role Name"
          placeholder="Enter role name"
          name="roleName"
          value={newRole.roleName}
          onChange={handleUpdate}
        />
        <FormInput
          lableName="Role Type"
          placeholder="Enter role type"
          name="roleType"
          value={newRole.roleType}
          onChange={handleUpdate}
        />
        <Button>Update</Button>
      </form>
    </OverLay>
  );
}

export default EditRole;
