import { useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useCreateUserMutation } from "../features/userApiSlice";

const roles = [
  { name: "President", role: 1112 },
  { name: "VP", role: 8910 },
  { name: "Bored Members", role: 4567 },
  { name: "COS", role: 9801 },
  { name: "Secretary", role: 1234 },
  { name: "Staff", role: 4321 },
  { name: "Admin", role: 1000 },
];
function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { error }] = useCreateUserMutation();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    officeId: "",
    password: "",
    roleType: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(newUser);
      const response = await createUser(newUser).unwrap();

      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      setNewUser({
        name: "",
        email: "",
        officeId: "",
        password: "",
        roleType: null,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-2 bg-white p-5 rounded-lg w-[80%]"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center font-bold text-lg">Create user</h2>
      <FormInput
        placeholder="Enter user name"
        lableName="User name"
        type="text"
        name="name"
        value={newUser.name}
        required
        onChange={handleChange}
      />
      <FormInput
        placeholder="Enter email"
        lableName="Email"
        type="email"
        name="email"
        value={newUser.email}
        required
        onChange={handleChange}
      />
      <FormInput
        placeholder="Enter office id"
        lableName="Office Id"
        type="text"
        name="officeId"
        value={newUser.officeId}
        required
        onChange={handleChange}
      />
      <div className="relative">
        <FormInput
          placeholder="Enter password"
          lableName="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={newUser.password}
          required
          onChange={handleChange}
        />
        <span
          className=" cursor-pointer absolute right-2 top-[55%]"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        {roles.map((role) => (
          <div className="flex gap-1" key={role.name}>
            <FormInput
              type="radio"
              name="roleType"
              checked={newUser.roleType == role.role}
              value={role.role.toString()}
              onChange={handleChange}
            />
            <span>{role.name}</span>
          </div>
        ))}
      </div>
      <div className=" w-full flex items-center justify-center font-bold ">
        <Button className="w-full sm:w-1/2" btnName="Create" />
      </div>
    </form>
  );
}

export default CreateUser;
