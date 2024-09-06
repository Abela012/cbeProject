import { useState } from "react";
import OverLay from "../components/OverLay";
import { useCreateRoleMutation } from "../features/roleApiSlice";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { toast } from "react-toastify";

function CreateRole({ handleClose }) {
  const [newRole, setNewRole] = useState({ roleName: "", roleType: "" });
  const [createRole] = useCreateRoleMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createRole(newRole).unwrap();
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
          lableName="Role Name"
          placeholder="Enter role name"
          name="roleName"
          required={true}
          autoFocus={true}
          onChange={(e) =>
            setNewRole((prev) => ({ ...prev, roleName: e.target.value }))
          }
        />
        <FormInput
          lableName="Role Type"
          placeholder="Enter role type"
          name="roleType"
          required={true}
          onChange={(e) =>
            setNewRole((prev) => ({ ...prev, roleType: e.target.value }))
          }
        />
        <Button btnName="Create"></Button>
      </form>
    </OverLay>
  );
}

export default CreateRole;
