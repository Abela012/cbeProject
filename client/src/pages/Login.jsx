import styles from "../components/forminput/formInput.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../components/forminput/FormInput";

function Login() {
  const schema = yup.object().shape({
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <FormInput
          lableName="Email"
          inputName="email"
          inputType="email"
          error={errors.email}
          register={register}
        />
        <FormInput
          lableName="Password"
          inputName="password"
          inputType="password"
          error={errors.password}
          register={register}
        />
        <button className="btn" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
