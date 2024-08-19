function Button({ children, className, btnName, ...props }) {
  return (
    <button
      {...props}
      type="submit"
      className={
        " flex items-center justify-center gap-[5px] p-[10px] border-none bg-secondary rounded-md hover:cursor-pointer " +
        className
      }
    >
      {children}
      {btnName}
    </button>
  );
}

export default Button;
