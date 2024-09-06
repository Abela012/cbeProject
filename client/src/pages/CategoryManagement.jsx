import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function CategoryManagement() {
  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <div className=" flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default CategoryManagement;
