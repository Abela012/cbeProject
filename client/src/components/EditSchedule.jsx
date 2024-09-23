import Button from "./button/Button";
import OverLay from "./OverLay";
import FormInput from "./forminput/FormInput";
import { useEffect, useState } from "react";
import {
  useGetScheduleQuery,
  useUpdateScheduleMutation,
} from "../features/schedulerApiSlice";
import { toast } from "react-toastify";
import { formatTimeForEAT } from "../util/formatTime";

const EditSchedule = ({
  handleCloseModal,
  selecteAppointmentId,
  handleCloseEdit,
  allEvents,
}) => {
  //use
  const [newSchedule, setNewSchedule] = useState({
    appointmentId: selecteAppointmentId,
    title: "",
    start: "",
    end: "",
  });
  const { data: Schedule, isSuccess } =
    useGetScheduleQuery(selecteAppointmentId);
  const [updateSchedule] = useUpdateScheduleMutation();

  useEffect(() => {
    if (isSuccess) {
      setNewSchedule(Schedule);
    }
  }, [Schedule]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
  }
  async function handleUpdate(event) {
    event.preventDefault();
    try {
      if (allEvents.length > 0) {
        const foundSchedule = allEvents.find(async (scheduel) => {
          if (
            formatTimeForEAT(scheduel.start) <
              formatTimeForEAT(newSchedule.end) &&
            formatTimeForEAT(newSchedule.start) < formatTimeForEAT(scheduel.end)
          ) {
            toast.warning("You can not overlap schedules", {
              position: "bottom-right",
            });
          } else {
            const response = await updateSchedule(newSchedule).unwrap();
            toast.success(response, {
              position: "bottom-right",
            });
            handleCloseModal();
          }
        });
      } else {
        const response = await updateSchedule(newSchedule).unwrap();
        toast.success(response, {
          position: "bottom-right",
        });
        handleCloseModal();
      }
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  return (
    <OverLay
      handleClick={() => {
        handleCloseModal();
        handleCloseEdit();
      }}
    >
      <div className="bg-white p-5 rounded-lg min-w-[400px]">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Add Event
        </h3>
        <form onSubmit={handleUpdate}>
          <div className="mt-2">
            <FormInput
              lableName="Title"
              inputName="title"
              type="text"
              name="title"
              value={newSchedule?.title}
              onChange={(e) => handleChange(e)}
              placeholder="Title"
            />
            <FormInput
              lableName="Start"
              inputName="start"
              name="start"
              type="datetime-local"
              value={newSchedule.start && formatTimeForEAT(newSchedule.start)}
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              lableName="End"
              inputName="end"
              name="end"
              type="datetime-local"
              value={newSchedule.end && formatTimeForEAT(newSchedule.end)}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex gap-4 mt-3">
            <Button
              type="button"
              className=" w-full rounded-md bg-white px-3 py-2 font-semibold  ring-1 ring-inset ring-gray-300 "
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className=" px-3 py-2 font-semibold w-full"
              disabled={newSchedule.title === ""}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </OverLay>
  );
};

export default EditSchedule;
