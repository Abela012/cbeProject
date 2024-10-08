import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/authSlice";
import { rolesList } from "../util/userRoles";
function AppointmentManagement() {
  const user = useSelector(getCurrentUser);

  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <nav className=" flex gap-2 justify-center">
        {user.roleType !== rolesList.boredMembers &&
          user.roleType !== rolesList.staff && (
            <>
              <NavLink to="" end className="casenavlinks p-2 mt-1  ">
                Registration
              </NavLink>
              <NavLink to="appointment-list" className="casenavlinks p-2 mt-1">
                Appointment Management
              </NavLink>
            </>
          )}
      </nav>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AppointmentManagement;
