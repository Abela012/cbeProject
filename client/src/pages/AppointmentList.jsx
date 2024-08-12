import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Popup from "../components/Popup";
import SearchBar from "../components/searchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setappointmentId] = useState("");
  const [showapp, setshowapp] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  function Show() {
    setshowapp(true);
  }

  useEffect(() => {
    async function getAppointments() {
      const response = await api.get(`/get-appointments?q=${query}`);
      setAppointments(response.data);
      // console.log(response);
    }
    getAppointments();
  }, [query]);

  const handleCloseModal = () => {
    setshowapp(false);
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
        <tbody onClick={Show}>
          {appointments?.map((appointment, idx) => {
            return (
              <tr
                key={appointment._id}
                onClick={() => setappointmentId(appointment._id)}
              >
                <td>{appointment.customerId.customerName}</td>
                <td>{appointment.officeId}</td>
                <td>{new Date(appointment.startTime).toLocaleString()}</td>
                <td>{new Date(appointment.endTime).toLocaleString()}</td>
                <td>{appointment.status}</td>
                <td className="table_actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      api.patch(`/update-appointments/${appointment._id}`);
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
    </div>
  );
}

export default AppointmentList;
