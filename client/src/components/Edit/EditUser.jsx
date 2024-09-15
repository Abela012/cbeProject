import "../../App.css";
import { useEffect, useState } from "react";
import FormInput from "../forminput/FormInput.jsx";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../features/userApiSlice.js";
import OverLay from "../OverLay.jsx";
import { toast } from "react-toastify";
import { useGetOfficesQuery } from "../../features/officeApiSlice.js";
import Button from "../button/Button.jsx";
import EditUserPassword from "./EditUserPassword.jsx";

function EditUser({ userId, onClose }) {
  const [edit, setEdit] = useState({
    _id: "",
    name: "",
    email: "",
    officeId: "",
    roleType: "",
  });
  const { data: userData, isSuccess } = useGetUserQuery(userId);
  const [updateUserData] = useUpdateUserMutation();
  const { data: officeList } = useGetOfficesQuery();
  const [offices, setOffice] = useState();
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

  useEffect(() => {
    if (isSuccess) {
      setEdit({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        officeId: userData.officeId || "",
        roleType: userData.roleType,
      });
    }
    // console.log(userData);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserData({
        id: edit._id,
        ...edit,
      }).unwrap();
      onClose();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  return (
    <OverLay handleClick={onClose}>
      <form
        className="flex flex-col gap-[15px] w-full max-w-[80%] bg-white p-5 rounded-[10px]"
        onSubmit={handleSubmit}
      >
        <FormInput
          lableName="Customer Name"
          placeholder="Enter customer name"
          type="text"
          value={edit.name}
          onChange={(e) =>
            setEdit({
              ...edit,
              name: e.target.value,
            })
          }
          required
        />

        <FormInput
          lableName="Email"
          placeholder="Enter Email"
          type="text"
          value={edit.email}
          onChange={(e) =>
            setEdit({
              ...edit,
              email: e.target.value,
            })
          }
          required
        />

        <div className="relative flex flex-col">
          <label className=" font-bold mb-[5px] text-sm" htmlFor="">
            Office
          </label>
          <select
            className="case_category p-[10px] outline-none rounded-md border-solid border-2 border-br-gray"
            required={true}
            defaultValue={edit.officeId}
            name="officeId"
            onChange={(e) =>
              setEdit({
                ...edit,
                officeId: e.target.value,
              })
            }
          >
            {offices?.map((office) => {
              if (office._id == edit.officeId) {
                return (
                  <option key={office._id} value={office._id} selected>
                    {office.officeName}
                  </option>
                );
              } else {
                return (
                  <option key={office._id} value={office._id}>
                    {office.officeName}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div>
          <span
            className="hover:underline"
            onClick={() => {
              setShowChangePassword(!showChangePassword);
            }}
          >
            Change password
          </span>
          {showChangePassword && (
            <EditUserPassword
              handleCollapse={() => {
                setShowChangePassword(!showChangePassword);
              }}
              userId={userId}
            />
          )}
        </div>

        <Button type="submit" className=" self-end">
          Submit
        </Button>
      </form>
    </OverLay>
  );
}

export default EditUser;
