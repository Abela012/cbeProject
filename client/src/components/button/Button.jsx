function Button({ children, className, btnName, ...props }) {
  return (
    <button
      type="submit"
      className={
        " flex items-center justify-center gap-[5px] p-[10px] border-none bg-secondary-dark rounded-md hover:cursor-pointer " +
        className
      }
      {...props}
    >
      {children}
      {btnName}
    </button>
  );
}

export default Button;
