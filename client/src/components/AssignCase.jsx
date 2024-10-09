import React, { useEffect, useState } from "react";
import OverLay from "./OverLay";
import Button from "./button/Button";
import { useGetOfficesQuery } from "../features/officeApiSlice";
import TextArea from "./textArea/TextArea";
import { useAssigneCaseMutation } from "../features/caseApiSlice";
import { toast } from "react-toastify";

const AssignCase = ({ caseId, handleClose }) => {
  const [newAssignment, setNewAssignment] = useState({
    officeId: "",
    description: "",
  });
  const [offices, setOffice] = useState();
  const { data: officeList, isFetching } = useGetOfficesQuery();
  const [updateCaseAssignement] = useAssigneCaseMutation();

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((prev) => ({ ...prev, [name]: value }));
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCaseAssignement({
        newAssignment,
        caseId: caseId,
      }).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
      setNewAssignment({ officeId: "", description: "" });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  return (
    <OverLay handleClick={handleClose}>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4 bg-white p-5 rounded-lg w-[80%] sm:w-[400px] "
      >
        <select
          className="case_category p-[10px] outline-none rounded-[5px] border-solid border-2 border-[#f1f1f1]"
          name="officeId"
          value={newAssignment.officeId}
          onChange={handleChange}
          required={true}
        >
          <option value="">Select Office</option>
          {offices?.map((office) => (
            <option key={office._id} value={office._id}>
              {office.officeName}
            </option>
          ))}
        </select>
        <TextArea
          handleInputChange={handleChange}
          name="description"
          placeholder="Enter description"
          lableName="Description"
          value={newAssignment.description}
          required={true}
        />
        <div className="flex items-center justify-evenly w-full">
          <Button type="submit">Assign</Button>
          <Button
            className=" !bg-transparent !border-solid !border-2"
            onClick={() => handleClose()}
          >
            Done
          </Button>
        </div>
      </form>
    </OverLay>
  );
};

export default AssignCase;
