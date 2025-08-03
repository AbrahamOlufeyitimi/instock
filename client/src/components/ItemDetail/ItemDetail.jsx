import "./ItemDetail.scss";

const ItemDetail = ({ detailTitle, content }) => {
  return (
    <div className="item-detail">
      <h4 className="item-detail__heading">{detailTitle} :</h4>
      <p className="body-medium">{content}</p>
    </div>
  );
};

export default ItemDetail;
