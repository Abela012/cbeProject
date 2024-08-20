import { useEffect, useState } from "react";
import Popup from "../components/Popup.jsx";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Edit from "../components/EditAppointment/Edit.jsx";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../features/appointmentApiSlice.js";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setappointmentId] = useState("");
  const [showAppointment, setShowAppointment] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appId, setAppId] = useState(""); // hold the appointment id for edit
  const [appToBeDelete, setAppToBeDelete] = useState({
    title: "appointment",
    itemId: "",
    name: "",
  }); // hold the appointment to be deleted
  const location = useLocation();
  const { data, refetch } = useGetAppointmentsQuery(query);

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  function showEditModal() {
    setShowEdit(true);
  }

  function Show() {
    setShowAppointment(true);
  }

  useEffect(() => {
    setAppointments(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [location, query]);

  const handleCloseModal = () => {
    setShowAppointment(false);
    setShowDelete(false);
  };
  const CloseEdit = () => {
    setShowEdit(false);
  };

  const handleSCaseStateChange = async (appointmentid, e) => {
    try {
      const response = await updateAppointmentStatus({
        status: e.target.value,
        id: appointmentid,
      }).unwrap();

      toast.success(response, {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className=" w-[98%] h-[95%] rounde-d-[10px] flex flex-col gap-2">
      <SearchBar placeholder="Search appointment by name" />
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Customer Name</th>
            <th className="p-[10px]">Office Id</th>
            <th className="p-[10px]">Start Time</th>
            <th className="p-[10px]">End Time</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={appointment._id}
                onClick={() => {
                  setappointmentId(appointment._id);
                  Show();
                }}
              >
                <td className="p-[10px]">{appointment.customerId?.fullName}</td>
                <td className="p-[10px]">{appointment.officeId}</td>
                <td className="p-[10px]">
                  {new Date(appointment.startTime).toLocaleString()}
                </td>
                <td className="p-[10px]">
                  {new Date(appointment.endTime).toLocaleString()}
                </td>
                <td className="p-[10px]" onClick={(e) => e.stopPropagation()}>
                  <select
                    className=" p-1 outline-none border-none cursor-pointer bg-transparent "
                    defaultValue={appointment.status}
                    onChange={(e) => handleSCaseStateChange(appointment._id, e)}
                  >
                    <option value={appointment.status}>
                      {appointment.status}
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-[10px]">
                  <div className="table_actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAppId(appointment._id);
                        showEditModal();
                      }}
                    >
                      <MdEdit size={20} color="green" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // setAppointments(
                        //   appointments.filter((appoint) => {
                        //     return appoint._id !== appointment._id;
                        //   })
                        // );
                        setShowDelete(true);
                        setAppToBeDelete((prev) => ({
                          ...prev,
                          itemId: appointment._id,
                          name: appointment.customerId?.fullName,
                        }));
                      }}
                    >
                      <MdDelete size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showAppointment && (
        <Popup appointmentId={appointmentId} onClose={handleCloseModal} />
      )}
      {showEdit && <Edit appId={appId} onClose={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation item={appToBeDelete} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default AppointmentList;
