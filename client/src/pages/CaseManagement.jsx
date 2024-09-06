import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/authSlice";

function CaseManagement() {
  const user = useSelector(getCurrentUser);

  return (
    <div className="w-[98%] h-[98%] flex flex-col ">
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default CaseManagement;
