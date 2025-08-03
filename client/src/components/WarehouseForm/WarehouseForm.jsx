import Button from "../Button/Button";
import { useState, useEffect } from "react";
import WarehouseFormSection from "../WarehouseFormSection/WarehouseFormSection";
import "./WarehouseForm.scss";

const WarehouseForm = ({ initialValues = {}, onSubmit, mode }) => {
  const [formValues, setFormValues] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  const warehouseFields = [
    { name: "warehouse_name", label: "Warehouse Name", type: "text" },
    { name: "address", label: "Street Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "country", label: "Country", type: "text" },
  ];

  const contactFields = [
    { name: "contact_name", label: "Contact Name", type: "text" },
    { name: "contact_position", label: "Position", type: "text" },
    { name: "contact_phone", label: "Phone Number", type: "tel" },
    { name: "contact_email", label: "Email", type: "email" },
  ];

  useEffect(() => {
    if (Object.keys(initialValues).length === 0) return;

    const hasChanges = Object.keys(initialValues).some(
      (key) => formValues[key] !== initialValues[key]
    );

    if (hasChanges) {
      setFormValues((prevValues) => ({ ...prevValues, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex =
      /^(?:\+?\d{1,3}[.\s-]?)?(?:\(?\d{1,4}\)?[.\s-]?)?(?:\d{1,4}[.\s-]?)?\d{1,4}[.\s-]?\d{1,9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    [...warehouseFields, ...contactFields].forEach(({ name }) => {
      if (!formValues[name] || formValues[name].trim() === "") {
        newErrors[name] = "This field is required";
      } else if (
        name === "contact_phone" &&
        !validatePhoneNumber(formValues[name])
      ) {
        newErrors[name] = "Invalid phone number";
      } else if (name === "contact_email" && !validateEmail(formValues[name])) {
        newErrors[name] = "Invalid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        warehouse_name: formValues.warehouse_name,
        address: formValues.address,
        city: formValues.city,
        country: formValues.country,
        contact_name: formValues.contact_name,
        contact_position: formValues.contact_position,
        contact_phone: formValues.contact_phone,
        contact_email: formValues.contact_email,
      });
    }
  };

  return (
    <form className="warehouse-form">
      <div className="warehouse-form__sections">
        <WarehouseFormSection
          title="Warehouse Details"
          fields={warehouseFields}
          values={formValues}
          onChange={handleChange}
          errors={errors}
        />
        <WarehouseFormSection
          title="Contact Details"
          fields={contactFields}
          values={formValues}
          onChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="warehouse-form__buttons">
        <div className="warehouse-form__button warehouse-form__button--cancel">
          <Button text="Cancel" path={"/"} />
        </div>
        <div
          className="warehouse-form__button warehouse-form__button--submit"
          onClick={handleSubmit}
        >
          <Button text={mode === "edit" ? "Save" : "+ Add Warehouse"} />
        </div>
      </div>
    </form>
  );
};

export default WarehouseForm;
