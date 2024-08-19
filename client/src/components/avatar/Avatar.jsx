function Avatar({ src, size, className }) {
  return (
    <div className=" min-w-[1.75rem] min-h-[1.75rem] max-w-[1.75rem] max-h-[1.75rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] sm:max-w-[2.5rem] sm:max-h-[2.5rem] ">
      <img
        className="rounded-full min-w-full min-h-full max-w-full max-h-full object-contain border-solid border-[1px] border-white"
        src="./default_u.jfif"
        alt="User profile"
      />
    </div>
  );
}

export default Avatar;
