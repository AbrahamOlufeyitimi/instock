import { useEffect } from "react";
import AddWarehouseForm from "../../components/AddWarehouseForm/AddWarehouseForm";
import FormHeader from "../../components/FormHeader/FormHeader";
import "./WarehouseAdd.scss";

const WarehouseAdd = () => {
  useEffect(() => {
    document.title = "Add Warehouse | InStock";
  }, []);
  return (
    <div className="warehouse-add">
      <FormHeader text="Add New Warehouse" path="/" />
      <AddWarehouseForm />
    </div>
  );
};

export default WarehouseAdd;
