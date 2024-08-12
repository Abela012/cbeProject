import styles from "../components/forminput/formInput.module.css";
import FormInput from "../components/forminput/FormInput";
import Button from "../components/button/Button";
import { useState } from "react";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
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
          onChange={handleChange}
        />
        <FormInput
          placeholder="Enter password"
          name="password"
          required={true}
          lableName="Password"
          inputName="password"
          inputType="password"
          onChange={handleChange}
        />

        <Button className="" btnName="Log in" type="submit" />
      </form>
    </div>
  );
}

export default Login;
