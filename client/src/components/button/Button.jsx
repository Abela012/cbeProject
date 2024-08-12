import React from "react";
import styles from "./button.module.css";

function Button({ className, btnName, ...props }) {
  return (
    <button {...props} type="submit" className={styles.btn + " " + className}>
      {btnName}
    </button>
  );
}

export default Button;
