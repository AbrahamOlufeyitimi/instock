import { useEffect, useState } from "react";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useNavigate, useParams } from "react-router-dom";
import StatusField from "../../components/StatusField/StatusField";
import { InStockApi } from "../../scripts/instock-api";
import "./InventoryItem.scss";

const InventoryItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new InStockApi(navigate);
  const [inventoryItem, setInventoryItem] = useState([]);

  const getInventoryItem = async () => {
    const inventoryItem = await api.getInventoryItem(id);
    setInventoryItem(inventoryItem);
  };

  useEffect(() => {
    getInventoryItem();
  }, []);

  useEffect(() => {
    document.title = `${inventoryItem.item_name} | InStock`;
  }, [inventoryItem]);

  return (
    <div className="inventory-details body-medium">
      <div className="inventory-details__header">
        <FormHeader
          text={inventoryItem.item_name}
          path="/inventory"
          textButton="Edit"
          buttonPath={`/inventory/${id}/edit`}
          icon={editIcon}
        />
      </div>
      <section className="inventory-details__content">
        <div className="inventory-details__left">
          <div className="inventory-details__item">
            <h4 className="inventory-details__label">ITEM DESCRIPTION</h4>
            <p>{inventoryItem.description}</p>
          </div>
          <div className="inventory-details__item">
            <h4 className="inventory-details__label">CATEGORY</h4>
            <p>{inventoryItem.category}</p>
          </div>
        </div>
        <div className="inventory-details__right">
          <div className="inventory-details__stat-qty">
            <div className="inventory-details__item inventory-details__stat-qty-left">
              <h4 className="inventory-details__label">STATUS</h4>
              <StatusField text={`${inventoryItem.status}`} />
            </div>

            <div className="inventory-details__item inventory-details__stat-qty-right">
              <h4 className="inventory-details__label">QUANTITY</h4>
              <p>{inventoryItem.quantity}</p>
            </div>
          </div>
          <div className="inventory-details__item">
            <h4 className="inventory-details__label">WAREHOUSE</h4>
            <p>{inventoryItem.warehouse_name}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InventoryItem;
