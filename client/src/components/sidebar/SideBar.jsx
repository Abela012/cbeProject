import { CiLogin } from "react-icons/ci";
import { MdWindow } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";

import { RiCalendarScheduleFill } from "react-icons/ri";
import { AiFillSchedule } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { LuMenuSquare } from "react-icons/lu";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/authApiSlice";
import Button from "../button/Button";
import { rolesList } from "../../util/userRoles";
import CustNavLink from "../CustNavLink";

function SideBar() {
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const [logOut, { error }] = useLogoutMutation();

  const handeLogout = () => {
    logOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative text-white flex flex-col gap-[5px] p-[5px] bg-primary-dark min-w-[30px] sm:min-w-[150px] sm:max-w-[200px] ">
      <div className="sm:flex p-0 sm:py-5 sm:px-[5px] sm:gap-[5px]">
        <img
          src="../../CBE.png"
          alt="logo image"
          className=" sm:w-[40px] sm:h-[40px] sm:mr-[5px] w-full h-[25px] max-w-10 mr-0"
        />
        <p className="hidden sm:inline-block">Commercial Bank of Ethiopia</p>
      </div>

      <div className="pt-5 flex flex-col gap-[15px] flex-1 border-t-[1px] border-b-[1px] border-solid border-t-white border-b-white">
        {(user.roleType === rolesList.president ||
          user.roleType === rolesList.vp ||
          user.roleType === rolesList.cos) && (
          <>
            <CustNavLink linkName="Dashboard" linkPath="" end>
              <AiFillSchedule size={20} />
            </CustNavLink>
            <CustNavLink
              linkName="Manage Appointment"
              linkPath="manage-appointment"
            >
              <AiFillSchedule size={20} />
            </CustNavLink>

            <CustNavLink linkName="Scheduler" linkPath="scheduler">
              <RiCalendarScheduleFill size={20} />
            </CustNavLink>

            <CustNavLink linkName="Case Mangagement" linkPath="case-management">
              <LuMenuSquare size={20} />
            </CustNavLink>
          </>
        )}
        {(user.roleType === rolesList.boredMembers ||
          user.roleType === rolesList.staff) && (
          <>
            {/* <CustNavLink
              linkName="Manage Appointment"
              linkPath="manage-appointment"
            >
              <MdWindow size={20} />
            </CustNavLink> */}

            <CustNavLink linkName="Case Mangagement" linkPath="case-management">
              <LuMenuSquare size={20} />
            </CustNavLink>
          </>
        )}
        {user.roleType === rolesList.admin && (
          <>
            <CustNavLink linkName="Manage User" linkPath="user-mangement">
              <FaUserAlt size={20} />
            </CustNavLink>

            <CustNavLink linkName="Manage Role" linkPath="role-mangement">
              <FaUserPlus size={20} />
            </CustNavLink>

            <CustNavLink
              linkName="Manage Category"
              linkPath="category-mangement"
            >
              <BiSolidCategoryAlt size={20} />
            </CustNavLink>

            <CustNavLink linkName="Manage Office" linkPath="office-mangement">
              <MdWindow size={20} />
            </CustNavLink>
          </>
        )}
        {user.roleType === rolesList.secretary && (
          <>
            <CustNavLink
              linkName="Manage Appointment"
              linkPath="manage-appointment"
            >
              <LuMenuSquare size={20} />
            </CustNavLink>
          </>
        )}
      </div>

      <div className=" flex gap-[10px] sm:gap-[5px] flex-col pb-[15px]">
        <div className="flex gap-[5px] flex-wrap leading-[1.5] text-sm">
          <Avatar src="../usericon.png" size="" />
          <div className=" hidden sm:block">
            <p className=" font-bold">{user.name}</p>
            <p className=" font-light">{user.email}</p>
          </div>
        </div>
        <Button
          className="!p-1 sm:!p-[5px] text-black font-semibold"
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
