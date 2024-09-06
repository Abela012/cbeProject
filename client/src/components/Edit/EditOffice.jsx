import { useEffect, useState } from "react";
import Button from "../button/Button";
import FormInput from "../forminput/FormInput";
import OverLay from "../OverLay";
import {
  useGetOfficeQuery,
  useUpdateOfficeMutation,
} from "../../features/officeApiSlice";
import { toast } from "react-toastify";

function EditOffice({ officeId, handleClick }) {
  const [newOffice, setNewOffice] = useState({ id: officeId, officeName: "" });
  const { data, refetch } = useGetOfficeQuery(officeId);
  const [updateOffice] = useUpdateOfficeMutation();
  useEffect(() => {
    setNewOffice((prev) => ({ ...prev, officeName: data?.officeName }));
  }, [data]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await updateOffice(newOffice).unwrap();
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
          lableName="Office Name"
          placeholder="Enter office name"
          name="officeName"
          value={newOffice.officeName}
          onChange={(e) =>
            setNewOffice((prev) => ({ ...prev, officeName: e.target.value }))
          }
        />
        <Button>Update</Button>
      </form>
    </OverLay>
  );
}

export default EditOffice;
