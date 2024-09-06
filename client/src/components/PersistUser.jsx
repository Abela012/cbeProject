import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentToken, setCredentials } from "../features/authSlice";
import { useRefreshTokenQuery } from "../features/authApiSlice";
import { useEffect } from "react";
import WrapperSpinner from "./WrapperSpinner";

function PersistUser() {
  const dispatch = useDispatch();
  const token = useSelector(getCurrentToken);
  const { data, isLoading, error } = useRefreshTokenQuery();

  useEffect(() => {
    if (!token && data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  if (error) {
    <Navigate to="/" replace />;
  }

  return <>{isLoading ? <WrapperSpinner /> : <Outlet />}</>;
}

export default PersistUser;
