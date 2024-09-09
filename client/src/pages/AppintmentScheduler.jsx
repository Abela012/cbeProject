import { useEffect, useState } from "react";
import OverLay from "../components/OverLay";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  //   DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useGetOfficesQuery } from "../features/officeApiSlice";
import ScheduleAppointment from "./ScheduleAppointment";
import DeleteEvent from "../components/DeleteEvent";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import {
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useGetScheduleListQuery,
} from "../features/schedulerApiSlice";
import EditEvent from "../components/EditEvent";

function AppintmentScheduler({ appointmentId, handleClose }) {
  const user = useSelector(getCurrentUser);
  const { data: officeList } = useGetOfficesQuery();
  const [offices, setOffice] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [selecteAppointmentId, setSelecteAppointmentId] = useState(null);
  const [showmodal, setShowModal] = useState(false);
  const [eventChange, setEventChange] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    id: "",
    start: "",
    end: "",
    date: "",
    title: "",
    allDay: false,
    appointmentId: appointmentId,
    officeId: user.officeId,
  });

  const { data: schedules } = useGetScheduleListQuery({
    officeId: user.officeId,
  });
  const [createSchedules] = useCreateScheduleMutation();
  const [deleteSchedule] = useDeleteScheduleMutation();

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

  useEffect(() => {
    setAllEvents(schedules);
  }, [schedules]);

  function handleDateClick(arg) {
    // console.log(arg);

    setNewSchedule({
      ...newSchedule,
      start: arg.date,
      allDay: false,
      id: new Date().getTime(),
      appointmentId: appointmentId,
      officeId: user.officeId,
    });
    setShowModal(true);
  }

  function addEvent(data) {
    console.log("data", data);

    const event = {
      ...newSchedule,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }
  
  function handleEventModal(data){
    setEventChange(true);
    setSelecteAppointmentId(data.event.id);
 }

 const handleCloseEdit = () => {
  set
 }

  function handleCloseModal() {
    setShowModal(false);
    setNewSchedule({
      title: "",
      start: "",
      end: "",
      officeId: "",
      appointmentId: "",
      allDay: false,
      id: 0,
    });
    setSelecteAppointmentId(null);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewSchedule((prev) => ({
      ...newSchedule,
      ...prev,
      [name]: value,
    }));
  };


  function handleSubmit(e) {
    e.preventDefault();
    createSchedules(newSchedule);

    setAllEvents([...allEvents, newSchedule]);
    setShowModal(false);
    setNewSchedule({
      title: "",
      start: "",
      end: "",
      //   officeId: "",
      //   appointmentId: "",
      allDay: false,
      id: 0,
    });
  }

  const handleCloseEditSchedule =() => {
    setEventChange(false)
  }

  return (
    <OverLay handleClick={handleClose}>
      <div className=" flex flex-col gap-2 bg-white w-[95%] h-[95%] overflow-auto p-5 rounded">
        <div className="relative flex flex-col">
          <label className=" font-bold mb-[5px] text-sm" htmlFor="">
            Office
          </label>
          <select
            className="case_category p-[10px] outline-none rounded-md border-solid border-2 border-br-gray"
            required={true}
            value={newSchedule?.officeId}
            name="officeId"
            onChange={() => {}}
          >
            <option value="">Select Office</option>
            {offices?.map((office) => (
              <option key={office._id} value={office._id}>
                {office.officeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            forceEventDuration={true}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridDay,dayGridMonth,timeGridWeek",
            }}
            events={allEvents}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            eventColor="#a21caf"
            showNonCurrentDates={false}
            slotDuration="00:10:00"
            slotMinTime="02:00:00"
            slotMaxTime="16:30:00"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }}
            // validRange={(nowDate) => {
            //   return {
            //     start: nowDate,
            //   };
            // }}
            dateClick={handleDateClick}
            // drop={(data) => addEvent(data)}
            eventClick={(data) => handleEventModal(data)}
          />
        </div>
        {showmodal && (
          <ScheduleAppointment
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            newSchedule={newSchedule}
            handleCloseModal={handleCloseModal}
          />
        )}
        
        {
          eventChange && (
             <EditEvent
             selecteAppointmentId={selecteAppointmentId}
             handleCloseModal={handleCloseEditSchedule}
             />
          )
        }
       
      </div>
    </OverLay>
  );
}

export default AppintmentScheduler;
