import styles from "../components/forminput/formInput.module.css";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/authApiSlice.js";
import { setCredentials } from "../features/authSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName || "/";

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
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setUserCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          placeholder="Enter email"
          name="email"
          required={true}
          lableName="Email"
          inputName="email"
          inputType="email"
          value={userCredentials.email}
          onChange={handleChange}
        />
        <FormInput
          placeholder="Enter password"
          name="password"
          required={true}
          lableName="Password"
          inputName="password"
          inputType="password"
          value={userCredentials.password}
          onChange={handleChange}
        />

        <Button className="" btnName="Log in" type="submit" />
      </form>
    </div>
  );
}

export default Login;
