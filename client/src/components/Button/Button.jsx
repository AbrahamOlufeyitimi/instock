import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ icon, text, path, type }) => {
  return (
    <Link className="button" to={path}>
      {icon && <img className="button__icon" src={icon} alt="Button icon" />}
      <h3
        className={`button__text ${
          type === "edit" ? "button__text--edit" : ""
        }`}
      >
        {text}
      </h3>
    </Link>
  );
};

export default Button;
