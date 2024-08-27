import { NavLink, Outlet } from "react-router-dom";

function UserMangement() {
  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <nav className=" flex gap-2 justify-center">
        <NavLink to="." className="casenavlinks p-2 mt-1" end>
          User Management
        </NavLink>
        <NavLink to="create-user" end className="casenavlinks p-2 mt-1  ">
          Create user
        </NavLink>
      </nav>
      <div className=" flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default UserMangement;
