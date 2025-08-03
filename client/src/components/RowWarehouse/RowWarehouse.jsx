import { Link, useNavigate } from "react-router-dom";
import ActionsIcons from "../ActionsIcons/ActionsIcons";
import TextCell from "../TextCell/TextCell";
import TitleCell from "../TitleCell/TitleCell";
import { InStockApi } from "../../scripts/instock-api";
import "./RowWarehouse.scss";

const RowWarehouse = ({
  id,
  warehouse,
  address,
  contactName,
  phone,
  email,
  setWarehouses,
}) => {
  const navigate = useNavigate();
  const api = new InStockApi(navigate);

  const deleteWarehouse = async () => {
    await api.deleteWarehouse(id);
    setWarehouses((prev) =>
      prev.filter((warehouseItem) => warehouseItem.id !== id)
    );
  };

  return (
    <div className="row-table">
      <div className="cell-table" data-label="warehouse">
        <Link to={`/warehouses/${id}`}>
          <TitleCell text={warehouse} />
        </Link>
      </div>
      <div className="cell-table" data-label="address">
        <TextCell text={address} />
      </div>
      <div className="cell-table" data-label="contact name">
        <TextCell text={contactName} />
      </div>
      <div className="cell-table" data-label="contact information">
        <TextCell text={`${phone} ${email}`} className="contact-info" />
      </div>
      <div className="cell-table">
        <ActionsIcons
          editPath={`/warehouses/${id}/edit`}
          title={warehouse}
          onClick={deleteWarehouse}
          listName="list of warehouses"
          type="warehouse"
        />
      </div>
    </div>
  );
};

export default RowWarehouse;
