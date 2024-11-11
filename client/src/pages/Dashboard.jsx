import { useEffect, useState } from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdFreeCancellation } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
import Button from "../components/button/Button";
import DashboardAppointmentTable from "./DashboardAppointmentTable";
import Appointment from "./Appointment";
import { useGetAppointmentStatiQuery } from "../features/appointmentApiSlice";
import { useGetCaseStatiQuery } from "../features/caseApiSlice";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetUpcomingScheduleListQuery } from "../features/schedulerApiSlice";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice";
import { calcDaysUntilDue } from "../util/dueDate";

function Dashboard() {
  const user = useSelector(getCurrentUser);
  const [schedules, setSchedules] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [appointmentStatiData, setAppointmentStatiData] = useState(null);
  const [caseStatiData, setCaseStatiData] = useState(null);
  const { data: appointmentStati } = useGetAppointmentStatiQuery();
  const { data: caseStati } = useGetCaseStatiQuery();
  const { data: scheduleList } = useGetUpcomingScheduleListQuery({
    officeId: user.officeId,
  });

  useEffect(() => {
    setSchedules(scheduleList);
  }, [scheduleList]);

  useEffect(() => {
    setAppointmentStatiData(appointmentStati);
    setCaseStatiData(caseStati);
  }, [appointmentStati, caseStati]);

  // show upcoming schedules
  useEffect(() => {
    const now = new Date();
    schedules?.forEach((schedule) => {
      const { daysRemaining } = calcDaysUntilDue(new Date(schedule?.startTime));
      if (
        daysRemaining !== 0 &&
        !upcomingSchedules.some(
          (existingSchedule) => existingSchedule._id === schedule._id
        )
      ) {
        setUpcomingSchedules((prev) => [...prev, schedule]);
      }
    });
  }, [schedules]);

  const handleCreateAppointmentClick = () => {
    setShowCreate((prev) => !prev);
  };

  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <div className="flex flex-col gap-2 pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h2 className="text-left font-bold text-lg">Appointment</h2>
            <div className=" flex gap-2">
              <Link
                to="upcoming-appointment"
                className=" flex flex-col items-center justify-center relative"
              >
                <span className="relative">
                  <IoIosNotifications size={25} />
                  <span className="absolute -right-2 -top-2 bg-red-500 rounded-full w-5 h-5 min-w-fit flex items-center justify-center text-sm font-bold">
                    {upcomingSchedules.length}
                  </span>
                </span>
                <span className=" text-xs font-bold ">
                  Upcoming appointment
                </span>
              </Link>
              <Button onClick={handleCreateAppointmentClick}>
                Create Appointment
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdOutlinePendingActions size={25} />
              <p className="font-bold text-sm">Pending Appointment</p>
              <p className="font-bold text-lg">
                {appointmentStatiData?.counts[0].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdFreeCancellation size={25} />
              <p className="font-bold text-sm">Canceled Appointment</p>
              <p className="font-bold text-lg">
                {appointmentStatiData?.counts[1].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdIncompleteCircle size={25} />
              <p className="font-bold text-sm">Completed Appointment</p>
              <p className="font-bold text-lg">
                {appointmentStatiData?.counts[2].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <FaBorderAll size={25} />
              <p className="font-bold text-sm">Total Appointment</p>
              <p className="font-bold text-lg">{appointmentStatiData?.total}</p>
            </div>
          </div>
          <DashboardAppointmentTable />
        </div>

        <div>
          <h2 className="text-left font-bold text-lg">Case</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdOutlinePendingActions size={25} />
              <p className=" font-bold text-sm ">Pending Case</p>
              <p className=" font-bold text-lg ">
                {caseStatiData?.counts[0].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdFreeCancellation size={25} />
              <p className="font-bold text-sm">Canceled Case</p>
              <p className="font-bold text-lg">
                {caseStatiData?.counts[1].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <MdIncompleteCircle size={25} />
              <p className="font-bold text-sm">Completed Case</p>
              <p className="font-bold text-lg">
                {caseStatiData?.counts[2].count}
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-between p-5 rounded min-w-40 max-w-80 bg-white flex-wrap">
              <FaBorderAll size={25} />
              <p className="font-bold text-sm">Total Case</p>
              <p className="font-bold text-lg">{caseStatiData?.total}</p>
            </div>
          </div>
        </div>
      </div>
      {showCreate && <Appointment onClose={handleCreateAppointmentClick} />}
    </div>
  );
}

export default Dashboard;
