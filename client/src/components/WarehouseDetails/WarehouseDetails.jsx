import ItemDetail from "../ItemDetail/ItemDetail";
import "./WarehouseDetails.scss";

const WarehouseDetails = ({ address, contactName, contactInformation }) => {
  return (
    <div className="warehouse-details">
      <div className="warehouse-details__left">
        <ItemDetail detailTitle="warehouse address" content={address} />
      </div>
      <div className="warehouse-details__right">
        <ItemDetail detailTitle="Contact name" content={contactName} />
        <ItemDetail
          detailTitle="Contact information"
          content={contactInformation}
        />
      </div>
    </div>
  );
};

export default WarehouseDetails;
