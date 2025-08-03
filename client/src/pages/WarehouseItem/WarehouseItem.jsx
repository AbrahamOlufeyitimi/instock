import { useEffect, useState } from "react";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InventoryList from "../../components/InventoryList/InventoryList";
import { InStockApi } from "../../scripts/instock-api";
import "./WarehouseItem.scss";

const WarehouseItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const api = new InStockApi(navigate);

  const [warehouse, setWarehouse] = useState({});
  const [inventories, setInventories] = useState([]);

  const getWarehouse = async () => {
    const warehouse = await api.getWarehouse(id);
    setWarehouse(warehouse);
  };

  const getInventoriesByWarehouseId = async () => {
    const inventoriesByWarehouse = await api.getAllInventoriesByWarehouseId(id);
    setInventories(inventoriesByWarehouse);
  };

  useEffect(() => {
    getWarehouse();
    getInventoriesByWarehouseId();
  }, []);

  useEffect(() => {
    document.title = `${warehouse.warehouse_name} Warehouse | InStock`;
  }, [warehouse]);

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    
  }, [location]);

  const handleNavigateToInventory = (inventoryId) => {
    navigate(`/inventory/${inventoryId}`, { state: { prevPath: location.pathname } });
  };

  return (
    <div className="warehouse">
      <div className="warehouse__header">
        <FormHeader
          text={warehouse.warehouse_name}
          path="/"
          textButton="Edit"
          buttonPath={`/warehouses/${id}/edit`}
          icon={editIcon}
        />
      </div>
      <WarehouseDetails
        address={warehouse.address}
        contactName={`${warehouse.contact_name} ${warehouse.contact_position}`}
        contactInformation={`${warehouse.contact_phone} ${warehouse.contact_email}`}
      />
      <InventoryList inventories={inventories} onNavigateToInventory={handleNavigateToInventory} />
    </div>
  );
};

export default WarehouseItem;
