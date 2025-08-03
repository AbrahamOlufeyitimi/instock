import ColumnName from "../ColumnName/ColumnName";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "./ColumnsWarehouse.scss";

const ColumnsWarehouse = ({ onSort }) => {
  const handleSort = (columnName, order) => {
    onSort(columnName, order);
  };
  return (
    <div className="columns-warehouse">
      <div className="cell-table">
        <ColumnName
          text="Warehouse"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("warehouse_name", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="address"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("address, city, country", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="contact name"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("contact_name", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName
          text="contact information"
          sortIcon={sortIcon}
          onSort={(order) => handleSort("contact_phone, contact_email", order)}
        />
      </div>
      <div className="cell-table">
        <ColumnName text="actions" />
      </div>
    </div>
  );
};

export default ColumnsWarehouse;
