import { CiLogin } from "react-icons/ci";
import { MdWindow } from "react-icons/md";
import { MdAppRegistration } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { LuMenuSquare } from "react-icons/lu";
import styles from "./SideBar.module.css";
import Avatar from "../avatar/Avatar";
import { useSelector } from "react-redux";
import { getCurrentUser, logOut } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/authApiSlice";

function SideBar() {
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const [logOut, { error }] = useLogoutMutation();

  const handeLogout = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.upside}>
        <img src="./logo.jpg" alt="logo image" className={styles.cbelogo} />
        <p>Commercial Bank of Ethiopia</p>
      </div>

      <div className={styles.middleside}>
        <NavLink to="/" className={styles.sidebarLink}>
          <MdWindow size={20} />
          <span>Create Appointment</span>
        </NavLink>

        <NavLink to="/appointment-list" className={styles.sidebarLink}>
          <MdWindow size={20} />
          <span>Manage Appointments</span>
        </NavLink>

        <NavLink to="case" className={styles.sidebarLink}>
          <LuMenuSquare size={20} />
          <span>Create Case</span>
        </NavLink>

        <NavLink to="case-list" className={styles.sidebarLink}>
          <LuMenuSquare size={20} />
          <span>Case Managememt</span>
        </NavLink>
        <NavLink to="register" className={styles.sidebarLink}>
          <MdAppRegistration size={20} />
          <span>Customer Registration</span>
        </NavLink>
      </div>

      <div className={styles.bottomside}>
        <div className={styles.user_detail}>
          <Avatar src="/secre.jpeg" size="" />
          <div className={styles.user_info}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <button
          className={"btn " + styles.btn_logout}
          title="logout"
          onClick={handeLogout}
        >
          <CiLogin size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
