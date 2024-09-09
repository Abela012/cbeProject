import React from "react";
import OverLay from "./OverLay";
import Button from "./button/Button";

function DeleteEvent({ handleDelete, handleCloseModal, handleCloseDelete }) {
  return (
    <OverLay handleClick={()=> {handleCloseModal(); handleCloseDelete()} }>
      <div className="bg-white p-5 rounded-lg sm:flex-row-reverse sm:px-6">
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 ">Delete Event</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this event?
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <Button
            type="button"
            className="w-full rounded-md bg-white px-3 py-2 font-semibold ring-inset ring-1 ring-gray-300 "
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className=" w-full  rounded-md bg-red-600 px-3 py-2 font-semibold text-white "
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </OverLay>
  );
}

export default DeleteEvent;
