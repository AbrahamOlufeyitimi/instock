import { Link } from "react-router-dom";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import "./FormHeader.scss";

const FormHeader = ({ text, path, textButton, buttonPath, icon }) => {
  return (
    <div className="form-header">
      <div className="form-header__content">
        <Link to={path}>
          <img
            className="form-header__icon"
            src={arrowBack}
            alt="Arrow back icon"
          />
        </Link>
        <h1 className="form-header__heading">{text}</h1>
      </div>
      {icon && (
        <Button text={textButton} path={buttonPath} icon={icon} type="edit" />
      )}
    </div>
  );
};

export default FormHeader;
