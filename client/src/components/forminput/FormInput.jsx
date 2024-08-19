function FormInput({ placeholder, lableName, inputName, inputType, ...props }) {
  return (
    <div className=" relative flex flex-col">
      <label className=" font-bold mb-[5px] text-sm" htmlFor="">
        {lableName}
      </label>
      <input
        className=" p-[10px] outline-none rounded-md border-solid border-2 border-[rgb(221,221,221)]"
        type={inputType}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
