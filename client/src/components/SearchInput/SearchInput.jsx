import { useState } from "react";
import "./SearchInput.scss";

const SearchInput = ({ icon, setSearchTerm }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`search-input ${isActive ? "search-input--active" : ""}`}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <input
        id="search"
        name="search"
        className="search-input__input"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img className="search-input__icon" src={icon} alt="Search icon" />
    </div>
  );
};

export default SearchInput;
