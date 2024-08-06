import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      const response = await api.get("/get-appointments");
      setAppointments(response.data);
      //   console.log(response);
    }
    getAppointments();
  }, []);

  return (
    <div className="table_Wrapper">
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Office Id</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment, idx) => {
            return (
              <tr key={appointment._id}>
                <td>{appointment.customerId.customerName}</td>
                <td>{appointment.officeId}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
