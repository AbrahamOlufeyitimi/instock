import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import "./TitleCell.scss";

const TitleCell = ({ text }) => {
  return (
    <div className="title-cell">
      <h3 className="title-cell__heading">{text}</h3>
      <img
        className="title-cell__icon"
        src={chevronRight}
        alt="Chevron right icon"
      />
    </div>
  );
};

export default TitleCell;
