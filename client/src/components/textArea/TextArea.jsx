import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./textArea.module.css";

export default function TextArea({
  placeholder,
  handleInputChange,
  isSuccess,
  size,
  className,
  ...props
}) {
  const [newText, setNewText] = useState("");
  const textbox = useRef(null);

  function adjustHeight() {
    if (textbox.current === null) return;
    textbox.current.style.height = "2.5rem";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleChange(event) {
    adjustHeight();
    handleInputChange(event.target.value);
    setNewText(event.target.value);
  }
  // Reset the textarea to its
  function handleResetTextarea() {
    if (textbox.current === null) return;
    textbox.current.style.height = size || "2.5rem";
    setNewText("");
    textbox.current?.focus();
  }
  useEffect(() => {
    if (isSuccess) {
      handleResetTextarea();
    }
  }, [isSuccess]);

  return (
    <textarea
      {...props}
      ref={textbox}
      id="post-textbox"
      className={styles.text_area + " " + className}
      value={newText}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
