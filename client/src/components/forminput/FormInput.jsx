function FormInput({
  classname,
  placeholder,
  lableName,
  inputName,
  inputType,
  ...props
}) {
  return (
    <div className={" relative flex flex-col " + classname}>
      <label className=" font-bold mb-[5px] text-sm" htmlFor={inputName}>
        {lableName}
      </label>
      <input
        id={inputName}
        className=" p-[10px] outline-none rounded-md border-solid border-2 border-br-gray"
        type={inputType}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
