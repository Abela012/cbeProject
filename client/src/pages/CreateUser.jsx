import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useCreateUserMutation } from "../features/userApiSlice";
import { useGetOfficesQuery } from "../features/officeApiSlice";
import OverLay from "../components/OverLay";
import { useGetRolesQuery } from "../features/roleApiSlice";

// const roles = [
//   { name: "President", role: 1112 },
//   { name: "VP", role: 8910 },
//   { name: "Bored Members", role: 4567 },
//   { name: "COS", role: 9801 },
//   { name: "Secretary", role: 1234 },
//   { name: "Staff", role: 4321 },
//   { name: "Admin", role: 1000 },
// ];

function CreateUser({ handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { error }] = useCreateUserMutation();
  const { data: officeList } = useGetOfficesQuery();
  const { data: roles } = useGetRolesQuery();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    officeId: "",
    password: "",
    roleType: null,
  });
  const [offices, setOffice] = useState();

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

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
      handleClose();
    }
  };

  return (
    <OverLay handleClick={handleClose}>
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
        <div className="relative flex flex-col">
          <label className=" font-bold mb-[5px] text-sm" htmlFor="">
            Office
          </label>
          <select
            className="case_category p-[10px] outline-none rounded-md border-solid border-2 border-br-gray"
            required={true}
            value={newUser.officeId}
            name="officeId"
            onChange={handleChange}
          >
            <option value="">Select Office</option>
            {offices?.map((office) => (
              <option key={office._id} value={office._id}>
                {office.officeName}
              </option>
            ))}
          </select>
        </div>

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
          {roles?.map((role) => (
            <div className="flex gap-1" key={role._id}>
              <FormInput
                type="radio"
                name="roleType"
                checked={newUser.roleType == role._id}
                value={role._id}
                onChange={handleChange}
              />
              <span>{role.roleName}</span>
            </div>
          ))}
        </div>
        <div className=" w-full flex items-center justify-center font-bold ">
          <Button className="w-full sm:w-1/2" btnName="Create" />
        </div>
      </form>
    </OverLay>
  );
}

export default CreateUser;
