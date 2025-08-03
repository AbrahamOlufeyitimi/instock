import { useNavigate } from "react-router-dom";
import WarehouseForm from "../WarehouseForm/WarehouseForm";
import { InStockApi } from "../../scripts/instock-api";
import { warehouse_api_url } from "../../utils/config";

const AddWarehouseForm = () => {
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  const handleAddSubmit = async (values) => {
    const data = await api.postWarehouse(values);
    navigate(`${warehouse_api_url}/${data.id}`);
  };

  return <WarehouseForm onSubmit={handleAddSubmit} mode="add" />;
};

export default AddWarehouseForm;
