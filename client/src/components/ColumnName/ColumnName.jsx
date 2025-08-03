import { useState } from "react";
import "./ColumnName.scss";

const ColumnName = ({ text, sortIcon, onSort }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSortClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOrderChange = (order) => {
    onSort(order);
    setDropdownOpen(false);
  };

  return (
    <div className="column-name">
      <h4 className="column-name__text">{text}</h4>
      {sortIcon && (
        <div className="column-name__sort-container">
          <button className="column-name__button" onClick={handleSortClick}>
            <img
              className="column-name__sort-icon"
              src={sortIcon}
              alt="Sort icon"
            />
          </button>
          {isDropdownOpen && (
            <div className="column-name__dropdown">
              <button onClick={() => handleOrderChange("asc")}>Asc</button>
              <button onClick={() => handleOrderChange("desc")}>Desc</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColumnName;
