import errorIcon from "../../assets/icons/error-24px.svg";
import "./WarehouseFormSection.scss";

const WarehouseFormSection = ({ title, fields, values, onChange, errors }) => {
  return (
    <div className="form-section">
      <h2 className="form-section__heading">{title}</h2>
      {fields.map((field) => (
        <div key={field.name}>
          <h3 className="form-section__label">{field.label}</h3>
          <input
            className={`form-section__input ${
              errors[field.name] ? "form-section__input--error" : ""
            }`}
            type={field.type}
            placeholder={field.label}
            name={field.name}
            value={values[field.name]}
            onChange={onChange}
          />

          <div className="error">
            {errors[field.name] && (
              <>
                <img className="error__icon" src={errorIcon} alt="Error icon" />
                <p className="body-small">{errors[field.name]}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WarehouseFormSection;
