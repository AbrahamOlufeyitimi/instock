import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WarehouseForm from "../WarehouseForm/WarehouseForm";
import { InStockApi } from "../../scripts/instock-api";

const EditWarehouseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  const [warehouse, setWarehouse] = useState([]);

  const getWarehouse = async () => {
    const data = await api.getWarehouse(id);
    setWarehouse(data);
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  useEffect(() => {
    document.title = `Edit ${warehouse.warehouse_name} | InStock`;
  }, [warehouse]);

  const handleEditSubmit = async (values) => {
    try {
      const data = await api.updateWarehouse(id, values);
      navigate(`/warehouses/${data.id}`);
    } catch (error) {
      console.error(`Error adding a warehouse: ${error}`);
    }
  };

  return (
    <>
      {warehouse && (
        <WarehouseForm
          initialValues={warehouse}
          onSubmit={handleEditSubmit}
          mode="edit"
        />
      )}
    </>
  );
};

export default EditWarehouseForm;
