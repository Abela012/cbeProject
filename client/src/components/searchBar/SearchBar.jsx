import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ placeholder, className, props, reSet }) {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(searchParams);

  const handleChange = (event) => {
    if (event.target.value) {
      if (event.target.value.length > 1) {
        params.set("q", event.target.value);
      }
      setQuery(event.target.value);
    } else {
      params.delete("q");
      setQuery("");
    }
    navigate(`${location.pathname}?${params}`);
  };

  useEffect(() => {
    if (reSet) {
      params.delete("q");
      setQuery("");
      navigate(`${location.pathname}?${params}`);
    }
    return () => {
      reSet = false;
    };
  }, [reSet]);

  return (
    <div className="w-full">
      <input
        {...props}
        className={
          "p-3 outline-none rounded-md w-1/2 border-solid border-2 border-br-gray " +
          className
        }
        value={query}
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
