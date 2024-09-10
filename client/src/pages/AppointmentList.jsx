import { useEffect, useState } from "react";
import Popup from "../components/Popup.jsx";
import SearchBar from "../components/searchBar/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditAppointment from "../components/Edit/EditAppointment.jsx";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../features/appointmentApiSlice.js";
import { toast } from "react-toastify";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/authSlice.js";
import { rolesList } from "../util/userRoles.js";
import Button from "../components/button/Button.jsx";
import Appointment from "./Appointment.jsx";
import Case from "./Case.jsx";
import AppintmentScheduler from "./AppintmentScheduler.jsx";

const AppointmentStatus = ["Pending", "Canceled", "Completed"];

function AppointmentList() {
  const user = useSelector(getCurrentUser);
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");
  const [customerId, setCustomerId] = useState(""); // holde customer id to associate customer with appointment

  const [showAppointment, setShowAppointment] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [showCreate, setShowCreate] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showCreateCase, setShowCreateCase] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [appId, setAppId] = useState(""); // hold the appointment id for edit
  const [appToBeDelete, setAppToBeDelete] = useState({
    title: "appointment",
    itemId: "",
    name: "",
  }); // hold the appointment to be deleted
  const location = useLocation();
  const { data, refetch } = useGetAppointmentsQuery({
    searchTerm: query,
    officeId: user.officeId,
  });

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

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
    setShowScheduler(false);
    setShowDelete(false);
  };
  const CloseEdit = () => {
    setShowEdit(false);
  };

  const handleDeleteAppointment = () => {
    deleteAppointment(appToBeDelete.itemId);
    handleCloseModal();
  };

  const handleCreateAppointmentClick = () => {
    setShowCreate((prev) => !prev);
  };
  const handleCreateClick = () => {
    setShowCreateCase(false);
  };

  const handleAppointmentStateChange = async (appointmentid, e) => {
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
    <div className=" w-full h-[98%] rounde-d-[10px] flex flex-col gap-2">
      <div className="flex gap-3">
        <SearchBar
          className=" !w-full "
          placeholder="Search appointment by name"
        />
        <Button className="!p-0" onClick={handleCreateAppointmentClick}>
          Create Appointment
        </Button>
      </div>
      <table className=" text-sm w-full bg-white p-5 rounded-lg border-collapse ">
        <thead className=" text-left">
          <tr className=" border-solid border-2 border-gray-300">
            <th className="p-[10px]">Customer Name</th>
            <th className="p-[10px]">Office Id</th>
            <th className="p-[10px]">Start Time</th>
            <th className="p-[10px]">End Time</th>
            {user.roleType !== rolesList.secretary &&
              user.roleType !== rolesList.staff && (
                <th className="p-[10px]">Schedule Appointment</th>
              )}
            {user.roleType !== rolesList.secretary &&
              user.roleType !== rolesList.staff && (
                <th className="p-[10px]">Create Case</th>
              )}
            <th className="p-[10px]">Status</th>
            {user.roleType !== rolesList.staff && (
              <>
                <th className="p-[10px]">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, idx) => {
            return (
              <tr
                className="hover:bg-light-gray hover:cursor-pointer border-solid border-2 border-gray-300"
                key={appointment._id}
                onClick={() => {
                  setAppointmentId(appointment._id);
                  Show();
                }}
              >
                <td className="p-[10px]">{appointment.customerId?.fullName}</td>
                <td className="p-[10px]">{appointment.officeId.officeName}</td>
                <td className="p-[10px]">
                  {appointment.startTime
                    ? new Date(appointment.startTime).toLocaleString()
                    : "Not set"}
                </td>
                <td className="p-[10px]">
                  {appointment.endTime
                    ? new Date(appointment.endTime).toLocaleString()
                    : "Not set"}
                </td>
                {user.roleType !== rolesList.secretary &&
                  user.roleType !== rolesList.staff && (
                    <td className="p-[10px]">
                      <div
                        className=" hover:underline font-bold text-center"
                        title="Schedule Appointment"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowScheduler(true);
                          setAppointmentId(appointment._id);
                        }}
                      >
                        Schedule
                      </div>
                    </td>
                  )}
                {user.roleType !== rolesList.secretary &&
                  user.roleType !== rolesList.staff && (
                    <td className="p-[10px]">
                      <div
                        className=" hover:underline font-bold text-center"
                        title="Create case"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCreateCase(true);
                          setAppointmentId(appointment._id);
                          setCustomerId(appointment.customerId._id);
                        }}
                      >
                        Create case
                      </div>
                    </td>
                  )}
                <td className="p-[10px]" onClick={(e) => e.stopPropagation()}>
                  <select
                    className=" p-1 outline-none border-none cursor-pointer bg-transparent "
                    defaultValue={appointment.status}
                    onChange={(e) =>
                      handleAppointmentStateChange(appointment._id, e)
                    }
                    disabled={
                      user.roleType == rolesList.boredMembers ||
                      user.roleType == rolesList.staff
                    }
                  >
                    {AppointmentStatus.map((value) => {
                      if (value == appointment.status) {
                        return (
                          <option key={value} value={appointment.status}>
                            {appointment.status}
                          </option>
                        );
                      } else {
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      }
                    })}
                  </select>
                </td>
                {user.roleType !== rolesList.staff && (
                  <>
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
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showCreate && (
        <Appointment
          customerId={customerId}
          onClose={handleCreateAppointmentClick}
        />
      )}
      {showScheduler && (
        <AppintmentScheduler
          appointmentId={appointmentId}
          handleClose={handleCloseModal}
        />
      )}
      {showCreateCase && (
        <Case
          customerId={customerId}
          appointmentId={appointmentId}
          handleClose={handleCreateClick}
        />
      )}

      {showAppointment && (
        <Popup appointmentId={appointmentId} onClose={handleCloseModal} />
      )}
      {showEdit && <EditAppointment appId={appId} onClose={CloseEdit} />}
      {showDelete && (
        <DeleteConfirmation
          item={appToBeDelete}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteAppointment}
        />
      )}
    </div>
  );
}

export default AppointmentList;
