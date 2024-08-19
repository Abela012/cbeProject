import { CiLogin } from "react-icons/ci";
import { MdWindow } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { LuMenuSquare } from "react-icons/lu";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/authApiSlice";
import Button from "../button/Button";

function SideBar() {
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const [logOut, { error }] = useLogoutMutation();

  const handeLogout = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative text-white flex flex-col gap-[5px] p-[5px] bg-primary min-w-[30px] sm:min-w-[150px] sm:max-w-[200px] ">
      <div className="sm:flex p-0 sm:py-5 sm:px-[5px] sm:gap-[5px]">
        <img
          src="./logo.jpg"
          alt="logo image"
          className=" sm:w-[40px] sm:h-[40px] sm:mr-[5px] w-full h-[25px] mr-0"
        />
        <p className="hidden sm:inline-block">Commercial Bank of Ethiopia</p>
      </div>

      <div className="pt-5 flex flex-col gap-[15px] flex-1 border-t-[1px] border-b-[1px] border-solid border-t-white border-b-white">
        <NavLink
          to="/"
          className=" text-sm text-black flex gap-[5px] items-center p-[5px] justify-center sm:justify-start"
        >
          <MdWindow size={20} />
          <span className=" hidden sm:inline-block">Create User</span>
        </NavLink>

        <NavLink
          to="/appointment-list"
          className="text-sm text-black flex gap-[5px] items-center p-[5px] justify-center sm:justify-start"
        >
          <MdWindow size={20} />
          <span className=" hidden sm:inline-block">Manage Appointments</span>
        </NavLink>

        <NavLink
          to="case-management"
          className="text-sm text-black flex gap-[5px] items-center p-[5px] justify-center sm:justify-start"
        >
          <LuMenuSquare size={20} />
          <span className=" hidden sm:inline-block">Case Managememt</span>
        </NavLink>
      </div>

      <div className=" flex gap-[10px] sm:gap-[5px] flex-col pb-[15px]">
        <div className="flex gap-[5px] flex-wrap leading-[1.5] text-sm">
          <Avatar src="/secre.jpeg" size="" />
          <div className=" hidden sm:block">
            <p className=" font-bold">{user.name}</p>
            <p className=" font-light">{user.email}</p>
          </div>
        </div>
        <Button
          className="!p-1 sm:!p-[5px]"
          title="logout"
          onClick={handeLogout}
        >
          <CiLogin size={20} />
          <span className="hidden sm:inline-block">Log Out</span>
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
