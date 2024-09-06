import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function OfficeManagement() {
  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      {/* <nav className=" flex gap-2 justify-center">
        <NavLink to="." className="casenavlinks p-2 mt-1" end>
          Office Management
        </NavLink>
        <NavLink to="create-office" end className="casenavlinks p-2 mt-1  ">
          Create Office
        </NavLink>
      </nav> */}
      <div className=" flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default OfficeManagement;
