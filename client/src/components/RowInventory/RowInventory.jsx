import { Link, useNavigate } from "react-router-dom";
import ActionsIcons from "../ActionsIcons/ActionsIcons";
import TextCell from "../TextCell/TextCell";
import TitleCell from "../TitleCell/TitleCell";
import StatusField from "../StatusField/StatusField";
import { InStockApi } from "../../scripts/instock-api";
import "./RowInventory.scss";

const RowInventory = ({
  id,
  inventoryItem,
  category,
  status,
  quantity,
  warehouse,
  setInventories,
}) => {
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  const deleteInventoryItem = async () => {
    const data = await api.deleteInventoryItem(id);
    setInventories((prev) =>
      prev.filter((inventoryItem) => inventoryItem.id !== id)
    );
  };

  return (
    <div className="row-table">
      <div className="cell-table" data-label="inventory item">
        <Link to={`/inventory/${id}`}>
          <TitleCell text={inventoryItem} />
        </Link>
      </div>
      <div className="cell-table" data-label="category">
        <TextCell text={category} />
      </div>
      <div className="cell-table" data-label="status">
        <StatusField text={status} />
      </div>
      <div className="cell-table" data-label="quantity">
        <TextCell text={quantity} />
      </div>
      {warehouse && (
        <div className="cell-table" data-label="warehouse">
          <TextCell text={warehouse} />
        </div>
      )}

      <div className="cell-table">
        <ActionsIcons
          editPath={`/inventory/${id}/edit`}
          onClick={deleteInventoryItem}
          title={inventoryItem}
          listName="inventory list"
          type="inventory item"
        />
      </div>
    </div>
  );
};

export default RowInventory;
