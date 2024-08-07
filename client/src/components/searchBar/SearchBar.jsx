import styles from "./searchBar.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ placeholder }) {
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
    <div className={styles.searchBar}>
      <input type="search" placeholder={placeholder} onChange={handleChange} />
    </div>
  );
}

export default SearchBar;
