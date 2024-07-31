import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

function Layout() {
  return (
    <main className="maincontainer">
      <SideBar />
      <Outlet />
    </main>
  );
}

export default Layout;
