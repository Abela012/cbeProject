import Button from "../components/button/Button";
import FormInput from "../components/forminput/FormInput";
import OverLay from "../components/OverLay";

function ScheduleAppointment({
  handleSubmit,
  handleChange,
  handleCloseModal,
  newSchedule,
}) {
  return (
    <OverLay handleClick={handleCloseModal}>
      <div className="bg-white p-5 rounded-lg min-w-[400px]">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Add Event
        </h3>
        <form action="submit" onSubmit={handleSubmit}>
          <div className="mt-2">
            <FormInput
              lableName="Title"
              inputName="title"
              type="text"
              name="title"
              value={newSchedule.title}
              onChange={(e) => handleChange(e)}
              placeholder="Title"
            />
            <FormInput
              lableName="Start"
              inputName="start"
              name="start"
              type="datetime-local"
              value={newSchedule.start}
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              lableName="End"
              inputName="end"
              name="end"
              type="datetime-local"
              value={newSchedule.end}
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </OverLay>
  );
}

export default ScheduleAppointment;
