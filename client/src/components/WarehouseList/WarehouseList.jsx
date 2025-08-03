import React from "react";
import ColumnsWarehouse from "../ColumnsWarehouse/ColumnsWarehouse";
import RowWarehouse from "../RowWarehouse/RowWarehouse";

const WarehouseList = ({ warehouses, setWarehouses, onSort }) => {
  return (
    <div className="body-medium">
      <ColumnsWarehouse onSort={onSort} />
      {warehouses.map((warehouse) => (
        <RowWarehouse
          key={warehouse.id}
          id={warehouse.id}
          warehouse={warehouse.warehouse_name}
          address={`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
          contactName={warehouse.contact_name}
          phone={warehouse.contact_phone}
          email={warehouse.contact_email}
          setWarehouses={setWarehouses}
        />
      ))}
    </div>
  );
};

export default WarehouseList;
