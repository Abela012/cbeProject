import React from "react";
import FormError from "../FormError";
import styles from "./formInput.module.css";

function FormInput({ placeholder, lableName, inputName, inputType, ...props }) {
  return (
    <div className={styles.forminput}>
      <label htmlFor="">{lableName}</label>
      <input {...props} type={inputType} placeholder={placeholder} />
    </div>
  );
}

export default FormInput;
