import React from "react";
import FormError from "../FormError";
import styles from "./formInput.module.css";

function FormInput({ lableName, inputName, inputType, error, register }) {
  return (
    <div className={styles.forminput}>
      {error && <FormError error={error.message} />}
      <label htmlFor="">{lableName}</label>
      <input {...register(inputName)} type={inputType} />
    </div>
  );
}

export default FormInput;
