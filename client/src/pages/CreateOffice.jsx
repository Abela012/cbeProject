import { useState } from "react";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { useCreateOfficeMutation } from "../features/officeApiSlice";
import OverLay from "../components/OverLay";
import { toast } from "react-toastify";

function CreateOffice({ handleClick }) {
  const [newOffice, setNewOffice] = useState({ officeName: "" });
  const [createOffice] = useCreateOfficeMutation();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createOffice(newOffice).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      handleClick();
    }
  };
  return (
    <OverLay handleClick={handleClick}>
      <form
        className="flex gap-3 items-end bg-white p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <FormInput
          lableName="Office Name"
          placeholder="Enter office name"
          name="officeName"
          required={true}
          autoFocus={true}
          onChange={(e) => setNewOffice({ officeName: e.target.value })}
        />
        <Button btnName="Create"></Button>
      </form>
    </OverLay>
  );
}

export default CreateOffice;
