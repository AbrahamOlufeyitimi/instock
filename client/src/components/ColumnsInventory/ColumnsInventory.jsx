import ColumnName from "../ColumnName/ColumnName";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "./ColumnsInventory.scss";

const ColumnsInventory = ({ isWarehouse, onSort }) => {
  const handleSort = (columnName, order) => {
    onSort(columnName, order);
  };

  return (
    <div className="columns-inventory">
      <div className="cell-table">
        <ColumnName
          text="inventory item"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("item_name", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="category"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("category", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="status"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("status", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="quantity"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("quantity", order)}
        />
      </div>
      {isWarehouse && (
        <div className="cell-table">
          <ColumnName
            text="warehouse"
            sortIcon={sortIcon}
            onSort={(order) => handleSort("warehouse_id", order)}
          />
        </div>
      )}
      <div className="cell-table">
        <ColumnName text="actions" />
      </div>
    </div>
  );
};

export default ColumnsInventory;
