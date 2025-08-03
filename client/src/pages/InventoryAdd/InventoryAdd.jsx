import { useNavigate } from "react-router-dom";
import FormHeader from "../../components/FormHeader/FormHeader";
import InventoryForm from "../../components/InventoryForm/InventoryForm";
import { InStockApi } from "../../scripts/instock-api";
import { useEffect } from "react";
import "./InventoryAdd.scss";

const InventoryAdd = () => {
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  useEffect(() => {
    document.title = "Add Inventory Item | InStock";
  }, []);

  const handleAddSubmit = async (values) => {
    try {
      const data = await api.postInventory(values);
      navigate(`/inventory/${data.id}`);
    } catch (error) {
      console.error(`Error adding an inventory: ${error}`);
    }
  };

  return (
    <>
        <div className="inventory-add">
          <FormHeader text="Add New Inventory Item" path={`/inventory`} />
          <InventoryForm
            onSubmit={handleAddSubmit}
            mode="add"
          />
        </div>
    </>
  );
};

export default InventoryAdd;
