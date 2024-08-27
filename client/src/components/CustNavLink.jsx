import { NavLink } from "react-router-dom";

function CustNavLink({ linkName, children, linkPath, ...props }) {
  return (
    <NavLink
      to={linkPath}
      className="text-sm text-black flex gap-[5px] items-center p-[5px] justify-center sm:justify-start"
      {...props}
    >
      {children}
      <span className=" hidden sm:inline-block">{linkName}</span>
    </NavLink>
  );
}

export default CustNavLink;
