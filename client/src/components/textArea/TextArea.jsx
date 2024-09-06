import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function TextArea({
  lableName,
  inputName,
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
    textbox.current.style.height = "4.5rem";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleChange(event) {
    adjustHeight();
    handleInputChange(event);
    setNewText(event.target.value);
  }
  // Reset the textarea to its
  function handleResetTextarea() {
    if (textbox.current === null) return;
    textbox.current.style.height = size || "4.5rem";
    setNewText("");
  }
  useEffect(() => {
    if (isSuccess) {
      handleResetTextarea();
    }
  }, [isSuccess]);

  return (
    <div className=" relative flex flex-col">
      <label className=" font-bold mb-[5px] text-sm" htmlFor={inputName}>
        {lableName}
      </label>

      <textarea
        ref={textbox}
        id={inputName}
        className={
          " p-[10px] outline-none rounded-md border-solid border-2 border-br-gray resize-none " +
          className
        }
        value={newText}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
