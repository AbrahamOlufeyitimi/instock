import FormHeader from "../../components/FormHeader/FormHeader";
import EditWarehouseForm from "../../components/EditWarehouseForm/EditWarehouseForm";
import { useParams } from "react-router-dom";
import "./WarehouseEdit.scss";

const WarehouseEdit = () => {
  const { id } = useParams();

  return (
    <div className="warehouse-edit">
      <FormHeader text="Edit Warehouse" path={`/warehouses/${id}`} />
      <EditWarehouseForm />
    </div>
  );
};

export default WarehouseEdit;
