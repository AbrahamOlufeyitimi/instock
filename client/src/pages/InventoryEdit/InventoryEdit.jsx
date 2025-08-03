import { useNavigate, useParams } from "react-router-dom";
import FormHeader from "../../components/FormHeader/FormHeader";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import { InStockApi } from "../../scripts/instock-api";
import { useEffect, useState } from "react";
import "./InventoryEdit.scss";

const InventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new InStockApi(navigate);
  const [inventory, setInventory] = useState([]);

  const getOneInventory = async () => {
    const data = await api.getInventoryItem(id);
    setInventory(data);
  };

  useEffect(() => {
    getOneInventory();
  }, []);

  useEffect(() => {
    document.title = `Edit ${inventory.item_name} | InStock`;
  }, [inventory]);

  const handleEditSubmit = async (values) => {
    try {
      const data = await api.updateInventory(id, values);
      navigate(`/inventory/${data.id}`);
    } catch (error) {
      console.error(`Error editing an inventory: ${error}`);
    }
  };

  return (
    <>
      {inventory && (
        <div className="inventory-edit">
          <FormHeader text="Edit Inventory Item" path={`/inventory/${id}`} />
          <InventoryForm
            onSubmit={handleEditSubmit}
            mode="edit"
            initialValues={inventory}
          />
        </div>
      )}
    </>
  );
};

export default InventoryEdit;
