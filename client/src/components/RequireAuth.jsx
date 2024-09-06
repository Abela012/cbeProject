import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentToken, getCurrentUser } from "../features/authSlice";
import WrapperSpinner from "./WrapperSpinner.jsx";
import { useEffect, useState } from "react";

function RequireAuth({ allowedRoles }) {
  const user = useSelector(getCurrentUser);
  const token = useSelector(getCurrentToken);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [token, user]);

  if (isLoading) {
    return <WrapperSpinner />;
  }
  // console.log(user);

  // token ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  return allowedRoles?.includes(user?.roleType) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unautherized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
