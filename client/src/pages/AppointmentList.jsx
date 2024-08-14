import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Popup from "../components/Popup.jsx";
import SearchBar from "../components/searchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Edit from "../components/EditAppointment/Edit.jsx";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setappointmentId] = useState("");
  const [showapp, setshowapp] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [showedit, setshowedit] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [appId, setappId] = useState("");

  function edit(e) {
    setshowedit(true);
  }
  function Show() {
    setshowapp(true);
  }

  useEffect(() => {
    async function getAppointments() {
      const response = await api.get(`/get-appointments?q=${query}`);
      setAppointments(response.data);
    }
    getAppointments();

    return () => {
      setRefetch(false);
    };
  }, [query, refetch]);

  const handleCloseModal = () => {
    setshowapp(false);
  };
  const CloseEdit = () => {
    setshowedit(false);
  };
  return (
    <div className="table_Wrapper">
      <SearchBar placeholder="Search appointment" />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Office Id</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, idx) => {
            return (
              <tr
                key={appointment._id}
                onClick={() => {
                  setappointmentId(appointment._id);
                  Show();
                }}
              >
                <td>{appointment.customerId.fullName}</td>
                <td>{appointment.officeId}</td>
                <td>{new Date(appointment.startTime).toLocaleString()}</td>
                <td>{new Date(appointment.endTime).toLocaleString()}</td>
                <td>{appointment.status}</td>
                <td className="table_actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      api.get(`/get-appointment/${appointment._id}`);
                      setappId(appointment._id);
                      edit();
                    }}
                  >
                    <MdEdit size={20} color="green" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setAppointments(
                        appointments.filter((appoint) => {
                          return appoint._id !== appointment._id;
                        })
                      );
                      api.delete(`/delete-appointments/${appointment._id}`);
                    }}
                  >
                    <MdDelete size={20} color="red" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showapp && (
        <Popup appointmentId={appointmentId} onClose={handleCloseModal} />
      )}
      {showedit && (
        <Edit appId={appId} onClose={CloseEdit} setRefetch={setRefetch} />
      )}
    </div>
  );
}

export default AppointmentList;
