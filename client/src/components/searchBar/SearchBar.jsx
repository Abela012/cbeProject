import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ placeholder, className, props }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      event.target.value.length > 1 && params.set("q", event.target.value);
    } else {
      params.delete("q");
    }
    navigate(`${location.pathname}?${params}`);
  };

  return (
    <div className="">
      <input
        {...props}
        className={
          "p-3 outline-none rounded-md w-1/2 border-solid border-2 border-[rgb(221,221,221)] " +
          className
        }
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
