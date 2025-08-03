import errorIcon from "../../assets/icons/error-24px.svg";
import "./InventoryFormSection.scss";

const InventoryFormSection = ({ title, fields, values, onChange, errors }) => {
  return (
    <div className="form-section">
      <h2 className="form-section__heading">{title}</h2>
      {fields.map((field) => (
        <div className={`${field.type === "select" ? "form-section__parent" : ""}`} key={field.name}>
          <h3 className="form-section__label">{field.label}</h3>

          {field.type === "textarea" ? (
            <textarea
              className={`form-section__textarea ${
                errors[field.name] ? "form-section__input--error" : ""
              }`}
              placeholder={field.label}
              name={field.name}
              value={values[field.name]}
              onChange={onChange}
            />
          ) : field.type === "select" ? (
            <select
              className={`form-section__select ${
                errors[field.name] ? "form-section__input--error" : ""
              }`}
              name={field.name}
              value={values[field.name]}
              onChange={onChange}
            >
              <option value="" disabled>
                Please select
              </option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="form-section__radio-group">
              {field.options.map((option) => (
                <label key={option.value} className="form-section__radio-label">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={values[field.name] === option.value}
                    onChange={onChange}
                    className="form-section__radio-input"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ) : field.name === "quantity" ? (
            <input
              className={`form-section__input form-section__input--number ${
                errors[field.name] ? "form-section__input--error" : ""
              }`}
              type="number"
              name={field.name}
              value={values[field.name]}
              onChange={onChange}
              min="1"
            />
          ) : (
            <>
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
            </>
          )}
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

export default InventoryFormSection;
