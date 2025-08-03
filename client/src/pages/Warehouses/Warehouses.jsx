import { useEffect, useState } from "react";
import ListHeader from "../../components/ListHeader/ListHeader";
import NoRecords from "../../components/NoRecords/NoRecords";
import { InStockApi } from "../../scripts/instock-api";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import "./Warehouses.scss";

const Warehouses = () => {
  const api = new InStockApi();
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnForSorting, setColumnForSorting] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const handleSort = (columnName, order) => {
    setColumnForSorting(columnName);
    setOrderBy(order);
  };

  const getWarehouses = async () => {
    const data = await api.getWarehouses(columnForSorting, orderBy, searchTerm);
    setWarehouses(data);
  };

  useEffect(() => {
    document.title = "Warehouses | InStock";
    getWarehouses();
  }, []);

  useEffect(() => {
    getWarehouses();
  }, [columnForSorting, searchTerm, orderBy]);

  return (
    <div className="warehouses">
      <ListHeader
        title="Warehouses"
        buttonText="+ Add New Warehouse"
        path="/warehouses/add"
        setSearchTerm={setSearchTerm}
      />
      {warehouses?.length && warehouses ? (
        <WarehouseList
          warehouses={warehouses}
          setWarehouses={setWarehouses}
          onSort={handleSort}
        />
      ) : (
        <NoRecords text="warehouses" />
      )}
    </div>
  );
};

export default Warehouses;
