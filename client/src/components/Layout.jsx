import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

function Layout() {
  return (
    <main className="maincontainer">
      <SideBar />
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
