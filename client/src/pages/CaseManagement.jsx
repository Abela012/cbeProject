import { NavLink, Outlet } from "react-router-dom";

function CaseManagement() {
  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <nav className=" flex gap-2 justify-center">
        <NavLink to="" end className="casenavlinks p-2 mt-1  ">
          Registration
        </NavLink>
        <NavLink to="case" className="casenavlinks p-2 mt-1">
          Case
        </NavLink>
        <NavLink to="case-list" className="casenavlinks p-2 mt-1">
          Case Management
        </NavLink>
      </nav>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default CaseManagement;
