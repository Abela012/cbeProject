import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useGetOfficesQuery } from "../features/officeApiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import {
  useCreateScheduleMutation,
  useGetScheduleListQuery,
  useUpdateScheduleMutation,
} from "../features/schedulerApiSlice";

import EditEvent from "../components/EditEvent";
import ScheduleAppointment from "./ScheduleAppointment";
import Button from "../components/button/Button";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { formatTimeForEAT } from "../util/formatTime";

function Scheduler() {
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
    officeId: user.officeId,
  });

  const { data: schedules } = useGetScheduleListQuery({
    officeId: user.officeId,
  });
  const [createSchedules] = useCreateScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();

  useEffect(() => {
    setOffice(officeList);
  }, [officeList]);

  useEffect(() => {
    setAllEvents(schedules);
  }, [schedules]);

  function handleDateClick(arg) {
    setNewSchedule({
      ...newSchedule,
      start: arg.date,
      allDay: false,
      id: new Date().getTime(),
      officeId: user.officeId,
    });
    setShowModal(true);
  }

  async function handleEventDrop(data) {
    try {
      const event = {
        id: data.event.id,
        appointmentId: data.event.extendedProps.appointmentId,
        officeId: data.event.extendedProps.officeId,
        title: data.event.title,
        start: data.event.start,
        end: data.event.end,
      };
      const response = await updateSchedule(event).unwrap();
      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  function handleEventModal(data) {
    setEventChange(true);
    setSelecteAppointmentId(data.event.id);
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
      id: "",
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

  async function handleSubmit(e) {
    e.preventDefault();
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
            const response = await createSchedules(newSchedule).unwrap();
            toast.success(response, {
              position: "bottom-right",
            });
            // setAllEvents([...allEvents, newSchedule]);
            setShowModal(false);
            setNewSchedule({
              title: "",
              start: "",
              end: "",
              //   officeId: "",
              //   appointmentId: "",
              allDay: false,
              id: "",
            });
          }
        });
      } else {
        const response = await createSchedules(newSchedule).unwrap();
        toast.success(response, {
          position: "bottom-right",
        });
        // setAllEvents([...allEvents, newSchedule]);
        setShowModal(false);
        setNewSchedule({
          title: "",
          start: "",
          end: "",
          //   officeId: "",
          //   appointmentId: "",
          allDay: false,
          id: "",
        });
      }
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  }

  const handleCloseEditSchedule = () => {
    setEventChange(false);
  };

  return (
    <div className=" relative flex flex-col gap-2 bg-white w-[95%] h-[95%] overflow-auto p-5 pt-9 rounded">
      <Button
        onClick={() => {
          handleClose();
        }}
        className=" absolute right-0 top-[5px] !p-0 z-20 border-none !bg-transparent"
      >
        <IoIosClose size={26} />
      </Button>

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
          eventResizableFromStart={true}
          eventColor="#a21caf"
          showNonCurrentDates={false}
          slotDuration="00:10:00"
          slotMinTime="08:00:00"
          slotMaxTime="16:30:00"
          slotEventOverlap={false}
          eventOverlap={function (stillEvent, movingEvent) {
            toast.warning("You can not overlap schedules", {
              position: "bottom-right",
            });
          }}
          hiddenDays={[0]}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }}
          // eventMouseEnter={(arg) => {
          //   console.log(arg.event);
          // }}
          dateClick={handleDateClick}
          eventDrop={(data) => handleEventDrop(data)}
          eventResize={(data) => handleEventDrop(data)}
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

      {eventChange && (
        <EditEvent
          allEvents={allEvents} // use to check if there is overlap
          selecteAppointmentId={selecteAppointmentId}
          handleCloseModal={handleCloseEditSchedule}
        />
      )}
    </div>
  );
}

export default Scheduler;
