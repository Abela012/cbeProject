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

function Dashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [appointmentStatiData, setAppointmentStatiData] = useState(null);
  const [caseStatiData, setCaseStatiData] = useState(null);
  const { data: appointmentStati } = useGetAppointmentStatiQuery();
  const { data: caseStati } = useGetCaseStatiQuery();

  useEffect(() => {
    setAppointmentStatiData(appointmentStati);
    setCaseStatiData(caseStati);
  }, [appointmentStati, caseStati]);

  const handleCreateAppointmentClick = () => {
    setShowCreate((prev) => !prev);
  };
  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <div className="flex flex-col gap-2 pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ">
            <h2 className="text-left font-bold text-lg">Appointment</h2>
            <Button onClick={handleCreateAppointmentClick}>
              Create Appointment
            </Button>
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
