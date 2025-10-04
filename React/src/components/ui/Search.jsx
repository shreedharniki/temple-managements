import "./Search.css";
import { FaSearch } from "react-icons/fa";

export default function Search({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
