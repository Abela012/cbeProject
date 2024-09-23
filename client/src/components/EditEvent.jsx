import { useState } from "react";
import Button from "./button/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import OverLay from "./OverLay";
import DeleteEvent from "./DeleteEvent";
import EditSchedule from "./EditSchedule";
import { useDeleteScheduleMutation } from "../features/schedulerApiSlice";
import { toast } from "react-toastify";

const EditEvent = ({ handleCloseModal, selecteAppointmentId, allEvents }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleCloseEdit = () => {
    setShowEditEvent(false);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  function handleEdit() {
    setShowEditEvent(true);
  }

  function handleEventDelete() {
    setShowDeleteModal(true);
  }

  async function handleDelete() {
    try {
      const response = await deleteSchedule(selecteAppointmentId).unwrap();
      handleCloseDelete();
      handleCloseModal();
      toast.success(error, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.success(error, {
        position: "bottom-right",
      });
    }
  }

  return (
    <OverLay handleClick={handleCloseModal}>
      <div className="bg-white p-5 rounded-lg">
        <h3 className="text-base text-center font-semibold leading-6">
          Choose Your action
        </h3>

        <div className=" flex gap-10 sm:flex-row-reverse sm:px-6">
          <Button
            className="w-full rounded-md bg-white px-3 py-2 font-semibold ring-inset ring-1 ring-gray-300 "
            onClick={handleEventDelete}
          >
            <MdDelete size={20} color="red" />
          </Button>

          <Button
            className="w-full rounded-md bg-white px-3 py-2 font-semibold ring-inset ring-1 ring-gray-300 "
            onClick={handleEdit}
          >
            <MdEdit size={20} color="green" />
          </Button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteEvent
          handleDelete={handleDelete}
          handleCloseDelete={handleCloseDelete}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showEditEvent && (
        <EditSchedule
          allEvents={allEvents}
          handleCloseEdit={handleCloseEdit}
          handleCloseModal={handleCloseModal}
          selecteAppointmentId={selecteAppointmentId}
        />
      )}
    </OverLay>
  );
};

export default EditEvent;
