import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/authApiSlice.js";
import { getCurrentUser, setCredentials } from "../features/authSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { getRoleBasedPath } from "../util/getRoleBasedPath.js";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName;

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userCredentials).unwrap();

      dispatch(setCredentials(response));
      navigate(from || getRoleBasedPath(jwtDecode(response.data).roleType), {
        replace: true,
      });

      toast.success("Successfully logged in", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.data, {
        position: "bottom-right",
      });
    } finally {
      setUserCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className=" flex items-center justify-center w-full h-dvh bg-[rgb(241,241,241)] overflow-y-auto">
      <form
        className=" flex flex-col gap-[15px] w-3/5 max-w-[380px] bg-white p-5 rounded-[10px] "
        onSubmit={handleSubmit}
      >
        <FormInput
          placeholder="Enter email"
          name="email"
          required={true}
          lableName="Email"
          type="email"
          value={userCredentials.email}
          onChange={handleChange}
        />
        <div className="relative">
          <FormInput
            placeholder="Enter password"
            name="password"
            required={true}
            lableName="Password"
            type={showPassword ? "text" : "password"}
            value={userCredentials.password}
            onChange={handleChange}
          />
          <span
            className=" cursor-pointer absolute right-2 top-[55%]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
          </span>
        </div>

        <Button className="" btnName="Log in" type="submit" />
      </form>
    </div>
  );
}

export default Login;
