import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListHeader from "../../components/ListHeader/ListHeader";
import InventoryList from "../../components/InventoryList/InventoryList";
import { InStockApi } from "../../scripts/instock-api";
import NoRecords from "../../components/NoRecords/NoRecords";
import "./Inventory.scss";

const Inventory = () => {
  const navigate = useNavigate();
  const api = new InStockApi(navigate);
  const [inventories, setInventories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnForSorting, setColumnForSorting] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const handleSort = (columnName, order) => {
    setColumnForSorting(columnName);
    setOrderBy(order);
  };

  const getInventories = async () => {
    const inventoryList = await api.getAllInventories(
      columnForSorting,
      orderBy,
      searchTerm
    );
    setInventories(inventoryList);
  };

  useEffect(() => {
    document.title = "Inventories | InStock";
    getInventories();
  }, []);

  useEffect(() => {
    getInventories();
  }, [columnForSorting, searchTerm, orderBy]);

  return (
    <div className="inventory">
      <ListHeader
        title="Inventory"
        buttonText="+ Add New Item"
        path="/inventory/add"
        setSearchTerm={setSearchTerm}
      />
      {inventories?.length && inventories ? (
        <InventoryList
          inventories={inventories}
          isWarehouse={true}
          setInventories={setInventories}
          onSort={handleSort}
        />
      ) : (
        <NoRecords />
      )}
    </div>
  );
};

export default Inventory;
