import { useState } from "react";
import FormInput from "../forminput/FormInput";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "../button/Button";
import { useUpdateUserPasswordMutation } from "../../features/userApiSlice";
import { toast } from "react-toastify";

function EditUserPassword({ userId }) {
  const [newPassword, setNewPassword] = useState({
    userId: userId,
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [updatePassword] = useUpdateUserPasswordMutation();

  function handleChange(event) {
    const { name, value } = event.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await updatePassword(newPassword).unwrap();
      setNewPassword((prev) => ({ ...prev, newPassword: "" }));
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <FormInput
          placeholder="Enter new password"
          //   lableName="New password"
          inputName="newPassword"
          name="newPassword"
          required={true}
          type={showPassword ? "text" : "password"}
          value={newPassword.newPassword}
          onChange={handleChange}
        />
        <span
          className=" cursor-pointer absolute right-2 top-[40%]"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </span>
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  );
}

export default EditUserPassword;
