import { useEffect, useState } from "react";

function SearchBarWoutParams({
  placeholder,
  className,
  props,
  searchItem,
  reset,
}) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    if (event.target.value) {
      setQuery(event.target.value);
      searchItem(event.target.value);
    } else {
      setQuery("");
      searchItem("");
    }
  };

  useEffect(() => {
    if (reset) {
      setQuery("");
      searchItem("");
    }
    return () => {
      reset = !reset;
    };
  }, [reset]);

  return (
    <div className="w-full">
      <input
        className={
          "p-3 outline-none rounded-md w-1/2 border-solid border-2 border-br-gray " +
          className
        }
        value={query}
        type="search"
        {...props}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBarWoutParams;
