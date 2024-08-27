import "../../App.css";
import { useEffect, useState } from "react";
import FormInput from "../forminput/FormInput.jsx";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../features/userApiSlice.js";
import OverLay from "../OverLay.jsx";

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
      console.log(response);
    } catch (error) {
      console.log(response.data);
    }
  };

  return (
    <OverLay handleClick={onClose}>
      <form action="" className="Hform edit" onSubmit={handleSubmit}>
        <div className="inputs_wrapper">
          <div className="personalinfo">
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
          </div>

          <div className="userschedule">
            <FormInput
              lableName="Office Id"
              placeholder="Enter Office Id"
              type="text"
              value={edit.officeId}
              onChange={(e) =>
                setEdit({
                  ...edit,
                  officeId: e.target.value,
                })
              }
              required
            />

            <FormInput
              lableName="Role"
              placeholder="Enter role"
              type="text"
              value={edit.roleType}
              onChange={(e) =>
                setEdit({
                  ...edit,
                  roleType: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </OverLay>
  );
}

export default EditUser;
