import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";

function Layout() {
  return (
    <main className=" flex h-screen">
      <SideBar />
      <div className=" flex items-center justify-center w-full h-dvh bg-[rgb(241,241,241)] overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
