import React from "react";
import Button from "./button/Button";
import OverLay from "./OverLay";
import { capitalizeFirstLetter } from "../util/capitalize";
import { useDeleteAppointmentMutation } from "../features/appointmentApiSlice";
import { useDeleteCaseMutation } from "../features/caseApiSlice";

function DeleteConfirmation({ item, onClose }) {
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [deleteCase] = useDeleteCaseMutation();

  const handleDelete = () => {
    if (item.title == "appointment") {
      deleteAppointment(item.itemId);
      onClose();
    } else if (item.title == "case") {
      deleteCase(item.itemId);
      onClose();
    }
  };
  return (
    <OverLay handleClick={onClose}>
      <div className="flex flex-col items-center gap-[10px] bg-white p-5 rounded-md relative">
        <h2 className="text-lg font-bold">Delete</h2>
        <p className="">
          Are you sure you want to delete this {item.title} ? This action cannot
          be undone.
        </p>
        <div className="text-center font-bold">
          {capitalizeFirstLetter(item.title)}
          <p className="font-light">of</p>
          {item.name} {/*  customer name */}
          will be deleted.
        </div>
        <div className="flex items-center justify-evenly w-full">
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button className="!bg-red-500" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </OverLay>
  );
}

export default DeleteConfirmation;
